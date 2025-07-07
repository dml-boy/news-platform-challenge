News Platform
A simplified news platform built with Next.js, TypeScript, Tailwind CSS, React Query, and Redux Toolkit.
Features

Landing Page: Displays top stories, editor’s picks, featured stories, and a horizontal scrollable category navigation.
Story Page: Dynamic route (/stories/[id]) to show full story details.
Bookmark Feature: Bookmark stories with Redux Toolkit, persisted in localStorage.
Search Functionality: Client-side search filtering stories by title.
Responsive Design: Mobile and desktop-friendly with Tailwind CSS.
Bonus: Loading states, error handling, and skeleton loaders for better UX.

Tech Stack

Next.js (App Router)
TypeScript
Tailwind CSS
React Query (for API fetching)
Redux Toolkit (for global state management)

Setup Instructions

Clone the repository:
git clone <your-repo-link>
cd news-platform


Install dependencies:
npm install


Run the development server:
npm run dev

Open http://localhost:3000 in your browser.

Build for production:
npm run build
npm start



Deployment
The app is deployed on Vercel: Live Demo Link (replace with actual Vercel/Netlify link).
Folder Structure
├── app
│   ├── stories/[id]
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
├── components
│   ├── CategoryNav.tsx
│   ├── StoryCard.tsx
│   ├── SearchBar.tsx
│   ├── SkeletonLoader.tsx
├── lib
│   ├── api.ts
│   ├── redux
│   │   ├── store.ts
│   │   ├── slices
│   │   │   ├── bookmarkSlice.ts
│   │   │   ├── categorySlice.ts
├── types
│   ├── index.ts
├── styles
│   ├── globals.css
├── public

API Endpoints

Categories: https://api.agcnewsnet.com/api/general/categories
Top Stories: https://api.agcnewsnet.com/api/general/top-stories
Editor's Picks: https://api.agcnewsnet.com/api/general/editor picks?page=1&per_page=15
Featured Stories: https://api.agcnewsnet.com/api/general/stories/featured stories?page=1&per_page=15
Latest Stories: https://api.agcnewsnet.com/api/general/stories/latest stories?page=1&per_page=7
Missed Stories: https://api.agcnewsnet.com/api/general/stories/missed stories?page=1&per_page=5
Category Stories: https://api.agcnewsnet.com/api/general/categories/{categoryId}/stories?page=1&per_page=15
Single Story: https://api.agcnewsnet.com/api/general/stories/{storyId}

Notes

Bookmarks are stored in Redux and persisted in localStorage.
React Query handles data fetching with caching and loading/error states.
The search bar filters stories client-side based on title.
Skeleton loaders are implemented for better UX during data fetching.
The app is fully responsive using Tailwind CSS.
