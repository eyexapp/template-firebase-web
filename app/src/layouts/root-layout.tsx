import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
