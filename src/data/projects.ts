export interface ArtProject {
  id: number;
  title: string;
  category: 'Illustration' | 'Painting' | 'Design';
  imageUrl: string;
  year: string;
  medium?: string;
}

export const projects: ArtProject[] = [
  { 
    id: 1, 
    title: 'project_1', 
    category: 'Illustration', 
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=85&w=600',
    year: '2024',
    medium: 'Digital illustration'
  },
  { 
    id: 2, 
    title: 'project_2', 
    category: 'Painting', 
    imageUrl: 'https://images.unsplash.com/photo-1552089123-2d26226fc2b7?q=85&w=600',
    year: '2024',
    medium: 'Mixed media on paper'
  },
  { 
    id: 3, 
    title: 'project_3', 
    category: 'Design', 
    imageUrl: 'https://images.unsplash.com/photo-1575191833222-f22d176a4f68??q=85&w=600',
    year: '2023',
    medium: 'Digital design'
  },
  { 
    id: 4, 
    title: 'project_4', 
    category: 'Illustration', 
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=85&w=600',
    year: '2023',
    medium: 'Pen and ink'
  },
  { 
    id: 5, 
    title: 'project_5', 
    category: 'Painting', 
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=85&w=600',
    year: '2024',
    medium: 'Watercolor'
  },
  { 
    id: 6, 
    title: 'project_6', 
    category: 'Design', 
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=85&w=600',
    year: '2023',
    medium: 'Typography study'
  },
];