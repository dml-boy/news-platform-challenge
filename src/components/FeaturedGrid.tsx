// components/FeaturedGrid.tsx
'use client';

import React from 'react';
import { Story } from '@/types';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  stories: Story[];
}

const FeaturedGrid: React.FC<Props> = ({ stories }) => {
  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        Featured Stories
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="swiper-container"
      >
        {stories.slice(0, 5).map((story, index) => (
          <SwiperSlide key={story.storyId}>
            <Link href={`/stories/${story.storyId}`} aria-label={`Read more about ${story.headline}`}>
              <article className="relative rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={story.image || '/placeholder.jpg'}
                  alt={story.headline || 'Untitled Story'}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <div
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      index === 0 ? 'text-purple-400' : 'text-red-500'
                    }`}
                  >
                    {index === 0 ? 'LATEST TODAY' : 'NEWS TODAY'}
                  </div>
                  <h3 className="text-xl font-semibold mt-2 line-clamp-2">{story.headline}</h3>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedGrid;