'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategory, setCategory } from '../lib/redux/slices/categorySlice';
import {
  fetchCategories,
  fetchTopStories,
  fetchEditorPicks,
  fetchFeaturedStories,
  fetchCategoryStories,
} from '../lib/api';
import Navbar from '@/components/Navbar';
import CategoryNav from '../components/CategoryNav';
import StoryCard from '../components/StoryCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { Story } from '../types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const selectedCategory = useSelector(selectCategory);
  const dispatch = useDispatch();

  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: topStories = [], isLoading: topStoriesLoading, error: topStoriesError } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const { data: editorPicks = [], isLoading: editorPicksLoading, error: editorPicksError } = useQuery({
    queryKey: ['editorPicks'],
    queryFn: fetchEditorPicks,
  });

  const { data: featuredStories = [], isLoading: featuredStoriesLoading, error: featuredStoriesError } = useQuery({
    queryKey: ['featuredStories'],
    queryFn: fetchFeaturedStories,
  });

  const { data: categoryStories = [], isLoading: categoryStoriesLoading, error: categoryStoriesError } = useQuery({
    queryKey: ['categoryStories', selectedCategory],
    queryFn: () => selectedCategory ? fetchCategoryStories(selectedCategory) : Promise.resolve([]),
    enabled: !!selectedCategory,
  });

  const filteredStories = (stories: Story[]): Story[] => {
    if (!Array.isArray(stories)) return [];
    return stories.filter((story) =>
      (story.headline )?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    console.log('Top Stories:', topStories);
  }, [topStories]);

  const renderStorySection = (title: string, stories: Story[], loading: boolean, error: any) => (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : error ? (
        <div className="text-red-500 text-center">Error loading {title.toLowerCase()}: {error.message}</div>
      ) : filteredStories(stories).length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center">No {title.toLowerCase()} available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories(stories).map((story) => (
            <StoryCard key={story.storyId} story={story} />
          ))}
        </div>
      )}
    </section>
  );

  return (
   
    <div className="">
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {categoriesLoading ? (
        <SkeletonLoader type="category" />
      ) : categoriesError ? (
        <div className="text-red-500 text-center">Error loading categories: {categoriesError.message}</div>
      ) : categories.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center py-4">No categories available</div>
      ) : (
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => dispatch(setCategory(id))}
        />
      )}

      {selectedCategory && (
        <section className="my-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Category Stories</h2>
          {categoryStoriesLoading ? (
            <SkeletonLoader type="card" count={3} />
          ) : categoryStoriesError ? (
            <div className="text-red-500 text-center">Error loading category stories: {categoryStoriesError.message}</div>
          ) : filteredStories(categoryStories).length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-center">No stories available for this category</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories(categoryStories).map((story) => (
                <StoryCard key={story.storyId} story={story} />
              ))}
            </div>
          )}
        </section>
      )}

      {renderStorySection('Top Stories', topStories, topStoriesLoading, topStoriesError)}
      {renderStorySection("Editor's Picks", editorPicks, editorPicksLoading, editorPicksError)}
      {renderStorySection('Featured Stories', featuredStories, featuredStoriesLoading, featuredStoriesError)}
    </div>
  );
}