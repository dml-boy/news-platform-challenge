// 📁 components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { socialLinks } from './SocialIcons';

const useCurrentDate = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  return date;
};

const Navbar: React.FC = () => {
  const date = useCurrentDate();
  const formatted = date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Lagos',
  });

  return (
    <header className="bg-[#d41478] text-white px-4 md:px-8 py-4 flex justify-between items-center flex-wrap">
      <nav className="flex flex-wrap gap-4 items-center">
        {['About Us', 'Contact Us', 'AGC Archive', 'Advert Rate', 'Privacy Policy', 'AGC VIP'].map((link, idx) => (
          <a
            key={idx}
            href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm hover:underline font-medium"
            aria-label={link}
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <span className="text-sm whitespace-nowrap">{formatted}</span>
        <div className="h-6 border-l border-white"></div>
        <div className="flex gap-3">
          {socialLinks.map(({ href, label, svg, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-all duration-200 hover:opacity-80"
              style={{ color }}
            >
              {svg}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
