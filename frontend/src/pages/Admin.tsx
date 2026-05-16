import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Contribution, Item, Summary } from '../types';
import { money, dateShort } from '../utils/format';

export default function Admin() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [contribs, setContribs] = useState<Contribution[]>([]);
  const [form, setForm] = useState({ contributor: '', amount: '', method: 'cash', note: '' });

  const load = () => {
    api.get('/contributions/summary').then((r) => setSummary(r.data));
    api.get('/contributions').then((r) => setContribs(r.data));
    api.get('/items').then((r) => setItems(r.data));
  };
  useEffect(load, []);

  const addContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/contributions', { ...form, amount: Number(form.amount) });
    setForm({ contributor: '', amount: '', method: 'cash', note: '' });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this contribution?')) return;
    await api.delete(`/contributions/${id}`);
    load();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-brand-900">Admin Dashboard</h1>

      {summary && (
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Raised" value={money(summary.total, summary.goal?.currency || 'KES')} />
          <Stat label="Goal" value={money(summary.goal?.goal_amount || 0, summary.goal?.currency || 'KES')} />
          <Stat label="Contributions" value={String(summary.count)} />
        </div>
      )}

      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-xl text-brand-900 mb-3">Record Contribution</h2>
        <form onSubmit={addContribution} className="grid md:grid-cols-5 gap-3">
          <input required placeholder="Contributor"
            value={form.contributor} onChange={(e)=>setForm({...form, contributor: e.target.value})}
            className="border rounded-md px-3 py-2 md:col-span-2" />
          <input required type="number" step="0.01" min="0.01" placeholder="Amount"
            value={form.amount} onChange={(e)=>setForm({...form, amount: e.target.value})}
            className="border rounded-md px-3 py-2" />
          <select value={form.method} onChange={(e)=>setForm({...form, method: e.target.value})}
            className="border rounded-md px-3 py-2">
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
            <option value="mobile_money">Mobile money</option>
            <option value="card">Card</option>
            <option value="other">Other</option>
          </select>
          <button className="bg-brand-600 hover:bg-brand-900 text-white rounded-md px-3 py-2">Add</button>
        </form>
      </section>

      <section>
        <h2 className="text-xl text-brand-900 mb-3">Contributions</h2>
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Contributor</th>
                <th className="text-left p-3">Method</th>
                <th className="text-right p-3">Amount</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contribs.map((c) => (
                <tr key={c.id}>
                  <td className="p-3">{dateShort(c.contributed_at)}</td>
                  <td className="p-3">{c.contributor}</td>
                  <td className="p-3">{c.method}</td>
                  <td className="p-3 text-right font-medium">{money(c.amount)}</td>
                  <td className="p-3 text-right">
                    <button onClick={()=>remove(c.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {contribs.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-stone-500">No contributions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-brand-900 mb-3">Items ({items.length})</h2>
        <p className="text-stone-500 text-sm">Use the API or extend this page to manage items, events and media.</p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5">
      <div className="text-stone-500 text-sm">{label}</div>
      <div className="text-2xl text-brand-900 font-semibold mt-1">{value}</div>
    </div>
  );
}
