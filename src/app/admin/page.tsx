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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-gray-400">Welcome to the LearnFlow Admin Dashboard. Here you can manage your learning platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="card flex flex-col items-start hover:bg-[#1c1c20] cursor-pointer">
            <span className="text-gray-400 text-sm font-medium mb-1">{stat.name}</span>
            <span className="text-4xl font-bold text-white">{stat.value}</span>
            <span className="mt-4 text-sm text-[#6366f1] hover:underline">Manage {stat.name.toLowerCase()} &rarr;</span>
          </Link>
        ))}
      </div>
      
      <div className="card mt-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/careers/new" className="btn btn-primary">Create Career Path</Link>
          <Link href="/admin/courses/new" className="btn btn-secondary">Create Course</Link>
          <Link href="/admin/quizzes/new" className="btn btn-secondary">Build Quiz</Link>
        </div>
      </div>
    </div>
  );
}
