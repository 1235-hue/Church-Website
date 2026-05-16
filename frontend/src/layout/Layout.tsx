import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';
import logo from '../assets/cpm-logo.png';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? 'bg-brand-100 text-brand-900' : 'text-stone-600 hover:text-brand-600'
  }`;

const PUBLIC_LINKS = [
  { to: '/about-us', label: 'About Us' },
];

const USER_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/items', label: 'Items' },
  { to: '/events', label: 'Events' },
  { to: '/invitation', label: 'Invitation' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/donate', label: 'Donate' },
  { to: '/profile', label: 'Profile' },
];

const ADMIN_LINKS = [
  { to: '/admin', label: 'Home', end: true },
  { to: '/items', label: 'Items' },
  { to: '/events', label: 'Events' },
  { to: '/contributions', label: 'Contributions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/admin', label: 'Admin Panel' },
  { to: '/profile', label: 'Profile' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const whatsapp = import.meta.env.VITE_WHATSAPP_URL;
  const isAdmin = user?.role === 'admin' || user?.role === 'staff';
  const links = [...PUBLIC_LINKS, ...(user ? (isAdmin ? ADMIN_LINKS : USER_LINKS) : [])];

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
