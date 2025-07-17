const API_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export interface AdminAuthRequest {
  id: string;
  password: string;
}

export interface AdminAuthResponse {
  success: boolean;
  data: {
    edit_access: boolean;
    token: string | null;
  };
  message: string;
}

export async function authenticateAdmin(credentials: AdminAuthRequest): Promise<AdminAuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: AdminAuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Admin authentication error:', error);
    throw error;
  }
}

export function storeAuthToken(token: string): void {
  localStorage.setItem('admin_token', token);
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function removeAuthToken(): void {
  localStorage.removeItem('admin_token');
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
} 