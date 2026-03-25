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
    if (!redis) return NextResponse.json({ images: null })
    const images = await redis.get('elw_gallery')
    return NextResponse.json({ images: images ?? null })
  } catch (e) {
    console.error('Gallery GET error:', e)
    return NextResponse.json({ images: null })
  }
}

export async function POST(request) {
  try {
    const redis = getRedis()
    if (!redis) return NextResponse.json({ ok: false, reason: 'KV not configured' })
    const { images } = await request.json()
    await redis.set('elw_gallery', images)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Gallery POST error:', e)
    return NextResponse.json({ ok: false, reason: e.message })
  }
}
