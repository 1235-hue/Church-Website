import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../store/auth';
import GoogleButton from '../components/GoogleButton';

export default function Register() {
  const nav = useNavigate();
  const setAuth = useAuth((s) => s.setAuth);
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', password: '', confirm: '',
  });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (form.password.length < 6) return setErr('Password must be at least 6 characters');
    if (form.password !== form.confirm) return setErr('Passwords do not match');
    setBusy(true);
    try {
      const { data } = await api.post('/auth/register', {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setAuth(data.token, data.user);
      nav('/dashboard');
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Registration failed');
    } finally { setBusy(false); }
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-stone-200 rounded-2xl p-6">
      <h1 className="text-2xl text-brand-900 mb-1">Create your account</h1>
      <p className="text-sm text-stone-500 mb-4">Join the fundraiser and track your contributions.</p>
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.full_name} onChange={(e)=>set('full_name', e.target.value)}
          className="w-full border rounded-md px-3 py-2" placeholder="Full name" />
        <input required type="email" value={form.email} onChange={(e)=>set('email', e.target.value)}
          className="w-full border rounded-md px-3 py-2" placeholder="Email" />
        <input required value={form.phone} onChange={(e)=>set('phone', e.target.value)}
          className="w-full border rounded-md px-3 py-2" placeholder="Phone (e.g. +254 7xx xxx xxx)" />
        <input required type="password" value={form.password} onChange={(e)=>set('password', e.target.value)}
          className="w-full border rounded-md px-3 py-2" placeholder="Password (min 6)" />
        <input required type="password" value={form.confirm} onChange={(e)=>set('confirm', e.target.value)}
          className="w-full border rounded-md px-3 py-2" placeholder="Confirm password" />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={busy} className="w-full bg-brand-600 hover:bg-brand-900 disabled:opacity-50 text-white py-2 rounded-md">
          {busy ? 'Creating account…' : 'Register'}
        </button>
      </form>
      <div className="my-4 flex items-center gap-2 text-xs text-stone-400">
        <span className="flex-1 h-px bg-stone-200" /> OR <span className="flex-1 h-px bg-stone-200" />
      </div>
      <GoogleButton />
      <p className="mt-4 text-sm text-stone-600 text-center">
        Already have an account? <Link to="/login" className="text-brand-700 underline">Login</Link>
      </p>
    </div>
  );
}
