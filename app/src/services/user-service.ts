import { upsertUser, getCurrentUser } from '@movie/dataconnect';
import type { User } from '@/types';

export async function syncUser(username: string): Promise<void> {
  await upsertUser({ username });
}

export async function fetchCurrentUser(): Promise<User | null> {
  const { data } = await getCurrentUser();
  return data.user ?? null;
}
