'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchTopStories,
  fetchCategories,
  fetchLatestStories,
  fetchEditorPicks, // ✅ import
} from '@/lib/api';

import FeaturedGrid from '@/components/FeaturedGrid';
import TopStories from '@/components/TopStories';
import LatestNews from '@/components/LatestNews';
import EditorsPick from '@/components/EditorsPick'; // ✅ import the component

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BottomNav from '@/components/BottomNav';
import Head from 'next/head';
import { Story, Category, EditorsPickData } from '@/types'; // ✅ import type

const keywords = ['news', 'update', 'report', 'story', 'article', 'headline'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: topStories = [],
    isLoading: topLoading,
    error: topError,
  } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const {
    data: latestStories = [],
    isLoading: latestLoading,
    error: latestError,
  } = useQuery({
    queryKey: ['latestStories'],
    queryFn: fetchLatestStories,
  });

  const {
    data: categories = [],
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const {
    data: editorsPick,
    isLoading: editorsLoading,
    error: editorsError,
  } = useQuery<EditorsPickData>({
    queryKey: ['editorsPick'],
    queryFn: fetchEditorPicks,
  });

  const filteredTop = useMemo(() => {
    return searchTerm
      ? topStories.filter(
          (story) =>
            story.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            keywords.some((keyword) =>
              story.headline.toLowerCase().includes(keyword.toLowerCase()) ||
              story.description.toLowerCase().includes(keyword.toLowerCase())
            )
        )
      : topStories;
  }, [topStories, searchTerm]);

  const topData = filteredTop.slice(0, 3);
  const featuredData = filteredTop
    .filter((s) => !topData.some((t) => t.storyId === s.storyId))
    .slice(0, 4);

  const latestData = useMemo(() => {
    return latestStories
      .filter(
        (s) =>
          !topData.some((t) => t.storyId === s.storyId) &&
          !featuredData.some((f) => f.storyId === s.storyId)
      )
      .slice(0, 8);
  }, [latestStories, topData, featuredData]);

  useEffect(() => {
    console.log('🧪 Debug:', {
      top: topData,
      featured: featuredData,
      latest: latestData,
    });
  }, [topData, featuredData, latestData]);

  if (topLoading || latestLoading || catLoading || editorsLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (topError || latestError || catError || editorsError) {
    return <p className="text-center text-red-600">Error loading data.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-white">
      <Head>
        <meta name="keywords" content={keywords.join(', ')} />
        <title>News Platform</title>
      </Head>

      <Navbar />
      <Hero />
      <BottomNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-7xl mx-auto">
        {/* ✅ Inject Editor's Pick */}
    


        <TopStories stories={topData} />
        <FeaturedGrid stories={featuredData} />
        <LatestNews stories={latestData} categories={categories} />
          {editorsPick && <EditorsPick data={editorsPick} />}
      </main>
    </div>
  );
}
