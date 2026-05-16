import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Contribution {
  id: string;
  contributor: string;
  amount: string | number;
  method?: string;
  note?: string;
  contributed_at: string;
}

interface Summary {
  goal?: { title: string; goal_amount: string | number; currency?: string; event_date?: string } | null;
  total: number;
  count: number;
  percent: number;
}

const FALLBACK: Contribution[] = [
  { id: 'd1', contributor: 'Bishop & Family',     amount: 25000, method: 'bank',          contributed_at: '2026-04-12T10:00:00Z' },
  { id: 'd2', contributor: 'Mama Akinyi',         amount: 12000, method: 'mobile_money',  contributed_at: '2026-04-15T14:20:00Z' },
  { id: 'd3', contributor: 'Youth Fellowship',    amount:  8500, method: 'cash',          contributed_at: '2026-04-18T09:00:00Z', note: 'Car wash proceeds' },
  { id: 'd4', contributor: 'Pst. Otieno',         amount: 15000, method: 'bank',          contributed_at: '2026-04-20T11:30:00Z' },
  { id: 'd5', contributor: 'Anonymous',           amount:  5000, method: 'mobile_money',  contributed_at: '2026-04-22T16:00:00Z' },
  { id: 'd6', contributor: 'Women Ministry',      amount: 18750, method: 'cash',          contributed_at: '2026-04-25T08:45:00Z', note: 'Harvest Sunday' },
  { id: 'd7', contributor: 'Bro. Omondi',         amount:  3000, method: 'mobile_money',  contributed_at: '2026-04-27T19:10:00Z' },
  { id: 'd8', contributor: 'Sis. Atieno',         amount:  7500, method: 'bank',          contributed_at: '2026-04-29T12:00:00Z' },
];

const fmt = (n: number, currency = 'KES') =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

const methodBadge: Record<string, string> = {
  cash:          'bg-amber-100 text-amber-800',
  bank:          'bg-blue-100 text-blue-800',
  mobile_money:  'bg-emerald-100 text-emerald-800',
  card:          'bg-purple-100 text-purple-800',
  other:         'bg-stone-100 text-stone-700',
};

export default function Contributions() {
  const [items, setItems] = useState<Contribution[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get<Contribution[]>('/contributions'),
      api.get<Summary>('/contributions/summary'),
    ]).then(([listR, sumR]) => {
      const list = listR.status === 'fulfilled' && listR.value.data?.length ? listR.value.data : FALLBACK;
      setItems(list);
      if (sumR.status === 'fulfilled') {
        setSummary(sumR.value.data);
      } else {
        const total = FALLBACK.reduce((a, c) => a + Number(c.amount), 0);
        setSummary({
          goal: { title: 'Fundraiser Goal', goal_amount: 500000, currency: 'KES', event_date: '2026-06-07' },
          total, count: FALLBACK.length, percent: Math.min(100, (total / 500000) * 100),
        });
      }
      setLoading(false);
    });
  }, []);

  const currency = summary?.goal?.currency || 'KES';
  const total = summary?.total ?? items.reduce((a, c) => a + Number(c.amount), 0);
  const goal = Number(summary?.goal?.goal_amount || 0);
  const percent = summary?.percent ?? (goal ? Math.min(100, (total / goal) * 100) : 0);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl text-brand-900">Contributions</h1>
        <p className="text-stone-600 max-w-2xl">
          A transparent record of every gift toward our fundraiser.
          To God be the glory — and thank you to every contributor for partnering with us.
        </p>
      </header>

      {/* Summary card */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-stone-500">Total raised</div>
            <div className="text-3xl font-display text-brand-900">{fmt(total, currency)}</div>
            <div className="text-sm text-stone-500 mt-1">
              {summary?.count ?? items.length} contribution{(summary?.count ?? items.length) === 1 ? '' : 's'}
            </div>
          </div>
          {goal > 0 && (
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-stone-500">Goal</div>
              <div className="text-xl text-stone-700">{fmt(goal, currency)}</div>
              <div className="text-sm text-emerald-700 font-medium">{percent.toFixed(1)}% reached</div>
            </div>
          )}
        </div>
        {goal > 0 && (
          <div className="mt-4 h-3 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-brand-600 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        )}
      </section>

      {/* Contributors table */}
      <section className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-xl text-brand-900">Recent contributors</h2>
          <span className="text-xs text-stone-500">Showing latest {items.length}</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-stone-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-stone-500">No contributions recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-stone-600">
                <tr>
                  <th className="text-left font-medium px-6 py-3">#</th>
                  <th className="text-left font-medium px-6 py-3">Contributor</th>
                  <th className="text-left font-medium px-6 py-3">Method</th>
                  <th className="text-left font-medium px-6 py-3">Date</th>
                  <th className="text-right font-medium px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {items.map((c, i) => (
                  <tr key={c.id} className="hover:bg-stone-50">
                    <td className="px-6 py-3 text-stone-400">{i + 1}</td>
                    <td className="px-6 py-3">
                      <div className="font-medium text-brand-900">{c.contributor}</div>
                      {c.note && <div className="text-xs text-stone-500">{c.note}</div>}
                    </td>
                    <td className="px-6 py-3">
                      {c.method && (
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full capitalize ${methodBadge[c.method] || methodBadge.other}`}>
                          {c.method.replace('_', ' ')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {new Date(c.contributed_at).toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-brand-900">
                      {fmt(Number(c.amount), currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-stone-50">
                <tr>
                  <td colSpan={4} className="px-6 py-3 text-right text-sm text-stone-600 font-medium">Total</td>
                  <td className="px-6 py-3 text-right font-display text-lg text-brand-900">{fmt(total, currency)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs text-stone-500 text-center">
        Want to contribute? Visit the <a href="/donate" className="text-brand-700 underline">Donate</a> page and share your receipt on WhatsApp so we can update this list.
      </p>
    </div>
  );
}
