// src/lib/api.ts
import { Category, Story } from '../types'// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
;

// Enhanced normalize function with author and timestamp support
function normalizeStoryItem(item: any): Story {
  const s = item.story ?? item;
  return {
    id: s.id || s.storyId || `${s.slug}-${Date.now()}`,
    storyId: s.storyId || s.id || `${s.slug}-${Date.now()}`,
    headline: s.title || s.headline || 'Untitled Story',
    description: s.description || s.summary || 'No description available',
    content: s.content || 'No content available',
    image: s.banner_image || s.image || s.featured_image || '/placeholder.jpg',
    categoryId: Number(s.category_id || s.categoryId || 0),
    author: s.author?.name || s.author_name || s.byline || s.user?.name || 'Staff Reporter',
    postedTime: formatPostedTime(s.published_at || s.created_at || s.post_date),
    isFeatured: Boolean(s.is_featured || s.featured),
    slug: s.slug || generateSlug(s.headline || s.title),
    // Add any additional fields your UI needs
  };
}

// Helper function to format timestamp
function formatPostedTime(timestamp?: string): string {
  if (!timestamp) return 'recently';
  
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'just now';
  if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
}

// Helper function to generate slug from headline
function generateSlug(headline: string): string {
  return headline
    ?.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50) || '';
}

// Updated fetch functions with better error handling
async function fetchWithAuth(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        // Add any required auth headers here
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Check for HTML responses (like 404 pages)
    const contentType = res.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error('Received non-JSON response');
    }

    return await res.json();
  } catch (err) {
    console.error(`Request failed for ${url}:`, err);
    throw err;
  }
}

// Categories - unchanged
export async function fetchCategories(): Promise<Category[]> {
  try {
    const json = await fetchWithAuth('https://api.agcnewsnet.com/api/general/categories');
    const rawItems = json?.data?.data ?? [];
    return rawItems.map((item: any) => ({
      id: item.category_id,
      name: item.category_name,
      total_stories: item.total_stories,
      created_at: item.created_at,
      updated_at: item.updated_at,
      slug: item.slug || generateSlug(item.category_name),
    }));
  } catch (err) {
    console.error('fetchCategories failed:', err);
    return [];
  }
}

// Enhanced story fetching functions
export async function fetchStories(endpoint: string, fallback?: () => Promise<Story[]>): Promise<Story[]> {
  try {
    const json = await fetchWithAuth(`https://api.agcnewsnet.com/api/general/${endpoint}`);
    const items = json?.data?.data ?? json?.data ?? [];
    
    if (items.length === 0 && fallback) {
      console.warn(`No stories found at ${endpoint}, using fallback`);
      return await fallback();
    }
    
    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error(`fetchStories(${endpoint}) failed:`, err);
    return fallback ? await fallback() : [];
  }
}

// Updated specific story functions using the generic fetchStories
export const fetchTopStories = () => fetchStories('top-stories');
export const fetchEditorPicks = () => fetchStories('editor-picks?page=1&per_page=10');
export const fetchFeaturedStories = () => fetchStories('stories/featured-stories?page=1&per_page=15', fetchTopStories);
export const fetchLatestStories = () => fetchStories('stories/latest-stories?page=1&per_page=7');
export const fetchMissedStories = () => fetchStories('stories/missed-stories?page=1&per_page=5');
export const fetchCategoryStories = (categoryId: number | string) => 
  fetchStories(`categories/${categoryId}/stories?page=1&per_page=15`);

// Enhanced single story fetch
export async function fetchSingleStory(storyId: string): Promise<Story> {
  try {
    const json = await fetchWithAuth(`https://api.agcnewsnet.com/api/general/stories/${storyId}`);
    const storyData = json?.data?.story ?? json?.data;
    
    if (!storyData) {
      throw new Error('Story data not found in response');
    }
    
    return normalizeStoryItem(storyData);
  } catch (err) {
    console.error('fetchSingleStory failed:', err);
    throw new Error('Failed to fetch story: ' + (err instanceof Error ? err.message : String(err)));
  }
}

// Add any additional API functions you need
export async function fetchAuthorStories(authorId: string): Promise<Story[]> {
  return fetchStories(`authors/${authorId}/stories`);
}