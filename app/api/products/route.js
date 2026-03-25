import { NextResponse } from 'next/server'

function getRedis() {
  const url   = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  const { Redis } = require('@upstash/redis')
  return new Redis({ url, token })
}

export async function GET() {
  try {
    const redis = getRedis()
    if (!redis) {
      return NextResponse.json({ products: null, featured: null })
    }
    const [products, featured] = await Promise.all([
      redis.get('elw_products'),
      redis.get('elw_featured'),
    ])
    return NextResponse.json({ products: products ?? null, featured: featured ?? null })
  } catch (e) {
    console.error('KV GET error:', e)
    return NextResponse.json({ products: null, featured: null })
  }
}

export async function POST(request) {
  try {
    const redis = getRedis()
    if (!redis) {
      return NextResponse.json({ ok: false, reason: 'KV not configured' })
    }
    const { products, featured } = await request.json()
    await Promise.all([
      products !== undefined ? redis.set('elw_products', products) : Promise.resolve(),
      featured !== undefined ? redis.set('elw_featured', featured) : Promise.resolve(),
    ])
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('KV POST error:', e)
    return NextResponse.json({ ok: false, reason: e.message })
  }
}
