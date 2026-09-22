import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

export default async function AdminDashboard() {
  const [
    usersCount,
    careersCount,
    coursesCount,
    modulesCount,
    lessonsCount,
    recentEnrollments,
    recentUsersRaw,
    recentEnrollmentsRaw
  ] = await Promise.all([
    prisma.user.count(),
    prisma.careerPath.count(),
    prisma.course.count(),
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.enrollment.findMany({
      take: 10,
      orderBy: { enrolledAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } }
      }
    }),
    prisma.user.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      select: { createdAt: true }
    }),
    prisma.enrollment.findMany({
      where: { enrolledAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      select: { enrolledAt: true }
    })
  ]);

  // Compute last 7 days data for chart
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0,0,0,0);
    const nextD = new Date(d);
    nextD.setDate(nextD.getDate() + 1);

    const usersOnDay = recentUsersRaw.filter(u => u.createdAt >= d && u.createdAt < nextD).length;
    const enrollmentsOnDay = recentEnrollmentsRaw.filter(e => e.enrolledAt >= d && e.enrolledAt < nextD).length;

    chartData.push({
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      users: usersOnDay,
      enrollments: enrollmentsOnDay
    });
  }

  const stats = [
    { name: 'Total Users', value: usersCount, href: '/admin/users' },
    { name: 'Career Paths', value: careersCount, href: '/admin/careers' },
    { name: 'Courses', value: coursesCount, href: '/admin/courses' },
    { name: 'Modules', value: modulesCount, href: '/admin/modules' },
    { name: 'Lessons', value: lessonsCount, href: '/admin/lessons' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Welcome to the LearnFlow Admin Dashboard. Overview of platform metrics.</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <AnalyticsChart data={chartData} />
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '40px' }}>
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="card hover-lift" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px' }}>
            <span className="card-title" style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>{stat.name}</span>
            <span className="card-value" style={{ color: 'white', fontSize: '2.5rem', fontWeight: 700, display: 'block', marginBottom: '16px' }}>{stat.value}</span>
            <span className="card-link" style={{ color: 'var(--color-brand-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Manage {stat.name.toLowerCase()} &rarr;</span>
          </Link>
        ))}
      </div>
      
      <div className="card glass-panel" style={{ padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Enrollments</h3>
          <Link href="/admin/users" style={{ color: 'var(--color-brand-primary)', fontSize: '0.875rem', textDecoration: 'none' }}>View All Users &rarr;</Link>
        </div>
        
        {recentEnrollments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
            No recent enrollments found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Student</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Course</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Progress</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 500, color: 'white' }}>{enrollment.user.name || 'Unknown User'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{enrollment.user.email}</div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{enrollment.course.title}</td>
                    <td style={{ padding: '16px', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: `${enrollment.progressPercentage}%`, height: '100%', backgroundColor: 'var(--color-brand-primary)' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{Math.round(enrollment.progressPercentage)}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '999px', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        backgroundColor: enrollment.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: enrollment.status === 'COMPLETED' ? '#34d399' : '#818cf8',
                        border: `1px solid ${enrollment.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`
                      }}>
                        {enrollment.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
