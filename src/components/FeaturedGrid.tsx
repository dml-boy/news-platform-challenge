// components/FeaturedGrid.tsx
'use client';

import React from 'react';
import { Story } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  stories: Story[];
  title?: string;
  className?: string;
}

const FeaturedGrid: React.FC<Props> = ({ 
  stories, 
  title = "Featured Stories",
  className = ""
}) => {
  if (!stories || stories.length === 0) return null;

  return (
    <section className={`mb-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        {title}
      </h2>
      
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-100',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-600'
          }}
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="!pb-10" // Add padding for pagination
        >
          {stories.slice(0, 5).map((story, index) => (
            <SwiperSlide key={story.storyId}>
              <Link 
                href={`/stories/${story.storyId}`} 
                className="block h-full"
                aria-label={`Read more about ${story.headline}`}
              >
                <article className="relative h-full rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9 w-full h-64">
                    <Image
                      src={story.image || '/placeholder.jpg'}
                      alt={story.headline || 'Untitled Story'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3} // Only prioritize first 3 images
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                      index === 0 ? 'text-purple-400' : 'text-red-400'
                    }`}>
                      {index === 0 ? 'LATEST TODAY' : 'NEWS TODAY'}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white line-clamp-2">
                      {story.headline}
                    </h3>
                    {story.description && (
                      <p className="text-gray-300 text-sm mt-1 line-clamp-2 hidden sm:block">
                        {story.description}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedGrid;