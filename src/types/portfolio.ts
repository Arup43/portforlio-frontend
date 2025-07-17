export interface Expertise {
  img: string;
  name: string;
}

export interface Project {
  img: string;
  link: string;
  name: string;
  description: string;
}

export interface SocialLink {
  link: string;
  logo: string;
  name: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
}

export interface PortfolioData {
  id: string;
  name: string;
  profile_pic: string;
  about_me: string;
  expertise_roles: string[];
  expertise: Expertise[];
  projects: Project[];
  social_links: SocialLink[];
  contact: Contact;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioResponse {
  success: boolean;
  data: PortfolioData;
  message: string;
} 