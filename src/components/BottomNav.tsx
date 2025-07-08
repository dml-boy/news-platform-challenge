'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { fetchCategories } from '@/lib/api';
import { FiSearch } from 'react-icons/fi';

interface Category {
  id: number;
  name: string;
  total_stories: number;
  created_at: string;
  updated_at: string;
}

interface BottomNavProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNav: React.FC<BottomNavProps> = ({ searchTerm, setSearchTerm }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats.map((cat: any) => ({ ...cat, id: Number(cat.id) })));
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <nav className="bg-black text-white px-6 md:px-12 py-5 text-base font-semibold w-full border-t border-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* Logo + Category Links */}
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/">
            <img src="/AGC_logo.png" alt="AGC NewsNet Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-red-600 border-b-2 border-red-600 pb-1">Home</Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-red-500 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Media Links + Auth + Search */}
        <div className="flex items-center gap-4 relative">
          {['Photos', 'Videos', 'Audio'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-red-500">
              {item}
            </Link>
          ))}
          <Link href="/login" className="hover:underline">Log in</Link>
          <span>/</span>
          <Link href="/signup" className="hover:underline">Sign up</Link>

          {/* Search Icon + Inline Expandable Input */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="text-white hover:text-red-500 transition"
              aria-label="Toggle Search"
            >
              <FiSearch size={20} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className={`
                transition-all duration-300 ease-in-out
                bg-transparent border border-gray-500 px-2 py-1 rounded-md text-white placeholder-gray-400
                ${showSearch ? 'w-40 opacity-100' : 'w-0 opacity-0'}
              `}
              style={{ overflow: 'hidden' }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
