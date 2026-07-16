export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  features: string[];
  techStack: string[];
  caseStudy: {
    title: string;
    metrics: string;
    description: string;
  };
}

export interface Client {
  name: string;
  logoText: string;
  iconName: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Science' | 'Color' | 'Industry' | 'Business';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
}

export interface OfficeLocation {
  region: string;
  city: string;
  address: string;
  phone?: string;
  email: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  subSteps: { title: string; desc: string }[];
}
