import { useState } from 'react';
import { api } from '../services/api';

export default function Rsvp() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', guests: 1, message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending'); setErr('');
    try {
      await api.post('/rsvps', form);
      setStatus('ok');
      setForm({ full_name: '', email: '', phone: '', guests: 1, message: '' });
    } catch (e: any) {
      setStatus('err');
      setErr(e?.response?.data?.error || 'Could not save RSVP');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl text-brand-900 mb-2">RSVP for June 1, 2026</h1>
      <p className="text-stone-600 mb-6">Let us know you'll be there. We'll save you a seat.</p>

      {status === 'ok' && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-md mb-6">
          🎉 Thank you! Your RSVP is confirmed. See you on June 1st.
        </div>
      )}

      <form onSubmit={submit} className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
        <Field label="Full name">
          <input required value={form.full_name} onChange={(e)=>setForm({...form, full_name: e.target.value})} className="input" />
        </Field>
        <Field label="Email">
          <input required type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="input" />
        </Field>
        <Field label="Phone (optional)">
          <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="input" />
        </Field>
        <Field label="Number of guests">
          <input type="number" min={1} max={20} value={form.guests}
            onChange={(e)=>setForm({...form, guests: Number(e.target.value)})} className="input" />
        </Field>
        <Field label="Message (optional)">
          <textarea value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} className="input" rows={3} />
        </Field>

        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={status==='sending'} className="bg-brand-600 hover:bg-brand-900 text-white px-5 py-3 rounded-md w-full">
          {status==='sending' ? 'Saving…' : 'Confirm RSVP'}
        </button>
      </form>

      <style>{`.input{width:100%;border:1px solid #e7e5e4;border-radius:.5rem;padding:.6rem .8rem;background:#fff}.input:focus{outline:2px solid #d4a14a;outline-offset:1px}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
