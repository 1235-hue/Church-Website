import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';
import logo from '../assets/cpm-logo.png';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? 'bg-brand-100 text-brand-900' : 'text-stone-600 hover:text-brand-600'
  }`;

const BASE_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'About Us' },
  { to: '/items', label: 'Items' },
  { to: '/events', label: 'Events' },
  { to: '/invitation', label: 'Invitation' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/donate', label: 'Donate' },
];

const AUTH_LINKS = [
  { to: '/profile', label: 'Profile' },
];

const ADMIN_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/contributions', label: 'Contributions' },
  { to: '/admin', label: 'Admin Panel' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const whatsapp = import.meta.env.VITE_WHATSAPP_URL;
  const isAdmin = user?.role === 'admin' || user?.role === 'staff';
  const links = [
    ...BASE_LINKS,
    ...(user ? [...(isAdmin ? ADMIN_LINKS : []), ...AUTH_LINKS] : []),
  ];
  const chatMessage = 'Hello, I have a question about the Cathedral of Praise Ministries fundraiser.';
  const whatsappLink = whatsapp
    ? `${whatsapp}${whatsapp.includes('?') ? '&' : '?'}text=${encodeURIComponent(chatMessage)}`
    : undefined;

  return (
    <div className="min-h-full flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="CPM logo" className="h-12 w-12 object-contain shrink-0" />
            <span className="min-w-0">
              <span className="block font-display text-base sm:text-lg leading-tight text-brand-900 truncate">
                Cathedral of Praise Ministries Int'l
              </span>
              <span className="block text-[11px] sm:text-xs text-stone-500 leading-tight truncate">
                Mbita Faith Memorial Church
              </span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to + l.label} to={l.to} end={(l as any).end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noreferrer"
                 className="hidden sm:inline-block text-xs bg-emerald-500 text-white px-3 py-2 rounded-md hover:bg-emerald-600">
                WhatsApp
              </a>
            )}
            {user ? (
              <>
                <Link to="/profile" title="My profile" className="h-9 w-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold hover:bg-brand-900">
                  {(user.full_name || user.email || '?').trim().split(/\s+/).slice(0,2).map((p)=>p[0]?.toUpperCase()||'').join('')}
                </Link>
                <button onClick={logout} className="text-sm text-stone-600 hover:text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-brand-700 hover:underline">Login</Link>
                <Link to="/register" className="text-sm bg-brand-600 hover:bg-brand-900 text-white px-3 py-2 rounded-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        {links.length > 0 && (
          <div className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2 border-t border-stone-100">
            {links.map((l) => (
              <NavLink key={'m'+l.to+l.label} to={l.to} end={(l as any).end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm text-white shadow-2xl transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .03 5.37.03 12.01c0 2.12.56 4.2 1.62 6.01L0 24l6.25-1.62a11.93 11.93 0 005.75 1.43h.01c6.63 0 11.97-5.37 11.97-12.01 0-3.21-1.25-6.22-3.44-8.32zM12 21.6c-1.82 0-3.59-.49-5.13-1.42l-.36-.22-3.71.96.99-3.62-.24-.37A9.53 9.53 0 012.4 12c0-5.27 4.28-9.55 9.55-9.55 2.55 0 4.95.99 6.75 2.78a9.48 9.48 0 012.8 6.78c0 5.27-4.28 9.55-9.55 9.55zm5.31-7.55c-.23-.12-1.35-.66-1.56-.73-.21-.07-.36-.12-.51.12-.15.24-.56.73-.69.88-.13.15-.27.17-.5.06-.23-.12-1-0.37-1.88-1.16-.69-.61-1.16-1.36-1.29-1.59-.13-.24-.01-.37.1-.49.1-.1.23-.27.35-.41.12-.15.16-.26.24-.43.08-.17.04-.32-.02-.44-.06-.12-.51-1.23-.7-1.69-.18-.44-.36-.38-.51-.38-.13 0-.28 0-.43 0-.15 0-.39.06-.59.28-.21.22-.79.77-.79 1.88 0 1.1.81 2.16.92 2.31.1.15 1.58 2.42 3.82 3.39 1.06.46 1.88.73 2.52.93.84.27 1.61.23 2.22.14.68-.1 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.1-.22-.16-.45-.28z" />
            </svg>
          </span>
          <span>Chat with us</span>
        </a>
      )}

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-brand-900 text-brand-50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <img src={logo} alt="CPM logo" className="h-14 w-14 object-contain bg-white rounded-full p-1 shrink-0" />
            <div>
              <div className="font-display text-lg leading-tight">Cathedral of Praise Ministries Int'l</div>
              <div className="text-xs opacity-80">Mbita Faith Memorial Church</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-1">Event</div>
            <p>7 June 2026 · 10:00 AM</p>
            <p>Church Hall, Mbita Town</p>
          </div>
          <div>
            <div className="font-semibold mb-1">Connect</div>
            {whatsapp && <a href={whatsapp} target="_blank" rel="noreferrer" className="block hover:underline">WhatsApp</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
