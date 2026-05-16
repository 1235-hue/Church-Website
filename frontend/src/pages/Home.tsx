import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Summary, Contribution } from '../types';
import ProgressBar from '../components/ProgressBar';
import { money } from '../utils/format';
import logo from '../assets/cpm-logo.png';
import invitationLetter from '../assets/invitation-letter.png';

export default function Home() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [recent, setRecent] = useState<Contribution[]>([]);

  useEffect(() => {
    api.get<Summary>('/contributions/summary').then((r) => setSummary(r.data)).catch(() => {});
    api.get<{ items: Contribution[] }>('/contributions?limit=8&public=1')
      .then((r) => setRecent((r.data as any).items || (r.data as any) || []))
      .catch(() => {});
  }, []);

  const currency = summary?.goal?.currency || 'KES';

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-12 px-4 bg-gradient-to-br from-brand-50 to-white rounded-3xl border border-stone-200">
        <img src={logo} alt="CPM logo" className="h-24 w-24 sm:h-28 sm:w-28 object-contain mx-auto mb-4" />
        <p className="text-brand-600 font-medium tracking-widest text-xs sm:text-sm">
          CATHEDRAL OF PRAISE MINISTRIES INT'L · MBITA FAITH MEMORIAL CHURCH
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-brand-900 mt-3">Together We Build</h1>
        <p className="text-brand-700 font-medium mt-2">7 June 2026 · 10:00 AM · Church Hall, Mbita Town</p>
        <p className="mt-4 max-w-2xl mx-auto text-stone-600">
          Help us equip the church with a Public Address system, instruments, plastic chairs, pulpit chairs and a generator.
          Every contribution brings us closer to the goal.
        </p>

        {summary?.goal && (
          <div className="max-w-xl mx-auto mt-8 bg-white border border-stone-200 rounded-2xl p-5 text-left">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Raised so far</span>
              <span className="font-semibold text-brand-900">
                {money(summary.total, currency)} / {money(Number(summary.goal.goal_amount), currency)}
              </span>
            </div>
            <div className="mt-2"><ProgressBar percent={(Number(summary.total) / Number(summary.goal.goal_amount || 1)) * 100} /></div>
            <div className="mt-1 text-xs text-stone-500">
              {summary.count} contributions · {summary.percent.toFixed(1)}% funded
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/donate" className="bg-brand-600 hover:bg-brand-900 text-white px-6 py-3 rounded-md font-medium">
            How to Donate
          </Link>
          <Link to="/rsvp" className="border border-brand-600 text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-md font-medium">
            RSVP for the event
          </Link>
        </div>
      </section>

      {/* Recent contributions */}
      <section>
        <h2 className="font-display text-2xl text-brand-900 mb-4">Recent contributions</h2>
        <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100">
          {recent.length === 0 && (
            <p className="p-5 text-sm text-stone-500">Be the first to contribute toward the goal.</p>
          )}
          {recent.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-brand-900">{c.contributor || 'Anonymous'}</div>
                <div className="text-xs text-stone-500">
                  {c.method?.toUpperCase()} · {new Date(c.contributed_at).toLocaleDateString()}
                </div>
              </div>
              <div className="font-semibold text-brand-700">{money(Number(c.amount), currency)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Official invitation */}
      <section>
        <h2 className="font-display text-2xl text-brand-900 mb-2">Official Invitation</h2>
        <p className="text-stone-600 mb-4">
          Cathedral of Praise Ministries Int'l — Mbita Faith Memorial Church cordially invites you to a
          Fund Drive for the purchase of church equipment on{' '}
          <span className="font-semibold">Sunday, 7th June 2026 at 12:00 Noon</span>.
        </p>
        <figure className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <a href={invitationLetter} target="_blank" rel="noreferrer" aria-label="Open full invitation letter">
            <img
              src={invitationLetter}
              alt="Official fundraiser invitation letter from Cathedral of Praise Ministries Int'l, Mbita Faith Memorial Church"
              className="w-full h-auto object-contain bg-stone-50"
              loading="lazy"
            />
          </a>
          <figcaption className="px-4 py-3 text-xs text-stone-500 border-t border-stone-100">
            Signed by Pastor Isaac Madanji — Senior Pastor, CPM FMC Mbita. Click image to view full size.
          </figcaption>
        </figure>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/donate" className="bg-brand-600 hover:bg-brand-900 text-white px-5 py-2.5 rounded-md text-sm font-medium">
            How to Donate
          </Link>
          <Link to="/rsvp" className="border border-brand-600 text-brand-700 hover:bg-brand-50 px-5 py-2.5 rounded-md text-sm font-medium">
            RSVP for the event
          </Link>
        </div>
      </section>
    </div>
  );
}
