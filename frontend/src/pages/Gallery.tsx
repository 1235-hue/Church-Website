import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Media } from '../types';
import g01 from '../assets/gallery-01.png';
import g02 from '../assets/gallery-02.png';
import g03 from '../assets/gallery-03.png';
import g04 from '../assets/gallery-04.png';
import g05 from '../assets/gallery-05.png';
import g06 from '../assets/gallery-06.png';
import g07 from '../assets/gallery-07.png';
import g08 from '../assets/gallery-08.png';
import g09 from '../assets/gallery-09.png';
import g10 from '../assets/gallery-10.png';
import g11 from '../assets/gallery-11.png';
import g12 from '../assets/gallery-12.png';
import g13 from '../assets/gallery-13.png';
import g14 from '../assets/gallery-14.png';
import g15 from '../assets/gallery-15.png';
import g16 from '../assets/gallery-16.png';
import g17 from '../assets/gallery-17.png';
import g18 from '../assets/gallery-18.png';
import g19 from '../assets/gallery-19.png';
import g20 from '../assets/gallery-20.png';
import g21 from '../assets/gallery-21.png';
import g22 from '../assets/gallery-22.png';
import g23 from '../assets/gallery-23.png';
import g24 from '../assets/gallery-24.png';
import g25 from '../assets/gallery-25.png';

const FALLBACK: Media[] = [
  { id: 'cpm1',  caption: 'Leaders fellowship gathering',           image_url: g01, created_at: '' },
  { id: 'cpm2',  caption: 'Lakeside baptism preparation',           image_url: g02, created_at: '' },
  { id: 'cpm3',  caption: 'Congregants by the lake',                image_url: g03, created_at: '' },
  { id: 'cpm4',  caption: 'Sunday service – mothers & leaders',     image_url: g04, created_at: '' },
  { id: 'cpm5',  caption: 'Baptism in Lake Victoria',               image_url: g05, created_at: '' },
  { id: 'cpm6',  caption: 'Church family at the shoreline',         image_url: g06, created_at: '' },
  { id: 'cpm7',  caption: 'Community outreach at Mbita market',     image_url: g07, created_at: '' },
  { id: 'cpm8',  caption: 'Youth & congregation worship service',   image_url: g08, created_at: '' },
  { id: 'cpm9',  caption: 'Leaders meeting at Bimoss',              image_url: g09, created_at: '' },
  { id: 'cpm10', caption: 'Outdoor leaders fellowship',             image_url: g10, created_at: '' },
  { id: 'cpm11', caption: 'Mothers attending service',              image_url: g11, created_at: '' },
  { id: 'cpm12', caption: 'Baptism in the lake',                    image_url: g12, created_at: '' },
  { id: 'cpm13', caption: 'Prayer at the lakeside',                 image_url: g13, created_at: '' },
  { id: 'cpm14', caption: 'Open-air evangelism at the market',      image_url: g14, created_at: '' },
  { id: 'cpm15', caption: 'Leaders strategy meeting',               image_url: g15, created_at: '' },
  { id: 'cpm16', caption: 'Youth conference gathering',             image_url: g16, created_at: '' },
  { id: 'cpm17', caption: 'Street preaching in Mbita town',         image_url: g17, created_at: '' },
  { id: 'cpm18', caption: 'Lakeside ministry team',                 image_url: g18, created_at: '' },
  { id: 'cpm19', caption: 'Sunday worship congregation',            image_url: g19, created_at: '' },
  { id: 'cpm20', caption: 'Clergy gathering at C.O.P sanctuary',     image_url: g20, created_at: '' },
  { id: 'cpm21', caption: 'Church family after Sunday service',     image_url: g21, created_at: '' },
  { id: 'cpm22', caption: 'Testimony time during service',          image_url: g22, created_at: '' },
  { id: 'cpm23', caption: 'Pastor addressing the congregation',     image_url: g23, created_at: '' },
  { id: 'cpm24', caption: 'Sunday service congregation under the shelter', image_url: g24, created_at: '' },
  { id: 'cpm25', caption: 'Worship leaders ministering in song',          image_url: g25, created_at: '' },
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
