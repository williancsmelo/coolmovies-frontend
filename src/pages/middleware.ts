import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname == '/') {
    return NextResponse.redirect('/reviews/listing')
  }
  return NextResponse.next()
}
