export interface Category {
  id: string;
  name: string;
  total_stories?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EditorsPickData {
  main: Story;
  more: string[];
}


export interface Story {
  id: string;           // Previously "storyId"
  storyId: string;        // Previously "id"
  headline: string;       // Previously "title"
  description: string;
  content: string;
  image: string;
  categoryId: number;   // Optional, if not always present
  
}
