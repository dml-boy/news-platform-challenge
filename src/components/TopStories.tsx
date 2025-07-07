import Image from 'next/image';

type Story = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
};

type Props = {
  stories: Story[];
};

export default function TopStories({ stories }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Top Stories</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {stories.map((story, index) => (
          <article key={story.id} className={`${index === 0 ? 'md:col-span-2' : ''} rounded overflow-hidden shadow`}>
            <Image
              src={story.imageUrl}
              alt={story.title}
              width={800}
              height={450}
              className="object-cover w-full h-48 md:h-64"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{story.title}</h3>
              <p className="text-gray-700 mt-2">{story.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
