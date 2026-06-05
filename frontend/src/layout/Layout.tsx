import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';
import logo from '../assets/cpm-logo.png';

// --- Premium SVG Icon Components ---
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .03 5.37.03 12.01c0 2.12.56 4.2 1.62 6.01L0 24l6.25-1.62a11.93 11.93 0 005.75 1.43h.01c6.63 0 11.97-5.37 11.97-12.01 0-3.21-1.25-6.22-3.44-8.32zM12 21.6c-1.82 0-3.59-.49-5.13-1.42l-.36-.22-3.71.96.99-3.62-.24-.37A9.53 9.53 0 012.4 12c0-5.27 4.28-9.55 9.55-9.55 2.55 0 4.95.99 6.75 2.78a9.48 9.48 0 012.8 6.78c0 5.27-4.28 9.55-9.55 9.55zm5.31-7.55c-.23-.12-1.35-.66-1.56-.73-.21-.07-.36-.12-.51.12-.15.24-.56.73-.69.88-.13.15-.27.17-.5.06-.23-.12-1-0.37-1.88-1.16-.69-.61-1.16-1.36-1.29-1.59-.13-.24-.01-.37.1-.49.1-.1.23-.27.35-.41.12-.15.16-.26.24-.43.08-.17.04-.32-.02-.44-.06-.12-.51-1.23-.7-1.69-.18-.44-.36-.38-.51-.38-.13 0-.28 0-.43 0-.15 0-.39.06-.59.28-.21.22-.79.77-.79 1.88 0 1.1.81 2.16.92 2.31.1.15 1.58 2.42 3.82 3.39 1.06.46 1.88.73 2.52.93.84.27 1.61.23 2.22.14.68-.1 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.1-.22-.16-.45-.28z" /></svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" /></svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></svg>
);

const YouTubeIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" /></svg>
);

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

// --- Navigation Logic ---
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
    isActive 
      ? 'bg-brand-900 text-white shadow-lg shadow-brand-900/20' 
      : 'text-stone-600 hover:text-brand-900 hover:bg-stone-100'
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

