'use client'

import React from 'react'
import { createCareer, updateCareer } from '@/actions/admin/careers'
import { CareerPath, Status } from '@prisma/client'

export default function CareerForm({ career }: { career?: CareerPath }) {
  const action = career ? updateCareer.bind(null, career.id) : createCareer

  return (
    <form action={action} className="glass-panel p-6 max-w-2xl flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
        <input 
          type="text" 
          name="title" 
          defaultValue={career?.title} 
          required 
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
        <input 
          type="text" 
          name="slug" 
          defaultValue={career?.slug} 
          required 
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
        <textarea 
          name="description" 
          defaultValue={career?.description} 
          required 
          rows={3}
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]" 
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Overview</label>
        <textarea 
          name="overview" 
          defaultValue={career?.overview || ''} 
          rows={3}
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]" 
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Core Skills (comma separated)</label>
        <input 
          type="text" 
          name="coreSkills" 
          defaultValue={career?.coreSkills || ''} 
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Estimated Duration</label>
        <input 
          type="text" 
          name="estimatedDuration" 
          defaultValue={career?.estimatedDuration || ''} 
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
        <select 
          name="status" 
          defaultValue={career?.status || Status.DRAFT} 
          className="w-full bg-[#121214] border border-[#27272a] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#6366f1]"
        >
          {Object.values(Status).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="pt-4">
        <button type="submit" className="btn btn-primary w-full">
          {career ? 'Update Career Path' : 'Create Career Path'}
        </button>
      </div>
    </form>
  )
}
