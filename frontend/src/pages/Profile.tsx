import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../store/auth';
import { money, dateShort } from '../utils/format';
import type { Contribution, Summary } from '../types';

interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
}

interface RsvpData {
  full_name: string;
  email: string;
  guests: number;
  created_at: string;
}

function initialsOf(name?: string) {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');
}

export default function Profile() {
  const { user, setAuth, token } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [mine, setMine] = useState<Contribution[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [rsvp, setRsvp] = useState<RsvpData | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api.get<ProfileData>('/auth/profile').then((r) => {
      setProfile(r.data);
      setFullName(r.data.full_name);
      setPhone(r.data.phone || '');
    }).catch(() => {});
    api.get<Contribution[]>('/contributions').then((r) => setMine(r.data)).catch(() => {});
    api.get<Summary>('/contributions/summary').then((r) => setSummary(r.data)).catch(() => {});
    if (user?.email) {
      api.get<RsvpData>(`/rsvps/me`).then((r) => setRsvp(r.data)).catch(() => setRsvp(null));
    }
  }, [user?.email]);

  const totalContributed = mine.reduce((s, c) => s + Number(c.amount), 0);
  const currency = summary?.goal?.currency || 'KES';

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg('');
    try {
      const { data } = await api.put<ProfileData>('/auth/profile', { full_name: fullName, phone });
      setProfile(data);
      if (user && token) setAuth(token, { ...user, full_name: data.full_name, phone: data.phone });
      setProfileMsg('Profile updated.');
    } catch (err: any) {
      setProfileMsg(err?.response?.data?.error || 'Update failed');
    } finally {
      setSavingProfile(false);
    }
  }

  async function savePassword(e: FormEvent) {
    e.preventDefault();
    setPwdMsg('');
    if (newPassword.length < 6) return setPwdMsg('New password must be at least 6 characters.');
    if (newPassword !== confirmPassword) return setPwdMsg('Passwords do not match.');
    setSavingPwd(true);
    try {
      await api.put('/auth/password', { current_password: currentPassword, new_password: newPassword });
      setPwdMsg('Password updated.');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setPwdMsg(err?.response?.data?.error || 'Update failed');
    } finally {
      setSavingPwd(false);
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-brand-600 text-white flex items-center justify-center text-2xl font-display shadow">
          {initialsOf(profile?.full_name || user?.full_name)}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-3xl text-brand-900">{profile?.full_name || user?.full_name}</h1>
          <p className="text-stone-500 text-sm">{profile?.email}</p>
          {profile?.created_at && (
            <p className="text-stone-400 text-xs">Member since {dateShort(profile.created_at)}</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsEditing((v) => !v);
            setProfileMsg('');
            setPwdMsg('');
          }}
          className="text-sm bg-brand-600 hover:bg-brand-900 text-white px-4 py-2 rounded-md transition"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        {isEditing && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5">
            <h2 className="text-lg text-brand-900 mb-1">Account info</h2>
            <dl className="text-sm divide-y">
              <div className="py-2 flex justify-between"><dt className="text-stone-500">Full name</dt><dd>{profile?.full_name || '—'}</dd></div>
              <div className="py-2 flex justify-between"><dt className="text-stone-500">Email</dt><dd>{profile?.email || '—'}</dd></div>
              <div className="py-2 flex justify-between"><dt className="text-stone-500">Phone</dt><dd>{profile?.phone || '—'}</dd></div>
              <div className="py-2 flex justify-between"><dt className="text-stone-500">Member since</dt><dd>{profile?.created_at ? dateShort(profile.created_at) : '—'}</dd></div>
            </dl>
          </div>
        )}

        <div className="bg-white border border-stone-200 rounded-2xl p-5">
          <h2 className="text-lg text-brand-900 mb-3">My contributions</h2>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-xs text-stone-500">Total contributed</div>
              <div className="text-2xl font-semibold text-brand-900">{money(totalContributed, currency)}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500">Number of contributions</div>
              <div className="text-2xl font-semibold text-brand-900">{mine.length}</div>
            </div>
          </div>
          <Link to="/dashboard" className="text-sm text-brand-700 hover:underline">View full contribution history →</Link>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5">
          <h2 className="text-lg text-brand-900 mb-3">RSVP status</h2>
          {rsvp ? (
            <>
              <p className="text-sm text-emerald-700">You are RSVP'd for the event.</p>
              <p className="text-sm text-stone-600 mt-1">Guests registered: <span className="font-semibold">{rsvp.guests}</span></p>
            </>
          ) : (
            <p className="text-sm text-stone-500">You have not RSVP'd yet.</p>
          )}
          <Link to="/rsvp" className="inline-block mt-3 text-sm bg-brand-600 hover:bg-brand-900 text-white px-3 py-2 rounded-md">
            {rsvp ? 'Update RSVP' : 'RSVP now'}
          </Link>
        </div>

        {isEditing && (
          <>
            <form onSubmit={saveProfile} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
              <h2 className="text-lg text-brand-900">Edit profile</h2>
              <div>
                <label className="text-xs text-stone-500">Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required minLength={2}
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-stone-500">Phone number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <button disabled={savingProfile} className="bg-brand-600 hover:bg-brand-900 text-white px-4 py-2 rounded-md text-sm">
                {savingProfile ? 'Saving…' : 'Save changes'}
              </button>
              {profileMsg && <p className="text-xs text-stone-600">{profileMsg}</p>}
            </form>

            <form onSubmit={savePassword} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 md:col-span-2">
              <h2 className="text-lg text-brand-900">Change password</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="password" placeholder="Current password" value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)} required
                  className="border border-stone-300 rounded-md px-3 py-2 text-sm" />
                <input type="password" placeholder="New password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} required minLength={6}
                  className="border border-stone-300 rounded-md px-3 py-2 text-sm" />
                <input type="password" placeholder="Confirm new password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6}
                  className="border border-stone-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <button disabled={savingPwd} className="bg-brand-600 hover:bg-brand-900 text-white px-4 py-2 rounded-md text-sm">
                {savingPwd ? 'Updating…' : 'Update password'}
              </button>
              {pwdMsg && <p className="text-xs text-stone-600">{pwdMsg}</p>}
            </form>
          </>
        )}
      </section>
    </div>
  );
}
