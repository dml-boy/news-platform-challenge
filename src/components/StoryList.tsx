// src/components/StoryList.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import  {fetchLatestStories}  from '@/lib/api';
import { Category, Story } from '../types';
import  StoryCard  from './StoryCard';
import  SkeletonLoader  from './SkeletonLoader';

interface StoryListProps {
  section: string;
  queryKey: string[];
  endpoint: string;
  searchQuery: string;
}

export const StoryList: React.FC<StoryListProps> = ({ section, queryKey, endpoint, searchQuery }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery<Story[]>({
    queryKey: [...queryKey, page],
    queryFn: fetchLatestStories,
  });

  console.log(`StoryList data for ${section}:`, data); // Debug log

  const filteredData = Array.isArray(data)
    ? data.filter((story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isLoading) return <SkeletonLoader type="story" />;
  if (error) return <p className="text-red-500">Error loading {section.toLowerCase()}: {(error as Error).message}</p>;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{section}</h2>
      {filteredData.length === 0 ? (
        <p className="text-gray-500">
          {searchQuery ? `No stories found for "${searchQuery}"` : `No ${section.toLowerCase()} available`}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={filteredData.length < 15}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};
