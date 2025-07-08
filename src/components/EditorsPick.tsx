'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchEditorPicks } from '@/lib/api';
import { EditorsPickData } from '@/types';
                  interface Props {
                  data: EditorsPickData;
                  }

const EditorsPick: React.FC<Props> = ({ data: initialData }) => {
  const { main: mainStory, more: moreStories } = initialData;
  const { data, isLoading, error } = useQuery<EditorsPickData>({
    queryKey: ['editorsPick'],
    queryFn: fetchEditorPicks,
  });

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading Editor's Pick...</p>;
  }

  if (error || !data) {
    return <p className="text-center text-red-600">Failed to load Editor's Pick.</p>;
  }

  

  return (
    <section className="flex flex-col lg:flex-row gap-6 p-4 bg-white border border-blue-300 animate-fade-in-up">
      {/* Main Story */}
      <div className="w-full lg:w-2/3">
        <div className="relative">
          <Image
            src={mainStory.image || '/placeholder.jpg'}
            alt={mainStory.headline}
            width={800}
            height={500}
            className="w-full h-64 object-cover"
          />
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
            Editor's Pick
          </span>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900">{mainStory.headline}</h2>
          {/* <p className="text-gray-600 mt-1 text-sm">{mainStory.subtext}</p> */}
          {/* <p className="text-gray-500 text-xs mt-2">@{mainStory.author}</p> */}
        </div>
      </div>

      {/* More Stories Sidebar */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">MORE STORIES</h3>
        <ul className="space-y-2">
          {moreStories.map((story, index) => (
            <li key={index} className="text-gray-700 text-sm list-disc list-inside">
              {story}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EditorsPick;
