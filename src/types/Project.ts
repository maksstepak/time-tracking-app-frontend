import type { Client } from '@/types/Client';

export interface Project {
  id: number;
  name: string;
  description: string | null;
  client: Client;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string | null;
}

export interface UpdateProjectRequest {
  name: string;
  description: string | null;
}
