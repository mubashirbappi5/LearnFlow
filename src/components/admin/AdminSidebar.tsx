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
    <aside className="w-64 bg-[#121214] border-r border-[#27272a] h-full flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-[#27272a]">
        <Link href="/" className="text-xl font-bold text-white text-gradient">
          LearnFlow
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-[#6366f1] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#27272a]'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#27272a]">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-[#27272a] rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
