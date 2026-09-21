import React from 'react'
import CareerForm from '@/components/admin/CareerForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditCareerPage({ params }: { params: { id: string } }) {
  const career = await prisma.careerPath.findUnique({
    where: { id: params.id }
  })

  if (!career) {
    notFound()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-white">Edit Career Path</h1>
      <CareerForm career={career} />
    </div>
  )
}
