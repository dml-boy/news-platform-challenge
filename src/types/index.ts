export interface Category {
  id: string;
  name: string;
  total_stories?: number;
  created_at?: string;
  updated_at?: string;
}



// types/index.d.ts
export interface Story {
  id: string;
  storyId: string;
  headline: string;
  description: string;
  content: string;
  image: string;
  categoryId: number;
  author?: string;
  postedTime?: string;
  isFeatured?: boolean;
  slug?: string;
}
