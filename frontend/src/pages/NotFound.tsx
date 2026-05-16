import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-display text-brand-900">404</h1>
      <p className="text-stone-600 mt-2">This page doesn't exist.</p>
      <Link to="/" className="text-brand-600 hover:underline mt-4 inline-block">← Back home</Link>
    </div>
  );
}
