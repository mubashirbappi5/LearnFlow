import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-[#0a0a0b] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
        <header className="h-16 border-b border-[#27272a] bg-[#121214] flex items-center px-6 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-400">Logged in as {session.user.name}</span>
          </div>
        </header>
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
