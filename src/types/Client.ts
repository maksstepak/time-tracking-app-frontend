export interface Client {
  id: number;
  name: string;
  description: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientRequest {
  name: string;
  description: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
}

export interface UpdateClientRequest {
  name: string;
  description: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
}
