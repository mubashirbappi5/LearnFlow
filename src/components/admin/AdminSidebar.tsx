'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Careers', href: '/admin/careers' },
  { name: 'Courses', href: '/admin/courses' },
  { name: 'Modules', href: '/admin/modules' },
  { name: 'Lessons', href: '/admin/lessons' },
  { name: 'Resources', href: '/admin/resources' },
  { name: 'Quizzes', href: '/admin/quizzes' },
  { name: 'Assignments', href: '/admin/assignments' },
  { name: 'Users', href: '/admin/users' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/" className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          LearnFlow
        </Link>
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
