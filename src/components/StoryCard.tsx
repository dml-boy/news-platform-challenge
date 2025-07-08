// components/StoryCard.tsx
import { Story } from '@/types';
import Link from 'next/link';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Link href={`/stories/${story.storyId}`}>
      <article className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-48 relative">
          <img 
            src={story.image || '/placeholder.jpg'} 
            alt={story.headline}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{story.headline}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{story.description}</p>
        </div>
      </article>
    </Link>
  );
};

export default StoryCard;