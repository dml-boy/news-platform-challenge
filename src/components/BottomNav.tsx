'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { fetchCategories } from '@/lib/api';
import { Category } from '@/types';

interface BottomNavProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNav: React.FC<BottomNavProps> = ({ searchTerm, setSearchTerm }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Memoized category loading
  const loadCategories = useCallback(async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Focus search input when shown
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format category URL
  const formatCategoryUrl = (name: string) => {
    return `/category/${name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <nav 
      ref={navRef}
      className="bg-black text-white px-4 sm:px-6 lg:px-12 py-4 text-base font-semibold w-full border-t border-gray-800"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo + Category Links */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link href="/" className="shrink-0">
            <img 
              src="/AGC_logo.png" 
              alt="AGC NewsNet Logo" 
              className="h-8 md:h-10 w-auto object-contain"
              width={120}
              height={40}
            />
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link 
              href="/" 
              className="text-red-600 border-b-2 border-red-600 pb-1 hover:text-red-500 transition-colors"
            >
              Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={formatCategoryUrl(cat.name)}
                className="hover:text-red-500 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Media Links + Auth + Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {['Photos', 'Videos', 'Audio'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="hover:text-red-500 transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/login" className="hover:underline">Log in</Link>
              <span>/</span>
              <Link href="/signup" className="hover:underline">Sign up</Link>
            </div>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(prev => !prev)}
                className="text-white hover:text-red-500 transition p-1"
                aria-label={showSearch ? "Close search" : "Open search"}
              >
                <FiSearch size={20} />
              </button>
              <div className={`absolute right-0 top-full mt-2 ${showSearch ? 'block' : 'hidden'}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news..."
                  className="w-48 md:w-64 bg-gray-900 border border-gray-700 px-3 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;