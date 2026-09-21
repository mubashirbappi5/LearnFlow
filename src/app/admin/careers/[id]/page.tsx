import React from 'react'
import CareerForm from '@/components/admin/CareerForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const career = await prisma.careerPath.findUnique({
    where: { id: resolvedParams.id },
    include: {
      courses: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!career) {
    notFound()
  }

  async function createCourse(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    if (!title) return;
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.course.create({
      data: {
        title,
        slug,
        description: 'New Course Description',
        careerPathId: career!.id,
        order: career!.courses.length
      }
    });
    revalidatePath(`/admin/careers/${career!.id}`);
  }

  return (
    <div className="space-y-6 animate-fade-in" style={{ padding: '24px' }}>
      <h1 className="text-3xl font-bold text-white mb-6">Edit Career Path: {career.title}</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div>
          <div className="card" style={{ padding: '24px' }}>
            <h2 className="text-xl font-bold mb-4">Career Details</h2>
            <CareerForm career={career} />
          </div>
        </div>

        <div>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="text-xl font-bold mb-4">Courses in this Path</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {career.courses.map((course) => (
                <div key={course.id} style={{ padding: '16px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{course.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Order: {course.order} | Status: {course.status}</div>
                  </div>
                  <Link href={`/admin/courses/${course.id}`} className="btn btn-secondary">
                    Build Course &rarr;
                  </Link>
                </div>
              ))}
              {career.courses.length === 0 && (
                <div style={{ padding: '16px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                  No courses yet.
                </div>
              )}
            </div>

            <form action={createCourse} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                name="title" 
                placeholder="New Course Title..." 
                className="form-input" 
                style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', color: 'white' }}
                required 
              />
              <button type="submit" className="btn btn-primary">
                + Add Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
