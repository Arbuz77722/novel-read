import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Book from './pages/Book';
import AdvancedSearch from './pages/AdvancedSearch';
import AdvancedSearchResult from './pages/AdvancedSearchResult';
import Chapter from './pages/Chapter';
import About from './pages/About';
import GlobalStyles from './styles/GlobalStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DarkModeProvider } from './context/DarkModeProvider';
import Search from './pages/Search';
import { AdvancedSearchProvider } from './context/AdvancedSearchProvider';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './ui/ProtectedRoutes';
import Review from './pages/Review';
import { Toaster } from 'react-hot-toast';
import ProfileSetting from './features/profile/ProfileSetting';
import LibraryHistory from './features/profile/library/LibraryHistory';
import LibraryUpdates from './features/profile/library/LibraryUpdates';
import LibrarySectionLayout from './ui/LibrarySectionLayout';
import ProfileEdit from './features/profile/ProfileEdit';
import Profile from './pages/Profile';
import ProfileLayout from './ui/ProfileLayout';
import LibraryStatusLayout from './ui/LibraryStatusLayout';
import LibraryBooks from './features/profile/library/LibraryBooks';
import ProfileInbox from './features/profile/ProfileInbox';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <AdvancedSearchProvider>
          <AppLayout />
        </AdvancedSearchProvider>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: 'browse', element: <Browse /> },

        { path: 'books/:slug', element: <Book /> },
        { path: 'books/:slug/chapter/:chapterId', element: <Chapter /> },
        { path: 'books/:slug/reviews', element: <Review /> },

        { path: 'search', element: <Search /> },
        { path: 'search/advanced-search', element: <AdvancedSearch /> },
        {
          path: 'search/advanced-search/results',
          element: <AdvancedSearchResult />,
        },

        { path: 'about', element: <About /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <SignUp /> },

        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: 'profile',
              element: <ProfileLayout />,
              children: [
                { path: 'overview', element: <Profile /> },
                { path: 'edit', element: <ProfileEdit /> },

                {
                  path: 'library',
                  element: <LibrarySectionLayout />,
                  children: [
                    // ---------- LIBRARY ----------
                    {
                      element: <LibraryStatusLayout />,
                      children: [
                        { index: true, element: <LibraryBooks /> },
                        {
                          path: 'reading',
                          element: <LibraryBooks status='reading' />,
                        },
                        {
                          path: 'read-later',
                          element: <LibraryBooks status='read-later' />,
                        },
                        {
                          path: 'completed',
                          element: <LibraryBooks status='completed' />,
                        },
                        {
                          path: 'hold',
                          element: <LibraryBooks status='hold' />,
                        },
                        {
                          path: 'dropped',
                          element: <LibraryBooks status='dropped' />,
                        },
                      ],
                    },

                    {
                      path: 'updates',
                      element: <LibraryStatusLayout />,
                      children: [
                        { index: true, element: <LibraryUpdates /> },
                        {
                          path: 'reading',
                          element: <LibraryUpdates status='reading' />,
                        },
                        {
                          path: 'read-later',
                          element: <LibraryUpdates status='read-later' />,
                        },
                        {
                          path: 'completed',
                          element: <LibraryUpdates status='completed' />,
                        },
                        {
                          path: 'hold',
                          element: <LibraryUpdates status='hold' />,
                        },
                        {
                          path: 'dropped',
                          element: <LibraryUpdates status='dropped' />,
                        },
                      ],
                    },

                    {
                      path: 'history',
                      element: <LibraryHistory />,
                    },
                  ],
                },

                { path: 'inbox', element: <ProfileInbox /> },
                { path: 'settings', element: <ProfileSetting /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster
          position='top-center'
          gutter={12}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
