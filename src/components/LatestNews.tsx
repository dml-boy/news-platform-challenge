'use client';

import React from 'react';
import Link from 'next/link';
import { Story, Category } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
    stories: Story[], 
  categories: Category[], 
  hideCategoryFilter?: boolean
}

const LatestNewsCarousel: React.FC<Props> = ({ stories, categories, hideCategoryFilter }) => {
         if (!stories || stories.length === 0) {
  console.log('🛑 LatestNewsCarousel: No stories received');
  return <p className="text-center text-gray-500">No latest news available.</p>;
}

  return (
    <section className="my-6 px-4">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Latest News</h2>

   <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
  }}
  spaceBetween={20}
  breakpoints={{
    320: { slidesPerView: 1 },
    640: { slidesPerView: 1.3 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2.5 },
    1280: { slidesPerView: 3 },
  }}
>
        {stories.map((story) => {
          const cat = categories.find((c) => String(c.id) === String(story.categoryId));
          return (
            <SwiperSlide key={story.storyId}>
              <Link
                href={`/stories/${story.storyId}`}
                className="block group overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
              >
                <div className="relative w-full h-[450px]">
                  <img
                    src={story.image || '/placeholder.jpg'}
                    alt={story.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                    {cat?.name || 'General'}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                    <h3 className="text-white text-lg font-semibold line-clamp-2">
                      {story.headline}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default LatestNewsCarousel;
