import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config })   // ← key fix

  try {
    const { identifier, password } = await req.json()

    if (!identifier || !password)
      return NextResponse.json({ success: false, message: 'Identifier and password are required.' }, { status: 400 })

    // ── 1. Try CUSTOMERS ──────────────────────────────────
    const customerResult = await payload.find({
      collection: 'customers',
      where: {
        or: [
          { phone: { equals: identifier } },
          { email: { equals: identifier } },
        ],
      },
    })

    if (customerResult.docs.length) {
      const customer = customerResult.docs[0]

      if ((customer as any).status === 'blocked')
        return NextResponse.json({ success: false, message: 'Your account has been blocked.' }, { status: 403 })

      const login = await payload.login({
        collection: 'customers',
        data: { username: (customer as any).phone, password },
      })

      await payload.update({
        collection: 'customers',
        id: customer.id,
        data: { lastLogin: new Date().toISOString() } as any,
      })

      const cu = login.user as any

      return NextResponse.json({
        success: true,
        role: 'customer',
        token: login.token,
        user: { id: cu.id, name: cu.name, phone: cu.phone, email: cu.email ?? null },
      })
    }

    // ── 2. Try USERS ──────────────────────────────────────
    const userResult = await payload.find({
      collection: 'users',
      where: { email: { equals: identifier } },
    })

    if (userResult.docs.length) {
      const user = userResult.docs[0]

      if ((user as any).status === 'blocked')
        return NextResponse.json({ success: false, message: 'Your account has been blocked.' }, { status: 403 })

      const login = await payload.login({
        collection: 'users',
        data: { email: identifier, password },
      })

      await payload.update({
        collection: 'users',
        id: user.id,
        data: { lastLogin: new Date().toISOString() } as any,
      })

      const uu = login.user as any

      return NextResponse.json({
        success: true,
        role: uu.role,
        token: login.token,
        user: { id: uu.id, name: uu.name, email: uu.email, staffType: uu.staffType ?? null },
      })
    }

    return NextResponse.json({ success: false, message: 'No account found.' }, { status: 404 })

  } catch (err: any) {
    console.error('LOGIN ERROR:', err)
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}