import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config })

  try {
    const { identifier, password, name, email } = await req.json()

    if (!name?.trim())
      return NextResponse.json({ success: false, message: 'Name is required.' }, { status: 400 })

    if (!identifier?.trim())
      return NextResponse.json({ success: false, message: 'Phone is required.' }, { status: 400 })

    if (!password || password.length < 6)
      return NextResponse.json({ success: false, message: 'Password must be at least 6 characters.' }, { status: 400 })

    // 🔥 Check duplicate phone OR email
    const existing = await payload.find({
      collection: 'customers',
      where: {
        or: [
          { phone: { equals: identifier } },
          ...(email ? [{ email: { equals: email } }] : []),
        ],
      },
    })

    if (existing.docs.length)
      return NextResponse.json({ success: false, message: 'Account already exists.' }, { status: 409 })

    // ✅ Create user
    const newCustomer = await payload.create({
      collection: 'customers',
      data: {
        name,
        phone: identifier,
        email: email || undefined,
        status: 'active',
        password,
      } as any,
    })

    // ✅ Auto login after signup
    const login = await payload.login({
      collection: 'customers',
      data: {
        username: identifier, // 🔥 works because of username: 'phone'
        password,
      },
    })

    const nc = newCustomer as any

    return NextResponse.json({
      success: true,
      role: 'customer',
      token: login.token,
      user: {
        id: nc.id,
        name: nc.name,
        phone: nc.phone,
        email: nc.email ?? null,
      },
    })

  } catch (err: any) {
    console.error('SIGNUP ERROR:', err)
    return NextResponse.json({
      success: false,
      message: err?.message || 'Signup failed',
    }, { status: 500 })
  }
}