import React from 'react';
import { prisma } from '@/lib/prisma';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      enrollments: true,
      certificates: true,
    }
  });

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Registered Users</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Manage all registered students and see their learning statistics.</p>
      </div>

      <div className="card glass-panel" style={{ padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Name</th>
                <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Email</th>
                <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Role</th>
                <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Enrolled Courses</th>
                <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Certificates</th>
                <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', fontWeight: 500, color: 'white' }}>
                    {user.name || 'N/A'}
                  </td>
                  <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      backgroundColor: user.role === 'ADMIN' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                      color: user.role === 'ADMIN' ? '#fbbf24' : '#818cf8',
                      border: `1px solid ${user.role === 'ADMIN' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>
                    {user.enrollments.length}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {user.certificates.length > 0 ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontWeight: 600, fontSize: '0.875rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                        {user.certificates.length}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>0</span>
                    )}
                  </td>
                  <td style={{ padding: '16px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
