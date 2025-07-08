'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchTopStories,
  fetchCategories,
  fetchLatestStories,
  fetchEditorPicks,
  fetchCategoryStories,
  fetchFeaturedStories,
} from '@/lib/api';
import { Story, Category } from '@/types';

// Components
import HeadlineSection from '@/components/sections/HeadlineSection';
import FeaturedGrid from '@/components/FeaturedGrid';
import TopStories from '@/components/TopStories';
import LatestNews from '@/components/LatestNews';
import EditorsPick from '@/components/EditorsPick';
import CategorySection from '@/components/sections/CategorySection';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BottomNav from '@/components/BottomNav';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import SearchResults from '@/components/SearchResults';
import Head from 'next/head';
import Link from 'next/link';

const keywords = ['news', 'update', 'report', 'story', 'article', 'headline'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: categories = [],
    isLoading: catLoading,
    error: catError
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 15,
  });

  const politicsCategory = useMemo(() =>
    categories.find(c => c.name === 'Politics'),
    [categories]
  );
  const businessCategory = useMemo(() =>
    categories.find(c => c.name === 'Business'),
    [categories]
  );

  const {
    data: topStories = [],
    isLoading: topLoading,
    error: topError
  } = useQuery<Story[]>({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: latestStories = [],
    isLoading: latestLoading,
    error: latestError
  } = useQuery<Story[]>({
    queryKey: ['latestStories'],
    queryFn: fetchLatestStories,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: editorsPick = [],
    isLoading: editorsLoading,
    error: editorsError
  } = useQuery<Story[]>({
    queryKey: ['editorsPick'],
    queryFn: fetchEditorPicks,
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: featuredStories = [],
    isLoading: featuredLoading
  } = useQuery<Story[]>({
    queryKey: ['featuredStories'],
    queryFn: fetchFeaturedStories,
  });

  const {
    data: politicsStories = [],
    isLoading: politicsLoading
  } = useQuery<Story[]>({
    queryKey: ['politicsStories', politicsCategory?.id],
    queryFn: () =>
      politicsCategory
        ? fetchCategoryStories(politicsCategory.id)
        : Promise.resolve([]),
    enabled: !!politicsCategory,
  });

  const {
    data: businessStories = [],
    isLoading: businessLoading
  } = useQuery<Story[]>({
    queryKey: ['businessStories', businessCategory?.id],
    queryFn: () =>
      businessCategory
        ? fetchCategoryStories(businessCategory.id)
        : Promise.resolve([]),
    enabled: !!businessCategory,
  });

  const isLoading = topLoading || latestLoading || catLoading ||
    editorsLoading || featuredLoading ||
    politicsLoading || businessLoading;
  const error = topError || latestError || catError || editorsError;

  const [topData, featuredData, latestData] = useMemo(() => {
    const top = topStories.slice(0, 3);
    const featured = featuredStories.length > 0
      ? featuredStories.slice(0, 4)
      : topStories.filter(s => !top.some(t => t.storyId === s.storyId)).slice(0, 4);
    const latest = latestStories
      .filter(s =>
        !top.some(t => t.storyId === s.storyId) &&
        !featured.some(f => f.storyId === s.storyId)
      )
      .slice(0, 8);
    return [top, featured, latest];
  }, [topStories, latestStories, featuredStories]);

  const allStories = useMemo(() => [
    ...topStories,
    ...latestStories,
    ...featuredStories,
    ...politicsStories,
    ...businessStories
  ], [topStories, latestStories, featuredStories, politicsStories, businessStories]);

  const headlineSections = useMemo(() => {
    if (featuredStories.length < 2) return [];
    return [
      {
        mainStory: featuredStories[0],
        relatedStories: featuredStories.slice(1, 5)
      },
      {
        mainStory: featuredStories[5],
        relatedStories: featuredStories.slice(6, 10)
      }
    ];
  }, [featuredStories]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner className="h-screen" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <ErrorMessage
          message="Failed to load news data"
          className="h-screen flex items-center justify-center"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Head>
        <title>News Platform | Latest Updates</title>
        <meta name="description" content="Get the latest news updates" />
        <meta name="keywords" content={keywords.join(', ')} />
      </Head>

      <Navbar />
      <Hero />
      <BottomNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchTerm ? (
          <SearchResults searchTerm={searchTerm} stories={allStories} />
        ) : (
          <>
            {/* Top Stories */}
            <TopStories stories={topData} />

            {/* Headline Sections */}
            {headlineSections.map((section, index) => (
              section.mainStory && (
                <HeadlineSection
                  key={`${section.mainStory.storyId || index}`}
                  title={section.mainStory.headline}
                  mainStory={section.mainStory}
                  relatedStories={section.relatedStories || []}
                  category={section.mainStory.categoryId?.toString()}
                />
              )
            ))}

            {/* Featured */}
            <FeaturedGrid stories={featuredData} />

            {/* Latest */}
            <LatestNews stories={latestData} categories={categories} />

            {/* Editor's Picks */}
            {editorsPick.length > 0 && (
              <EditorsPick stories={editorsPick} />
            )}

            {/* Category: Politics */}
            {politicsCategory && (
              <CategorySection
                title="Politics"
                stories={politicsStories}
                categoryId={politicsCategory.id}
              />
            )}

            {/* Category: Business */}
            {businessCategory && (
              <CategorySection
                title="Business"
                stories={businessStories}
                categoryId={businessCategory.id}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
