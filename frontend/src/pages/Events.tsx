import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { EventItem } from '../types';
import { dateLong } from '../utils/format';
import invitationCard from '../assets/invitation-card.png';

const DEFAULT_POSTER = 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=1200&q=80';

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

const EventSkeleton = () => (
  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden md:flex animate-pulse">
    <div className="md:w-64 w-full h-48 md:h-auto bg-stone-200" />
    <div className="p-6 flex-1 space-y-4">
      <div className="h-8 bg-stone-200 rounded w-3/4" />
      <div className="h-4 bg-stone-200 rounded w-1/2" />
      <div className="h-4 bg-stone-200 rounded w-full" />
      <div className="h-4 bg-stone-200 rounded w-5/6" />
    </div>
  </div>
);

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<EventItem[]>('/events')
      .then((r) => setEvents(r.data && r.data.length ? r.data : FALLBACK))
      .catch(() => setEvents(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 text-center md:text-left animate-fade-up">
        <span className="text-brand-600 font-semibold tracking-widest text-xs uppercase mb-2 block">Gather With Us</span>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-brand-900">Upcoming Events</h1>
        <div className="w-24 h-1 bg-brand-600 mt-4 mx-auto md:mx-0 rounded-full" />
      </div>

      {/* Featured Invitation Card */}
      <section className="mb-20 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 animate-fade-up">
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="img-zoom-container relative h-80 md:h-auto bg-stone-100">
            <a href={invitationCard} target="_blank" rel="noreferrer" aria-label="Open full invitation card" className="block h-full w-full">
              <img
                src={invitationCard}
                alt="Cathedral of Praise Mbita fundraiser invitation card"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent md:bg-gradient-to-r" />
            </a>
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-brand-900 leading-tight mb-4">
              CPM Mbita Fundraiser
            </h2>
            <p className="text-brand-600 font-medium text-lg mb-6">7th June 2026 · 10:00 AM</p>
            
            <div className="space-y-4 text-stone-600 mb-8">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Church Hall, Mbita Town <span className="text-stone-400">(behind market, Jasindo Building)</span></span>
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span>Guest of Honour: <strong className="text-brand-900">Hon. Millie Odhiambo, MP Suba North</strong><br />
                Co-Guest: <strong className="text-brand-900">Dr. Musa Obuba PhD, Elder CITAM</strong></span>
              </p>
            </div>

            {/* Detail Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-panel rounded-xl p-4 text-center sm:text-left hover:shadow-md transition-shadow duration-300">
                <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">RSVP Pastor</div>
                <div className="font-serif text-brand-900">Isaac Madanji</div>
                <a href="tel:+254726475921" className="text-sm text-stone-500 hover:text-brand-600 transition-colors">+254 726 475 921</a>
              </div>
              <div className="glass-panel rounded-xl p-4 text-center sm:text-left hover:shadow-md transition-shadow duration-300 border-brand-600/20">
                <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">M-PESA</div>
                <div className="font-serif text-brand-900">Paybill: 400200</div>
                <div className="text-sm text-stone-500">Acc: <span className="font-mono text-brand-900">2270270</span></div>
              </div>
              <div className="glass-panel rounded-xl p-4 text-center sm:text-left hover:shadow-md transition-shadow duration-300">
                <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">RSVP Secretary</div>
                <div className="font-serif text-brand-900">Shadrack Ng'ong'a</div>
                <a href="tel:+254717111551" className="text-sm text-stone-500 hover:text-brand-600 transition-colors">+254 717 111 551</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif font-semibold text-brand-900 mb-6 animate-fade-up">More Gatherings</h3>
        
        {loading ? (
          <>
            <EventSkeleton />
            <EventSkeleton />
          </>
        ) : (
          events.map((e, index) => (
            <article 
              key={e.id} 
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden md:flex hover:shadow-xl hover:shadow-stone-200/50 hover:border-brand-600/30 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${0.1 * (index + 2)}s`, animationFillMode: 'forwards' }}
            >
              <div className="img-zoom-container md:w-72 w-full h-56 md:h-auto relative">
                <img
                  src={e.poster_url || DEFAULT_POSTER}
                  alt={e.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                    {new Date(e.starts_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-stone-400">|</span>
                  <p className="text-sm text-brand-600 font-medium">{dateLong(e.starts_at)}</p>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-brand-900 group-hover:text-brand-600 transition-colors duration-300">
                  {e.title}
                </h2>
                {e.location && (
                  <p className="text-sm text-stone-500 mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {e.location}
                  </p>
                )}
                {e.description && (
                  <p className="mt-4 text-stone-600 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {e.description}
                  </p>
                )}
                <div className="mt-6">
                  <button className="text-sm font-semibold text-brand-900 border-b border-brand-900 pb-0.5 hover:text-brand-600 hover:border-brand-600 transition-colors duration-300 flex items-center gap-2 group/btn">
                    View Details 
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}