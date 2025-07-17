import { PortfolioResponse, PortfolioData } from '@/types/portfolio';

const API_BASE_URL = 'http://localhost:3001/api/portfolios';

export async function fetchPortfolioById(id: string): Promise<PortfolioResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PortfolioResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
}

export interface UpdatePortfolioRequest {
  name?: string;
  profile_pic?: string;
  about_me?: string;
  expertise_roles?: string[];
  expertise?: Array<{
    name: string;
    img: string;
  }>;
  projects?: Array<{
    name: string;
    img: string;
    description: string;
    link: string;
  }>;
  social_links?: Array<{
    name: string;
    logo: string;
    link: string;
  }>;
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface UpdatePortfolioResponse {
  success: boolean;
  data?: PortfolioData;
  error?: string;
  message: string;
}

export async function updatePortfolio(
  id: string,
  updateData: UpdatePortfolioRequest,
  token: string
): Promise<UpdatePortfolioResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data: UpdatePortfolioResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating portfolio:', error);
    throw error;
  }
} 