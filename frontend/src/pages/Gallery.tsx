import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Media } from '../types';

export default function Gallery() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Media[]>('/media')
      .then((r) => setMedia(r.data ?? []))
      .catch(() => setMedia([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-brand-900 mb-6">Media Gallery</h1>

      {loading ? (
        <div className="text-stone-500">Loading photos...</div>
      ) : media.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center text-stone-600">
          No photos yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {media.map((m) => (
            <figure key={m.id} className="relative group rounded-xl overflow-hidden border border-stone-200">
              <img
                src={m.image_url}
                alt={m.caption || 'Church gallery photo'}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-105 transition"
              />
              {m.caption && (
                <figcaption className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs p-2">
                  {m.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
