export const money = (n: number | string, currency = 'KES') =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(n));

export const dateLong = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });

export const dateShort = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' });
