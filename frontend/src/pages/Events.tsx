import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { EventItem } from '../types';
import { dateLong } from '../utils/format';
import invitationCard from '../assets/invitation-card.png';

// Default poster used when an event has no image yet
const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=1200&q=80';

// Fallback events shown when the API returns nothing
const FALLBACK: EventItem[] = [
  {
    id: 'e1',
    title: 'Fundraiser Gala 2026',
    description: 'An evening of worship, music and community as we raise funds for new instruments.',
    poster_url: invitationCard,
    starts_at: '2026-06-01T17:00:00Z',
    location: 'Grace Community Church, Main Hall',
  },
  {
    id: 'e2',
    title: 'Worship Night',
    description: 'An evening of praise, worship and prayer led by our combined choirs.',
    poster_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
    starts_at: '2026-05-10T18:30:00Z',
    location: 'Grace Community Church, Sanctuary',
  },
  {
    id: 'e3',
    title: 'Community Outreach Day',
    description: 'Serving our neighborhood with food, prayer and fellowship.',
    poster_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    starts_at: '2026-05-24T09:00:00Z',
    location: 'Church Grounds & City Park',
  },
];

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  useEffect(() => {
    api.get<EventItem[]>('/events')
      .then((r) => setEvents(r.data && r.data.length ? r.data : FALLBACK))
      .catch(() => setEvents(FALLBACK));
  }, []);
  const items = events.length ? events : FALLBACK;
  return (
    <div>
      <h1 className="text-3xl text-brand-900 mb-6">Upcoming Events</h1>

      {/* Featured invitation card for the official 7th June 2026 fundraiser */}
      <section className="mb-8 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <a href={invitationCard} target="_blank" rel="noreferrer" aria-label="Open full invitation card">
          <img
            src={invitationCard}
            alt="Cathedral of Praise Mbita fundraiser invitation card — 7th June 2026, Guest of Honour Hon. Millie Odhiambo MP Suba North"
            className="w-full h-auto object-contain bg-stone-50"
            loading="lazy"
          />
        </a>
        <div className="p-5 border-t border-stone-100">
          <h2 className="text-xl text-brand-900 font-semibold">
            Featured: CPM Mbita Fundraiser — 7th June 2026
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Guest of Honour: <strong>Hon. Millie Odhiambo, MP Suba North</strong> ·
            Co-Guest of Honour: <strong>Dr. Musa Obuba PhD, Elder CITAM</strong>
          </p>
          <p className="text-sm text-stone-500 mt-1">
            10:00 AM · Church Hall, Mbita Town (behind market, Jasindo Building)
          </p>
          <div className="mt-3 grid sm:grid-cols-3 gap-3 text-xs text-stone-700">
            <div className="bg-stone-50 rounded-md p-3">
              <div className="font-semibold text-brand-900">RSVP — Church Pastor</div>
              <div>Isaac Madanji</div>
              <div>+254 726 475 921</div>
            </div>
            <div className="bg-stone-50 rounded-md p-3">
              <div className="font-semibold text-brand-900">M-PESA</div>
              <div>Paybill: 400200</div>
              <div>Account: 2270270</div>
            </div>
            <div className="bg-stone-50 rounded-md p-3">
              <div className="font-semibold text-brand-900">RSVP — Secretary</div>
              <div>Shadrack Ng'ong'a</div>
              <div>+254 717 111 551</div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        {items.map((e) => (
          <article key={e.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden md:flex">
            <img
              src={e.poster_url || DEFAULT_POSTER}
              alt={e.title}
              loading="lazy"
              className="md:w-64 w-full h-48 md:h-auto object-cover"
            />
            <div className="p-6 flex-1">
              <h2 className="text-2xl text-brand-900">{e.title}</h2>
              <p className="text-sm text-brand-600 font-medium mt-1">{dateLong(e.starts_at)}</p>
              {e.location && <p className="text-sm text-stone-500">{e.location}</p>}
              {e.description && <p className="mt-3 text-stone-700">{e.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
