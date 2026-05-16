// Google Sign-In via Supabase Auth (optional).
// If VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set, the button is hidden.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../store/auth';

const SB_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let supabaseClient: any = null;
async function getClient() {
  if (supabaseClient || !SB_URL || !SB_KEY) return supabaseClient;
  const { createClient } = await import('@supabase/supabase-js');
  supabaseClient = createClient(SB_URL, SB_KEY);
  return supabaseClient;
}

export default function GoogleButton() {
  const nav = useNavigate();
  const setAuth = useAuth((s) => s.setAuth);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => { setEnabled(!!(SB_URL && SB_KEY)); }, []);

  // After Google redirect, exchange the Supabase session for our app JWT
  useEffect(() => {
    (async () => {
      const sb = await getClient();
      if (!sb) return;
      const { data } = await sb.auth.getSession();
      const session = data?.session;
      if (!session?.user?.email) return;
      try {
        const r = await api.post('/auth/google', {
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
        });
        setAuth(r.data.token, r.data.user);
        await sb.auth.signOut(); // we use our own JWT from here
        nav(r.data.user.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
      } catch { /* ignore */ }
    })();
  }, [nav, setAuth]);

  if (!enabled) return null;

  const onClick = async () => {
    const sb = await getClient();
    if (!sb) return;
    await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/login' },
    });
  };

  return (
    <button onClick={onClick}
      className="w-full border border-stone-300 hover:bg-stone-50 rounded-md px-3 py-2 text-sm flex items-center justify-center gap-2">
      <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.5 6.6 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.5 6.6 28.9 5 24 5 16.3 5 9.7 9.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 43c5 0 9.5-1.7 13-4.6l-6-4.9c-1.9 1.3-4.3 2-7 2-5.3 0-9.7-2.7-11.3-7l-6.5 5C9.6 38.6 16.2 43 24 43z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.5l6 4.9C40.9 35.4 43 30 43 24c0-1.2-.1-2.3-.4-3.5z"/>
      </svg>
      Continue with Google
    </button>
  );
}
