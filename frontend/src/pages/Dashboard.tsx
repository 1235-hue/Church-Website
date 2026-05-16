import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../store/auth';
import type { Summary, Contribution } from '../types';
import ProgressBar from '../components/ProgressBar';
import { money, dateShort } from '../utils/format';

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [mine, setMine] = useState<Contribution[]>([]);

  useEffect(() => {
    api.get<Summary>('/contributions/summary').then((r) => setSummary(r.data)).catch(() => {});
    api.get<Contribution[]>('/contributions').then((r) => setMine(r.data)).catch(() => {});
  }, []);

  const currency = summary?.goal?.currency || 'KES';

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl text-brand-900">Welcome, {user?.full_name?.split(' ')[0]}</h1>
        <p className="text-stone-500 text-sm">Track the fundraiser and your contributions.</p>
      </header>

      {summary?.goal && (
        <section className="bg-white border border-stone-200 rounded-2xl p-5">
          <div className="flex justify-between text-sm text-stone-600">
            <span>Total raised</span>
            <span className="font-semibold text-brand-900">
              {money(summary.total, currency)} / {money(Number(summary.goal.goal_amount), currency)}
            </span>
          </div>
          <div className="mt-2"><ProgressBar percent={(Number(summary.total) / Number(summary.goal.goal_amount || 1)) * 100} /></div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl text-brand-900">My contributions</h2>
          <Link to="/donate" className="text-sm bg-brand-600 hover:bg-brand-900 text-white px-3 py-2 rounded-md">
            Make a contribution
          </Link>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Method</th>
                <th className="text-left p-3">Note</th>
                <th className="text-right p-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mine.map((c) => (
                <tr key={c.id}>
                  <td className="p-3">{dateShort(c.contributed_at)}</td>
                  <td className="p-3">{c.method}</td>
                  <td className="p-3 text-stone-500">{c.note || '—'}</td>
                  <td className="p-3 text-right font-medium">{money(Number(c.amount), currency)}</td>
                </tr>
              ))}
              {mine.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-stone-500">
                  You have no recorded contributions yet.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <Link to="/rsvp"       className="bg-brand-50 hover:bg-brand-100 border border-brand-100 rounded-2xl p-5 text-brand-900">RSVP to the event →</Link>
        <Link to="/invitation" className="bg-brand-50 hover:bg-brand-100 border border-brand-100 rounded-2xl p-5 text-brand-900">Download invitation →</Link>
      </section>
    </div>
  );
}
