import { NextRequest } from 'next/server';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/callback/google`;
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=${encodeURIComponent('openid email profile')}&prompt=select_account`;

  return Response.redirect(url);
}
