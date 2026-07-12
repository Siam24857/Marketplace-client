'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function GoogleCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/auth/login?error=google';
    }
  }, [searchParams]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <p className="text-gray-500">Completing sign in…</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-64px)] flex items-center justify-center"><p className="text-gray-500">Completing sign in…</p></div>}>
      <GoogleCallback />
    </Suspense>
  );
}
