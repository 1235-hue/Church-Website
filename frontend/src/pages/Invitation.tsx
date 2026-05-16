import invitationLetter from '../assets/invitation-letter.png';

export default function Invitation() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl text-brand-900">Official Invitation</h1>
        <p className="text-stone-600 mt-2">
          Cathedral of Praise Ministries Intl — Mbita Faith Memorial Church
          cordially invites you to a Fund Drive for the purchase of church equipment
          on <span className="font-semibold">Sunday, 7th June 2026 at 12:00 Noon</span>.
        </p>
      </header>

      <figure className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <a href={invitationLetter} target="_blank" rel="noreferrer" aria-label="Open full invitation letter">
          <img
            src={invitationLetter}
            alt="Official fundraiser invitation letter from Cathedral of Praise Ministries Intl, Mbita Faith Memorial Church"
            className="w-full h-auto object-contain bg-stone-50"
            loading="lazy"
          />
        </a>
        <figcaption className="px-4 py-3 text-xs text-stone-500 border-t border-stone-100">
          Signed by Pastor Isaac Madanji — Senior Pastor, CPM Fmc Mbita. Click image to view full size.
        </figcaption>
      </figure>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={invitationLetter}
          download="CPM-Mbita-Fundraiser-Invitation.png"
          className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm hover:bg-brand-700"
        >
          Download Invitation
        </a>
        <a href="/rsvp" className="bg-brand-100 text-brand-900 px-4 py-2 rounded-md text-sm hover:bg-brand-200">
          RSVP Now
        </a>
      </div>
    </div>
  );
}
