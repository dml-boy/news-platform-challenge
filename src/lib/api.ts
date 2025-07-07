// 📄 api.ts
import { Category, Story } from '../types';

// Utility to normalize story object
function normalizeStoryItem(item: any): Story {
  const s = item.story ?? item;
  return {
    storyId: s.id,
    headline: s.title,
    description: s.description,
    content: s.content,
    image: s.banner_image,
  };
}


// ✅ Categories
// ✅ Update this function
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://api.agcnewsnet.com/api/general/categories');
    const json = await res.json();
    const rawItems = json?.data?.data ?? [];

    return rawItems.map((item: any) => ({
      id: item.category_id,
      name: item.category_name,
      total_stories: item.total_stories,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (err) {
    console.error('fetchCategories failed:', err);
    return [];
  }
}



// ✅ Top Stories
export async function fetchTopStories(): Promise<Story[]> {
  try {
    const res = await fetch('https://api.agcnewsnet.com/api/general/top-stories');
    const json = await res.json();
    const items = json?.data?.data ?? [];
    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error('fetchTopStories failed:', err);
    return [];
  }
}

// ✅ Editor Picks
export async function fetchEditorPicks(): Promise<Story[]> {
  try {
    const res = await fetch('https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=15');
    const json = await res.json();
    const items = json?.data?.data ?? [];
    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error('fetchEditorPicks failed:', err);
    return [];
  }
}

// ✅ Featured Stories
export async function fetchFeaturedStories(): Promise<Story[]> {
  try {
    const res = await fetch('https://api.agcnewsnet.com/api/general/stories/featured-stories?page=1&per_page=15');
    const json = await res.json();
    const items = json?.data?.data ?? [];

    if (items.length === 0) {
      console.warn('⚠️ No featured stories found. Falling back to top stories.');
      return await fetchTopStories(); // fallback
    }

    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error('fetchFeaturedStories failed:', err);
    return [];
  }
}


// ✅ Latest Stories
export async function fetchLatestStories(): Promise<Story[]> {
  try {
    const res = await fetch('https://api.agcnewsnet.com/api/general/stories/latest-stories?page=1&per_page=7');
    const json = await res.json();
    const items = json?.data?.data ?? [];
    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error('fetchLatestStories failed:', err);
    return [];
  }
}

// ✅ Missed Stories
export async function fetchMissedStories(): Promise<Story[]> {
  try {
    const res = await fetch('https://api.agcnewsnet.com/api/general/stories/missed-stories?page=1&per_page=5');
    const json = await res.json();
    const items = json?.data?.data ?? [];
    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error('fetchMissedStories failed:', err);
    return [];
  }
}

// ✅ Category Stories
export async function fetchCategoryStories(categoryId: string): Promise<Story[]> {
  try {
    const res = await fetch(`https://api.agcnewsnet.com/api/general/categories/${categoryId}/stories?page=1&per_page=15`);
    const json = await res.json();
    const items = json?.data?.data ?? [];
    return items.map(normalizeStoryItem);
  } catch (err) {
    console.error('fetchCategoryStories failed:', err);
    return [];
  }
}

// ✅ Single Story
export async function fetchSingleStory(storyId: string): Promise<Story> {
  try {
    const res = await fetch(`https://api.agcnewsnet.com/api/general/stories/${storyId}`);
    const json = await res.json();
    const s = json?.data?.story ?? json?.data;
    return normalizeStoryItem({ story: s });
  } catch (err) {
    console.error('fetchSingleStory failed:', err);
    throw new Error('Failed to fetch story');
  }
}
