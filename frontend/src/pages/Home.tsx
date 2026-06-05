import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Summary, Contribution } from '../types';
import { money } from '../utils/format';
import logo from '../assets/cpm-logo.png';
import invitationLetter from '../assets/invitation-letter.png';

// --- Premium SVG Icons ---
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

// --- Skeleton Loaders for Perceived Performance ---
const ContributionSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-2xl p-5 animate-pulse flex items-center gap-4">
    <div className="w-12 h-12 bg-stone-200 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-stone-200 rounded w-1/2" />
      <div className="h-3 bg-stone-200 rounded w-1/3" />
    </div>
    <div className="h-6 bg-stone-200 rounded w-16" />
  </div>
);

export default function Home() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [recent, setRecent] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data concurrently for faster perceived loading
    Promise.all([
      api.get<Summary>('/contributions/summary').catch(() => null),
      api.get<{ items: Contribution[] }>('/contributions?limit=8&public=1').catch(() => null)
    ]).then(([sumRes, contRes]) => {
      if (sumRes?.data) setSummary(sumRes.data);
      if (contRes?.data) {
        const items = (contRes.data as any).items || (contRes.data as any) || [];
        setRecent(items);
      }
    }).finally(() => setLoading(false));
  }, []);

  const currency = summary?.goal?.currency || 'KES';
  const goalAmount = Number(summary?.goal?.goal_amount || 0);
  const totalRaised = Number(summary?.total || 0);
  const progressPercent = goalAmount > 0 ? Math.min((totalRaised / goalAmount) * 100, 100) : 0;

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      
      {/* ==========================================
          1. IMMERSIVE HERO SECTION
      ========================================== */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Mesh Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-stone-200/60 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full shadow-sm">
              <img src={logo} alt="CPM" className="h-6 w-6 object-contain" />
              <span className="text-xs font-semibold tracking-widest text-brand-800 uppercase">Cathedral of Praise</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-900 leading-[1.1] font-semibold">
              Together <br/>
              <span className="text-brand-600 italic">We Build</span>
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
              Join us in equipping our sanctuary with the tools needed for worship and community outreach. Every contribution brings us closer to our shared vision.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-500 font-medium">
              <div className="flex items-center gap-2">
                <CalendarIcon />
                <span>7 June 2026 · 10:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon />
                <span>Church Hall, Mbita Town</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/donate" 
                className="group relative inline-flex items-center gap-2 bg-brand-900 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-brand-900/20 hover:shadow-2xl hover:shadow-brand-900/30 hover:scale-105 transition-all duration-300"
              >
                Support the Vision
                <span className="group-hover:translate-x-1 transition-transform duration-300"><ArrowRightIcon /></span>
              </Link>
              <Link 
                to="/rsvp" 
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200 text-brand-900 px-8 py-4 rounded-full font-semibold hover:bg-white hover:border-brand-600/30 transition-all duration-300"
              >
                RSVP Now
              </Link>
            </div>
          </div>

          {/* Right: Visual & Stats Card */}
          <div className="relative animate-fade-up stagger-2">
            {/* Decorative Image Frame */}
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-300/50 border border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1000&q=80" 
                alt="Church community" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
              
              {/* Floating Glassmorphic Stats Card */}
              {summary?.goal && (
                <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-6 shadow-xl backdrop-blur-xl border border-white/40">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">Funds Raised</p>
                      <h3 className="text-3xl font-serif font-bold text-brand-900">{money(totalRaised, currency)}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-stone-500 mb-1">of {money(goalAmount, currency)}</p>
                      <p className="text-lg font-bold text-brand-900">{progressPercent.toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  {/* Premium Progress Bar */}
                  <div className="w-full h-2 bg-stone-200/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-600 to-brand-800 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-stone-500">
                    <span className="font-semibold text-brand-900">{summary.count}</span> generous contributions
                  </p>
                </div>
              )}
            </div>
            
            {/* Floating Accent Element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-600/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* ==========================================
          2. RECENT CONTRIBUTIONS (Bento Grid)
      ========================================== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-up">
          <div>
            <span className="text-brand-600 font-semibold tracking-widest text-xs uppercase mb-2 block">Community Impact</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-brand-900">Recent Supporters</h2>
            <div className="w-24 h-1 bg-brand-600 mt-4 rounded-full" />
          </div>
          <p className="text-stone-500 max-w-md text-lg">
            We are deeply grateful for every gift. Here are the latest members of our community who have helped us grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <ContributionSkeleton key={i} />)
          ) : recent.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white/50 border border-dashed border-stone-300 rounded-3xl animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 rounded-full text-stone-400 mb-4">
                <HeartIcon />
              </div>
              <p className="text-stone-500 mt-4 text-lg">Be the first to contribute toward the vision.</p>
              <Link to="/donate" className="inline-block mt-4 text-brand-600 font-semibold hover:underline">Make a Contribution</Link>
            </div>
          ) : (
            recent.map((c, index) => {
              const initials = (c.contributor || 'Anonymous').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              return (
                <div 
                  key={c.id} 
                  className="group bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-stone-200/50 hover:border-brand-600/20 transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-100 to-stone-100 border border-white flex items-center justify-center text-brand-800 font-bold text-sm shadow-sm">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-brand-900 truncate group-hover:text-brand-600 transition-colors">
                        {c.contributor || 'Anonymous'}
                      </h4>
                      <p className="text-xs text-stone-400">
                        {new Date(c.contributed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                      {c.method || 'Donation'}
                    </span>
                    <span className="text-lg font-serif font-bold text-brand-900">
                      {money(Number(c.amount), currency)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ==========================================
          3. OFFICIAL INVITATION (Split Layout)
      ========================================== */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-xl shadow-stone-200/50 animate-fade-up">
          
          {/* Left: Text Content */}
          <div className="p-8 md:p-12 lg:p-16 space-y-6">
            <span className="text-brand-600 font-semibold tracking-widest text-xs uppercase mb-2 block">You Are Invited</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-brand-900 leading-tight">
              An Official <br/>
              <span className="italic text-brand-600">Invitation</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Cathedral of Praise Ministries Int'l — Mbita Faith Memorial Church cordially invites you to a 
              Fund Drive for the purchase of church equipment.
            </p>
            
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 space-y-4">
              <div className="flex items-center gap-3 text-brand-900">
                <CalendarIcon />
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Date & Time</p>
                  <p className="font-medium">Sunday, 7th June 2026 at 12:00 Noon</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-brand-900">
                <MapPinIcon />
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Location</p>
                  <p className="font-medium">Church Hall, Mbita Town</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/donate" 
                className="group inline-flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-brand-900/20 hover:bg-brand-800 transition-all duration-300"
              >
                How to Donate
                <span className="group-hover:translate-x-1 transition-transform"><ArrowRightIcon /></span>
              </Link>
              <Link 
                to="/rsvp" 
                className="inline-flex items-center gap-2 border border-stone-300 text-brand-900 px-6 py-3 rounded-full font-semibold hover:border-brand-600 hover:text-brand-600 transition-all duration-300"
              >
                RSVP for the Event
              </Link>
            </div>
          </div>

          {/* Right: Invitation Letter Image */}
          <div className="relative h-full min-h-[500px] bg-stone-100 p-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-stone-100/50" />
            <figure className="relative w-full max-w-md mx-auto transform hover:-rotate-1 transition-transform duration-500">
              {/* Decorative "Polaroid" Backing */}
              <div className="absolute -inset-4 bg-white rounded-lg shadow-2xl shadow-stone-300/50 border border-stone-200/50 -z-10 rotate-2" />
              <a 
                href={invitationLetter} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Open full invitation letter"
                className="block bg-white p-4 rounded-lg shadow-xl border border-stone-200/80 overflow-hidden"
              >
                <img
                  src={invitationLetter}
                  alt="Official fundraiser invitation letter from Cathedral of Praise Ministries Int'l"
                  className="w-full h-auto object-contain bg-white hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </a>
              <figcaption className="mt-6 text-center text-xs text-stone-500 italic">
                Signed by Pastor Isaac Madanji — Senior Pastor, CPM FMC Mbita.
                <br/>
                <a href={invitationLetter} target="_blank" rel="noreferrer" className="text-brand-600 font-semibold not-italic hover:underline">
                  Click to view full size
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

    </div>
  );
}