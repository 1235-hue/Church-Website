import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../store/auth';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const nav = useNavigate();
  const setAuth = useAuth((s) => s.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAuth(data.token, data.user);
      nav(data.user.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Login failed');
    } finally { setBusy(false); }
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-stone-200 rounded-2xl p-6">
      <h1 className="text-2xl text-brand-900 mb-1">Welcome back</h1>
      <p className="text-sm text-stone-500 mb-4">Sign in to access your dashboard.</p>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required
          className="w-full border rounded-md px-3 py-2" placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required
          className="w-full border rounded-md px-3 py-2" placeholder="Password" />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={busy} className="w-full bg-brand-600 hover:bg-brand-900 disabled:opacity-50 text-white py-2 rounded-md">
          {busy ? 'Signing in…' : 'Login'}
        </button>
      </form>
      <div className="my-4 flex items-center gap-2 text-xs text-stone-400">
        <span className="flex-1 h-px bg-stone-200" /> OR <span className="flex-1 h-px bg-stone-200" />
      </div>
      <GoogleButton />
      <p className="mt-4 text-sm text-stone-600 text-center">
        New here? <Link to="/register" className="text-brand-700 underline">Create an account</Link>
      </p>
    </div>
  );
}
