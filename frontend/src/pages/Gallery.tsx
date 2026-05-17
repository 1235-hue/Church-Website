import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Media } from '../types';
// Images are hosted in Supabase storage; local imports removed.

const FALLBACK: Media[] = [
  { id: 'cpm1',  caption: 'Leaders fellowship gathering',           image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-01.png', created_at: '' },
  { id: 'cpm2',  caption: 'Lakeside baptism preparation',           image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-02.png', created_at: '' },
  { id: 'cpm3',  caption: 'Congregants by the lake',                image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-03.png', created_at: '' },
  { id: 'cpm4',  caption: 'Sunday service – mothers & leaders',     image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-04.png', created_at: '' },
  { id: 'cpm5',  caption: 'Baptism in Lake Victoria',               image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-05.png', created_at: '' },
  { id: 'cpm6',  caption: 'Church family at the shoreline',         image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-06.png', created_at: '' },
  { id: 'cpm7',  caption: 'Community outreach at Mbita market',     image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-07.png', created_at: '' },
  { id: 'cpm8',  caption: 'Youth & congregation worship service',   image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-08.png', created_at: '' },
  { id: 'cpm9',  caption: 'Leaders meeting at Bimoss',              image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-09.png', created_at: '' },
  { id: 'cpm10', caption: 'Outdoor leaders fellowship',             image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-10.png', created_at: '' },
  { id: 'cpm11', caption: 'Mothers attending service',              image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-11.png', created_at: '' },
  { id: 'cpm12', caption: 'Baptism in the lake',                    image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-12.png', created_at: '' },
  { id: 'cpm13', caption: 'Prayer at the lakeside',                 image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-13.png', created_at: '' },
  { id: 'cpm14', caption: 'Open-air evangelism at the market',      image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-14.png', created_at: '' },
  { id: 'cpm15', caption: 'Leaders strategy meeting',               image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-15.png', created_at: '' },
  { id: 'cpm16', caption: 'Youth conference gathering',             image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-16.png', created_at: '' },
  { id: 'cpm17', caption: 'Street preaching in Mbita town',         image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-17.png', created_at: '' },
  { id: 'cpm18', caption: 'Lakeside ministry team',                 image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-18.png', created_at: '' },
  { id: 'cpm19', caption: 'Sunday worship congregation',            image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-19.png', created_at: '' },
  { id: 'cpm20', caption: 'Clergy gathering at C.O.P sanctuary',     image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-20.png', created_at: '' },
  { id: 'cpm21', caption: 'Church family after Sunday service',     image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-21.png', created_at: '' },
  { id: 'cpm22', caption: 'Testimony time during service',          image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-22.png', created_at: '' },
  { id: 'cpm23', caption: 'Pastor addressing the congregation',     image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-23.png', created_at: '' },
  { id: 'cpm24', caption: 'Sunday service congregation under the shelter', image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-24.png', created_at: '' },
  { id: 'cpm25', caption: 'Worship leaders ministering in song',    image_url: 'https://xxxx.supabase.co/storage/v1/object/public/gallery/gallery-25.png', created_at: '' },
];

export default function Gallery() {
  const [media, setMedia] = useState<Media[]>([]);
  useEffect(() => {
    api.get<Media[]>('/media')
      .then((r) => setMedia(r.data && r.data.length ? r.data : FALLBACK))
      .catch(() => setMedia(FALLBACK));
  }, []);
  const items = media.length ? media : FALLBACK;
  return (
    <div>
      <h1 className="text-3xl text-brand-900 mb-6">Media Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((m) => (
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
    </div>
  );
}
