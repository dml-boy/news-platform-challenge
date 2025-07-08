// // src/components/SearchBar.tsx


// 'use client';

// import { Dispatch, SetStateAction } from 'react';

// interface SearchBarProps {
//   searchTerm: string;
//   setSearchTerm: Dispatch<SetStateAction<string>>;
// }

// export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
//   return (
//     <div className="my-4">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         ="Search stories by title..."
//         className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//       />
//     </div>
//   );
// }