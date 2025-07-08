// 📁 components/SocialIcons.tsx
import React from 'react';

export interface SocialLink {
  href: string;
  label: string;
  color: string;
  svg: React.ReactElement;
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://instagram.com/your_profile',
    label: 'Instagram',
    color: '#E4405F',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.148 3.227-1.664 4.771-4.919 4.919c-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.069c-3.255-.148-4.771-1.664-4.919-4.919c-.058-1.265-.069-1.645-.069-4.849s.012-3.584.069-4.849c.148-3.227 1.664-4.771 4.919-4.919c1.265-.058 1.645-.069 4.849-.069z" />
        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998a3.999 3.999 0 0 1 0 7.998z" />
        <circle cx="18.406" cy="5.594" r="1.44" />
      </svg>
    ),
  },
  {
    href: 'https://facebook.com/your_profile',
    label: 'Facebook',
    color: '#3B5998',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953h-1.51c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: 'https://twitter.com/your_profile',
    label: 'Twitter',
    color: '#1DA1F2',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12.86 7v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    href: 'https://t.me/your_profile',
    label: 'Telegram',
    color: '#26A5E4',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.04 15.64l-.38 5.41c.54 0 .78-.23 1.06-.51l2.54-2.41 5.27 3.85c.97.54 1.66.26 1.91-.9l3.45-16.17c.35-1.62-.59-2.25-1.6-1.86L1.7 10.44c-1.6.63-1.57 1.53-.29 1.93l4.96 1.55 11.51-7.28c.54-.36 1.04-.16.63.23" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/your_profile',
    label: 'LinkedIn',
    color: '#0077B5',
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5v-9h3v9zm-1.5-10.5C5.534 8.5 4.75 7.716 4.75 6.75S5.534 5 6.5 5s1.75.784 1.75 1.75S7.466 8.5 6.5 8.5zm12.5 10.5h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.354c.614-.957 1.653-1.604 2.75-1.604 2.208 0 4 1.792 4 4v5.25z" />
      </svg>
    ),
  },
];
