// src/components/SkeletonLoader.tsx
'use client';
interface SkeletonLoaderProps {
  type: 'category' | 'card' | 'story';
  count?: number;
}

export default function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  if (type === 'category') {
    return (
      <div className="flex space-x-4 py-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ))}
      </div>
    );
  }

  if (type === 'story') {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
        <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
    </div>
  );
}