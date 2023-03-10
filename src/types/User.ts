export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  jobTitle: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  jobTitle: string | null;
}

export interface UpdateUserRequest {
  name: string;
  password: string | null;
  isAdmin: boolean;
  jobTitle: string | null;
}
