export default function ProgressBar({ percent }: { percent: number }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full h-4 bg-stone-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
