// components/HeadlineSection.tsx
import { Story } from '@/types';

interface HeadlineSectionProps {
  title: string;
  mainStory: Story;
  relatedStories: Story[];
  category?: string;
}

export default function HeadlineSection({
  title,
  mainStory,
  relatedStories,
  category
}: HeadlineSectionProps) {
  return (
    <section className="mb-10 border-b border-gray-200 pb-8">
      {/* Category label */}
      {category && (
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded mb-3">
          {category}
        </span>
      )}
      
      {/* Main headline */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
      
      {/* Author and timestamp */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>By {mainStory.author || 'Staff Reporter'}</span>
        <span className="mx-2">•</span>
        <span>Posted {mainStory.postedTime || 'recently'}</span>
      </div>
      
      {/* Main story content */}
      <div className="prose max-w-none mb-6">
        <p className="text-gray-700">{mainStory.description}</p>
      </div>
      
      {/* Related stories list */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">More Stories</h3>
        <ul className="space-y-3">
          {relatedStories.map((story) => (
            <li key={story.storyId} className="border-b border-gray-100 pb-3">
              <a 
                href={`/stories/${story.storyId}`} 
                className="hover:text-red-600 transition-colors"
              >
                <h4 className="font-medium">{story.headline}</h4>
              </a>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span>By {story.author || 'Staff Reporter'}</span>
                <span className="mx-2">•</span>
                <span>Posted {story.postedTime || 'recently'}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}