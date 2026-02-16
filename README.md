A full-featured book reading and discovery platform built as an interview project, focusing on scalable frontend architecture, secure backend integration, and real-world application patterns.

Features

1. Authentication & Profiles
   User signup, login, logout
   Profile management (username,library, password, settings)
   Protected routes

2. Books & Chapters
   Browse books by genre, status, ranking
   Book detail pages with: description, tags, table of contents
   Chapter reading experience with navigation
   Track last-read chapter

3. Home Page Sections
   Home slider
   New ongoing releases
   Rankings
   Completed books
   Recently added chapters

4. Comments & Reviews
   Comment system with replies
   Like / dislike comments
   Review system with ratings
   Like / dislike reviews
   Secure vote handling with RLS-backed policies

5. Notifications
   Real-time-style notifications for:
   comment replies
   comment votes
   review votes
   Notification inbox and dropdown
   Read / unread state

6. Library
   Add/remove books to personal library
   Reading status tracking
   Reading history
   Updates

7. Search & Advanced Search
   Global search
   Advanced search with filters
   Dedicated search result pages

8. UI & UX
   Dark mode support
   Responsive design
   Skeleton loaders & spinners
   Modular, reusable UI components

Tech Stack:

1. Frontend
   React
   React Router – routing & protected routes
   @tanstack/react-query (useQuery) – server state management
   Context API – global app state
   Styled Components – styling
   Modular component architecture

2. Backend
   Supabase
   Authentication
   PostgreSQL database
   Row Level Security (RLS)
   Triggers & functions
   Secure policies for:
   comments
   reviews
   votes
   notifications
