import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/root-layout';
import { HomePage } from '@/pages/home';
import { ItemsPage } from '@/pages/items';
import { ProfilePage } from '@/pages/profile';
import { NotFoundPage } from '@/pages/not-found';
import { AuthGuard } from '@/components/auth-guard';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'items', element: <ItemsPage /> },
      {
        path: 'profile',
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
