import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [
    usersCount,
    careersCount,
    coursesCount,
    modulesCount,
    lessonsCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.careerPath.count(),
    prisma.course.count(),
    prisma.module.count(),
    prisma.lesson.count(),
  ]);

  const stats = [
    { name: 'Total Users', value: usersCount, href: '/admin/users' },
    { name: 'Career Paths', value: careersCount, href: '/admin/careers' },
    { name: 'Courses', value: coursesCount, href: '/admin/courses' },
    { name: 'Modules', value: modulesCount, href: '/admin/modules' },
    { name: 'Lessons', value: lessonsCount, href: '/admin/lessons' },
  ];

  return (
    <div>
      <div>
        <h1>Overview</h1>
        <p>Welcome to the LearnFlow Admin Dashboard. Here you can manage your learning platform.</p>
      </div>

      <div className="dashboard-grid">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="card">
            <span className="card-title">{stat.name}</span>
            <span className="card-value">{stat.value}</span>
            <span className="card-link">Manage {stat.name.toLowerCase()} &rarr;</span>
          </Link>
        ))}
      </div>
      
      <div className="card quick-actions-card">
        <h3>Quick Actions</h3>
        <div className="btn-group">
          <Link href="/admin/careers/new" className="btn btn-primary">Create Career Path</Link>
          <Link href="/admin/courses/new" className="btn btn-secondary">Create Course</Link>
          <Link href="/admin/quizzes/new" className="btn btn-secondary">Build Quiz</Link>
        </div>
      </div>
    </div>
  );
}
