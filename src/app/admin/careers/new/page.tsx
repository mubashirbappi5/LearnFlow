import React from 'react'
import CareerForm from '@/components/admin/CareerForm'

export default function NewCareerPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-white">Create Career Path</h1>
      <CareerForm />
    </div>
  )
}
