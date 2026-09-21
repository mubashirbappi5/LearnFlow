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
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
          <div>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Logged in as {session.user.name}
            </span>
          </div>
        </header>
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
