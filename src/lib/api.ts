import { PortfolioResponse } from '@/types/portfolio';

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