const AUTH_LINKS = [{ to: '/profile', label: 'Profile' }];
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
  let whatsappLink: string | undefined;
  if (whatsapp) {
    if (whatsapp.includes('chat.whatsapp.com')) {
      whatsappLink = whatsapp;
    } else {
      whatsappLink = `${whatsapp}${whatsapp.includes('?') ? '&' : '?'}text=${encodeURIComponent(chatMessage)}`;
    }
  }

  // Social Links Configuration
  const socialLinks = [
    { name: 'WhatsApp', url: whatsappLink || whatsapp || '#', icon: <WhatsAppIcon /> },
    { name: 'Facebook', url: 'https://facebook.com', icon: <FacebookIcon /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <InstagramIcon /> },
    { name: 'YouTube', url: 'https://youtube.com', icon: <YouTubeIcon /> },
    { name: 'X', url: 'https://x.com', icon: <XIcon /> },
  ];

  return (
    <div className="min-h-full flex flex-col bg-stone-50">
      {/* Premium Glassmorphic Header */}
      <header className="fixed top-0 w-full z-50 transition-all duration-500 glass-panel border-b border-stone-200/50">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0 group">
            <div className="relative">
              <img src={logo} alt="CPM logo" className="h-12 w-12 object-contain shrink-0 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <span className="min-w-0 hidden sm:block">
              <span className="block font-serif text-lg leading-tight text-brand-900 truncate font-semibold">
                Cathedral of Praise
              </span>
              <span className="block text-[11px] text-stone-500 leading-tight truncate tracking-wide uppercase">
                Mbita Faith Memorial
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to + l.label} to={l.to} end={(l as any).end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" title="My profile" className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-brand-600/20 hover:scale-105 transition-transform duration-300">
                  {(user.full_name || user.email || '?').trim().split(/\s+/).slice(0,2).map((p)=>p[0]?.toUpperCase()||'').join('')}
                </Link>
                <button onClick={logout} className="text-sm font-medium text-stone-500 hover:text-red-600 transition-colors hidden sm:block">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-brand-900 transition-colors px-3 py-2 hidden sm:block">
                  Login
                </Link>
                <Link to="/register" className="text-sm font-medium bg-brand-900 hover:bg-brand-800 text-white px-5 py-2.5 rounded-full shadow-lg shadow-brand-900/20 transition-all duration-300 hover:shadow-xl">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {links.length > 0 && (
          <div className="lg:hidden flex overflow-x-auto gap-1 px-4 pb-3 pt-2 border-t border-stone-100/50">
            {links.map((l) => (
              <NavLink key={'m'+l.to+l.label} to={l.to} end={(l as any).end} className={`${linkClass} whitespace-nowrap text-xs`}>
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Floating WhatsApp Button with Pulse Animation */}
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25"></div>
          <div className="relative flex items-center gap-3 bg-emerald-500 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-emerald-500/30 transition-all duration-500 hover:bg-emerald-600 hover:scale-105 hover:shadow-emerald-500/50">
            <WhatsAppIcon className="w-6 h-6" />
            <span className="text-sm font-semibold whitespace-nowrap">Chat with us</span>
          </div>
        </a>
      )}

      {/* Main Content Wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 pt-28">
        <Outlet />
      </main>

      {/* Premium Large Footer */}
      <footer className="bg-brand-900 text-stone-300 mt-24 relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Col 1: Brand Identity */}
            <div className="lg:col-span-1 animate-fade-up">
              <div className="flex items-center gap-4 mb-6">
                <img src={logo} alt="CPM logo" className="h-16 w-16 object-contain bg-white rounded-full p-2 shadow-xl" />
                <div>
                  <h3 className="font-serif text-xl text-white leading-tight">Cathedral of Praise</h3>
                  <p className="text-xs text-stone-400 tracking-wider uppercase">Mbita Faith Memorial</p>
                </div>
              </div>
              <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                A community of faith, hope, and love, transforming lives and impacting our world through the gospel of Jesus Christ.
              </p>
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <LocationIcon />
                <span>Mbita Town, Suba North, Kenya</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="animate-fade-up stagger-1">
              <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-600 rounded-full" />
              </h4>
              <ul className="space-y-3 text-sm">
                {BASE_LINKS.slice(0, 6).map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-stone-400 hover:text-brand-600 transition-colors duration-300 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-600 group-hover:bg-brand-600 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Upcoming Event */}
            <div className="animate-fade-up stagger-2">
              <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Next Gathering
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-600 rounded-full" />
              </h4>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-500">
                <div className="text-brand-600 text-xs font-bold uppercase tracking-widest mb-2">Fundraiser Gala</div>
                <h5 className="text-white font-serif text-xl mb-3">7th June 2026</h5>
                <p className="text-stone-400 text-sm flex items-center gap-2 mb-1">
                  <ClockIcon /> 10:00 AM
                </p>
                <p className="text-stone-400 text-sm flex items-center gap-2">
                  <LocationIcon /> Church Hall, Mbita
                </p>
                <Link to="/events" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-white transition-colors group">
                  View Details 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300"><ArrowRightIcon /></span>
                </Link>
              </div>
            </div>

            {/* Col 4: Connect & Socials */}
            <div className="animate-fade-up stagger-3">
              <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brand-600 rounded-full" />
              </h4>
              <p className="text-sm text-stone-400 mb-6">
                Follow our journey and stay updated with our community events and sermons.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label={social.name}
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-stone-400 transition-all duration-500 hover:bg-brand-600 hover:border-brand-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-brand-600/20"
                  >
                    {social.icon}
                    {/* Elegant Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-brand-900 text-xs font-semibold rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 animate-fade-up stagger-4">
            <p>&copy; {new Date().getFullYear()} Cathedral of Praise Ministries Int'l. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}