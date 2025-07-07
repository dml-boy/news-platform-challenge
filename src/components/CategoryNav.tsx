// src/components/CategoryNav.tsx
'use client';

'use client';

import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[] | undefined;
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
}

export default function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400 py-4">No categories available</div>;
  }

  return (
    <nav className="flex overflow-x-auto space-x-4 py-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
}