import type { Item } from '../types';
import ProgressBar from './ProgressBar';
import { money } from '../utils/format';

const STATUS_COLOR: Record<Item['status'], string> = {
  pending: 'bg-stone-200 text-stone-700',
  partially_funded: 'bg-amber-100 text-amber-800',
  funded: 'bg-emerald-100 text-emerald-800',
  purchased: 'bg-sky-100 text-sky-800',
};

export default function ItemCard({ item }: { item: Item }) {
  const target = Number(item.target_cost);
  const raised = Number(item.raised);
  const percent = target > 0 ? (raised / target) * 100 : 0;

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition">
      {item.image_url ? (
        <img src={item.image_url} alt={item.name} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-brand-100 to-brand-400/30 flex items-center justify-center text-brand-900 font-display text-2xl">
          {item.name}
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-brand-900">{item.name}</h3>
          <span className={`text-xs px-2 py-1 rounded ${STATUS_COLOR[item.status]}`}>
            {item.status.replace('_', ' ')}
          </span>
        </div>
        {item.description && <p className="text-sm text-stone-600">{item.description}</p>}
        <ProgressBar percent={percent} />
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">{money(raised)} raised</span>
          <span className="font-medium text-brand-900">of {money(target)}</span>
        </div>
      </div>
    </div>
  );
}
