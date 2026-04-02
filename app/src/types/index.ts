export interface Item {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  status?: string | null;
  tags?: string[] | null;
  createdAt?: string | null;
  user?: { id: string; username: string } | null;
}

export interface User {
  id: string;
  username: string;
}

export interface CreateItemInput {
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
}
