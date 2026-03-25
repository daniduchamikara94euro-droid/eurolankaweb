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
    if (!redis) return NextResponse.json({ hero: null })
    const hero = await redis.get('elw_hero')
    return NextResponse.json({ hero: hero ?? null })
  } catch (e) {
    console.error('Hero GET error:', e)
    return NextResponse.json({ hero: null })
  }
}

export async function POST(request) {
  try {
    const redis = getRedis()
    if (!redis) return NextResponse.json({ ok: false, reason: 'KV not configured' })
    const { hero } = await request.json()
    await redis.set('elw_hero', hero)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Hero POST error:', e)
    return NextResponse.json({ ok: false, reason: e.message })
  }
}
