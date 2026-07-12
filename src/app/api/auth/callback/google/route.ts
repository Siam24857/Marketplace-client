import { NextRequest } from 'next/server';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return Response.redirect(`${origin}/auth/login?error=google`);
  }

  try {
    const redirectUri = `${origin}/api/auth/callback/google`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData: any = await tokenRes.json();
    if (!tokenData.id_token) {
      return Response.redirect(`${origin}/auth/login?error=google`);
    }

    const payload = JSON.parse(Buffer.from(tokenData.id_token.split('.')[1], 'base64').toString());
    const email = payload.email;
    if (!email) {
      return Response.redirect(`${origin}/auth/login?error=google`);
    }

    const verifyRes = await fetch(`${API_URL}/auth/google-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name: payload.name || email.split('@')[0],
        avatar: payload.picture || '',
      }),
    });

    const verifyData: any = await verifyRes.json();
    if (!verifyData.success) {
      return Response.redirect(`${origin}/auth/login?error=google`);
    }

    const { token, user } = verifyData.data;
    const userParam = encodeURIComponent(JSON.stringify(user));
    return Response.redirect(`${origin}/auth/callback?token=${token}&user=${userParam}`);
  } catch {
    return Response.redirect(`${origin}/auth/login?error=google`);
  }
}
