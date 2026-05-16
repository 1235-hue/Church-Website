import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Item } from '../types';
import ItemCard from '../components/ItemCard';
import keyboard from '../assets/item-keyboard.png';
import drums from '../assets/item-drums.png';
import generator from '../assets/item-generator.png';
import jblSpeaker from '../assets/item-jbl-speaker.png';
import subwoofer from '../assets/item-subwoofer.png';
import chairs from '../assets/item-chairs.png';
import wirelessMics from '../assets/item-wireless-mics.png';
import cordedMic from '../assets/item-corded-mic.png';
import dbxProcessor from '../assets/item-dbx-processor.png';
import curtains from '../assets/item-curtains.png';

const FALLBACK: Item[] = [
  { id: 'kbd', name: 'Yamaha PSR Keyboard', description: 'Arranger workstation keyboard for worship music & choir accompaniment.', image_url: keyboard, target_cost: '180000', raised: '40000', status: 'partially_funded' },
  { id: 'drm', name: 'TAMA 5-Piece Drum Kit', description: 'Acoustic drum kit with cymbals & hardware for the worship team.', image_url: drums, target_cost: '120000', raised: '30000', status: 'partially_funded' },
  { id: 'gen', name: 'Honda Power Generator', description: 'Backup generator to power services and events during outages.', image_url: generator, target_cost: '95000', raised: '15000', status: 'partially_funded' },
  { id: 'jbl', name: 'JBL Line-Array Speakers', description: 'High-power JBL speakers for clear sanctuary sound.', image_url: jblSpeaker, target_cost: '220000', raised: '60000', status: 'partially_funded' },
  { id: 'sub', name: 'JBL SRX718S Subwoofer', description: 'Dual 18" high-power subwoofer for full-range worship sound.', image_url: subwoofer, target_cost: '160000', raised: '20000', status: 'partially_funded' },
  { id: 'chr', name: 'Congregation Chairs (200)', description: 'Durable stackable chairs to seat our growing congregation.', image_url: chairs, target_cost: '300000', raised: '75000', status: 'partially_funded' },
  { id: 'wmic', name: 'Wireless Microphone Set', description: '4-channel professional wireless microphone system for pastors & worship leaders.', image_url: wirelessMics, target_cost: '45000', raised: '10000', status: 'partially_funded' },
  { id: 'cmic', name: 'Corded Vocal Microphones', description: 'Cardioid moving-coil microphones for the choir and pulpit.', image_url: cordedMic, target_cost: '18000', raised: '5000', status: 'partially_funded' },
  { id: 'dbx', name: 'DBX Audio Processor', description: 'Digital signal processor for clean, balanced audio across the PA system.', image_url: dbxProcessor, target_cost: '70000', raised: '0', status: 'pending' },
  { id: 'cur', name: 'Sanctuary Curtains', description: 'Heavy-duty stage and window curtains for the sanctuary.', image_url: curtains, target_cost: '40000', raised: '0', status: 'pending' },
];

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    api.get<Item[]>('/items')
      .then((r) => setItems(r.data && r.data.length ? r.data : FALLBACK))
      .catch(() => setItems(FALLBACK));
  }, []);
  const display = items.length ? items : FALLBACK;
  return (
    <div>
      <h1 className="text-3xl text-brand-900 mb-6">Instruments & Items</h1>
      <p className="text-stone-600 mb-6">Each item below is part of our 2026 fundraiser. Track funding progress live.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {display.map((it) => <ItemCard key={it.id} item={it} />)}
      </div>
    </div>
  );
}
