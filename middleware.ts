import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const url = request.nextUrl

  const uaInfo = userAgent(request)
  const { device, browser, os, ua, isBot } = uaInfo

  const viewport = device.type || 'desktop'
  url.searchParams.set('viewport', viewport)

  console.log("=== Middleware userAgent info ===")
  console.log("User-Agent String:", ua)
  console.log("Device:", device)
  console.log("Browser:", browser)
  console.log("OS:", os)
  console.log("Is bot:", isBot)
  console.log("Detected viewport:", viewport)

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|ico|webp|css|js|woff2?|ttf|otf|txt|xml|json)).*)',
  ],
}
