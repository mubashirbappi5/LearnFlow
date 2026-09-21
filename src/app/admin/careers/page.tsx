import React from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { deleteCareer } from '@/actions/admin/careers'

export default async function AdminCareersPage() {
  const careers = await prisma.careerPath.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Manage Careers</h1>
        <Link href="/admin/careers/new" className="btn btn-primary">
          + New Career
        </Link>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#27272a] bg-[#121214]">
              <th className="px-6 py-4 text-sm font-medium text-gray-400">Title</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map(career => (
              <tr key={career.id} className="border-b border-[#27272a] hover:bg-[#1c1c20] transition-colors">
                <td className="px-6 py-4 font-medium text-white">{career.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${career.status === 'PUBLISHED' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-300'}`}>
                    {career.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link href={`/admin/careers/${career.id}`} className="text-[#6366f1] hover:underline text-sm font-medium">Edit</Link>
                  <form action={deleteCareer.bind(null, career.id)} className="inline">
                    <button type="submit" className="text-red-500 hover:underline text-sm font-medium">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No careers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
