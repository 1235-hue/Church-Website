export interface Goal {
  id: number;
  title: string;
  goal_amount: string;
  currency: string;
  event_date: string;
}
export interface Summary {
  goal: Goal | null;
  total: number;
  count: number;
  percent: number;
}
export interface Contribution {
  id: string;
  contributor: string;
  amount: string;
  method: string;
  note?: string;
  phone?: string;
  item_id?: string | null;
  user_id?: string | null;
  contributed_at: string;
}
export interface Item {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  target_cost: string;
  raised: string;
  status: 'pending' | 'partially_funded' | 'funded' | 'purchased';
}
export interface EventItem {
  id: string;
  title: string;
  description?: string;
  poster_url?: string;
  starts_at: string;
  location?: string;
}
export interface Media {
  id: string;
  caption?: string;
  image_url: string;
  created_at?: string;
}
export type Role = 'admin' | 'staff' | 'user';
export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: Role;
}
