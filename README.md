## Project Overview

A full-featured book reading and discovery platform, focusing on scalable frontend architecture, secure backend integration, and real-world application patterns.

---

## Features

### 1. Authentication & Profiles
- User signup, login, and logout
- Profile management (username, library, password, settings)
- Protected routes for authenticated users

### 2. Books & Chapters
- Browse books by genre, status, and ranking
- Book detail pages including:
  - Description
  - Tags
  - Table of contents
- Chapter reading experience with navigation
- Track last-read chapter

### 3. Home Page Sections
- Home slider
- New ongoing releases
- Rankings
- Completed books
- Recently added chapters

### 4. Comments & Reviews
- Comment system with nested replies
- Like and dislike comments
- Review system with ratings
- Like and dislike reviews
- Secure vote handling using RLS-backed policies

### 5. Notifications
- Real-time-style notifications for:
  - Comment replies
  - Comment votes
  - Review votes
- Notification inbox and dropdown
- Read and unread state tracking

### 6. Library
- Add and remove books from personal library
- Reading status tracking
- Reading history
- Updates and progress tracking

### 7. Search & Advanced Search
- Global search
- Advanced search with filters
- Dedicated search results pages

### 8. UI & UX
- Dark mode support
- Fully responsive design
- Skeleton loaders and spinners
- Modular and reusable UI components

---

## Tech Stack

### Frontend
- React
- React Router (routing and protected routes)
- @tanstack/react-query (`useQuery`) for server-state management
- Context API for global application state
- Styled Components for component-based styling
- Modular component architecture

### Backend
- Supabase
- Authentication
- PostgreSQL database
- Row Level Security (RLS)
- Database triggers and functions
- Secure policies for:
  - Comments
  - Reviews
  - Votes
  - Notifications
