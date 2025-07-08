'use client';

import React from 'react';
import Image from 'next/image';
import { Story } from '@/types';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  stories: Story[];
}

export default function TopStories({ stories }: Props) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Top Stories</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop
        className="w-full"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.storyId}>
            <div className="mx-auto w-full max-w-screen-2xl px-4">
              <Link href={`/stories/${story.storyId}`}>
                <article className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.headline}
                    width={1920}
                    height={400}
                    className="w-full h-[300px] md:h-[350px] object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.headline}</h3>
                    <p className="text-gray-700 text-base leading-relaxed line-clamp-3">{story.description}</p>
                  </div>
                </article>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
