import mpesaLogo from '../assets/mpesa-logo.png';
import coopLogo from '../assets/coop-bank-logo.png';
import { useState } from 'react';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="ml-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-amber-300 text-amber-700 hover:bg-amber-50 transition"
      aria-label={`Copy ${value}`}
    >
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
}

function Row({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-amber-100 last:border-0">
      <div>
        <div className="text-xs uppercase tracking-wide text-stone-500">{label}</div>
        <div className="text-stone-900 font-semibold">{value}</div>
      </div>
      {copy && <CopyButton value={value} />}
    </div>
  );
}

export default function Donate() {
  const whatsapp = import.meta.env.VITE_WHATSAPP_URL;
  const mapsEmbed = import.meta.env.VITE_GOOGLE_MAPS_EMBED;

  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-display text-brand-900">How to Donate</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Every contribution brings us closer to the goal. Choose your preferred payment method below.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* M-Pesa Card */}
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-300 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-5">
            <img src={mpesaLogo} alt="M-Pesa" className="h-12 w-12 rounded-lg object-contain bg-white p-1 shadow" />
            <div>
              <h2 className="text-2xl font-display text-brand-900">M-Pesa</h2>
              <p className="text-xs text-stone-500">Paybill — Co-operative Bank</p>
            </div>
          </div>
          <Row label="Business Number" value="400200" copy />
          <Row label="Account Number" value="2270270" copy />
          <Row label="Recipient" value="Co-operative Bank" />
          <p className="mt-4 text-xs text-stone-500 italic">
            Go to M-Pesa → Lipa na M-Pesa → Pay Bill, enter the details above.
          </p>
        </div>

        {/* Bank Transfer Card */}
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-300 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-5">
            <img src={coopLogo} alt="Co-operative Bank" className="h-12 w-12 rounded-lg object-contain bg-white p-1 shadow" />
            <div>
              <h2 className="text-2xl font-display text-brand-900">Direct Bank Transfer</h2>
              <p className="text-xs text-stone-500">Co-operative Bank of Kenya</p>
            </div>
          </div>
          <Row label="Bank" value="Co-operative Bank of Kenya" />
          <Row label="Account Name" value="Cathedral of Praises - Mbita" copy />
          <Row label="Account Number" value="01128332129900" copy />
          <Row label="Account Type" value="Goodwill" />
          <p className="mt-4 text-xs text-stone-500 italic">
            Send your contribution from any bank or mobile banking app.
          </p>
        </div>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-center">
        <p className="text-stone-700">
          After donating, please share the receipt on our WhatsApp community so we can confirm and update the live tracker.
        </p>
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noreferrer"
             className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-md font-medium">
            💬 Join the WhatsApp Community
          </a>
        )}
      </div>

      {mapsEmbed && (
        <div>
          <h2 className="text-2xl text-brand-900 mb-3">📍 Find the Church</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-stone-200">
            <iframe src={mapsEmbed} className="w-full h-full" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      )}
    </div>
  );
}
