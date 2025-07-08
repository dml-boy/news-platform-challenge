// components/SearchResults.tsx
import React, { useMemo } from 'react';
import { Story } from '@/types';
import StoryCard from '@/components/StoryCard';

interface SearchResultsProps {
  searchTerm: string;
  stories: Story[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, stories }) => {
  const filteredStories = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return stories.filter(story => 
      story.headline.toLowerCase().includes(term) ||
      story.description.toLowerCase().includes(term)
    );
  }, [searchTerm, stories]);

  if (filteredStories.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No results found for "{searchTerm}"</h3>
        <p className="text-gray-600 mt-2">Try different keywords</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{searchTerm}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => (
          <StoryCard key={story.storyId} story={story} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;