import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { Status, QuestionType, SubmissionType } from '@prisma/client';

export default async function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const course = await prisma.course.findUnique({
    where: { id: resolvedParams.id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          quizzes: true,
          assignments: true
        }
      },
      careerPath: true
    }
  });

  if (!course) notFound();

  // ----- Server Actions for nested creation -----
  async function createModule(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    if (!title) return;
    await prisma.module.create({
      data: {
        title,
        courseId: course!.id,
        order: course!.modules.length
      }
    });
    revalidatePath(`/admin/courses/${course!.id}`);
  }

  async function createLesson(formData: FormData) {
    'use server';
    const moduleId = formData.get('moduleId') as string;
    const title = formData.get('title') as string;
    if (!moduleId || !title) return;
    const module = await prisma.module.findUnique({ where: { id: moduleId }, include: { lessons: true } });
    await prisma.lesson.create({
      data: {
        title,
        moduleId,
        order: module?.lessons.length || 0,
        content: '# ' + title + '\n\nAdd content here...'
      }
    });
    revalidatePath(`/admin/courses/${course!.id}`);
  }

  async function createQuiz(formData: FormData) {
    'use server';
    const moduleId = formData.get('moduleId') as string;
    const title = formData.get('title') as string;
    if (!moduleId || !title) return;
    await prisma.quiz.create({
      data: {
        title,
        moduleId,
        passingScore: 70
      }
    });
    revalidatePath(`/admin/courses/${course!.id}`);
  }

  async function createAssignment(formData: FormData) {
    'use server';
    const moduleId = formData.get('moduleId') as string;
    const title = formData.get('title') as string;
    if (!moduleId || !title) return;
    await prisma.assignment.create({
      data: {
        title,
        moduleId,
        instructions: 'Assignment Instructions here...',
        requirements: 'Submit a github repo link',
        allowedTypes: [SubmissionType.GITHUB_URL]
      }
    });
    revalidatePath(`/admin/courses/${course!.id}`);
  }

  return (
    <div className="space-y-6 animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
        <Link href={`/admin/careers/${course.careerPathId}`} className="text-gradient">
          &larr; Back to {course.careerPath.title}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Course Builder: {course.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
        Construct your course by adding modules, and populating them with lessons, quizzes, and assignments.
      </p>
      
      {/* Module List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {course.modules.map((module, index) => (
          <div key={module.id} className="card" style={{ padding: '24px', border: '1px solid var(--color-brand-primary)' }}>
            <h2 className="text-2xl font-bold mb-4">Module {index + 1}: {module.title}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              {/* Lessons Column */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-brand-secondary)' }}>Lessons</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {module.lessons.map(lesson => (
                    <div key={lesson.id} style={{ padding: '8px 12px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '4px', fontSize: '0.875rem' }}>
                      📄 {lesson.title}
                    </div>
                  ))}
                  {module.lessons.length === 0 && <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>No lessons yet</span>}
                </div>
                <form action={createLesson} style={{ display: 'flex', gap: '8px' }}>
                  <input type="hidden" name="moduleId" value={module.id} />
                  <input type="text" name="title" placeholder="Lesson title..." style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'var(--color-bg-primary)', color: 'white', border: '1px solid var(--color-border)' }} required />
                  <button type="submit" className="btn btn-secondary" style={{ padding: '4px 12px' }}>+ Add</button>
                </form>
              </div>

              {/* Assessments Column */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-success)' }}>Assessments (Quizzes & Assignments)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {module.quizzes.map(quiz => (
                    <div key={quiz.id} style={{ padding: '8px 12px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '4px', fontSize: '0.875rem' }}>
                      ❓ {quiz.title} (Quiz)
                    </div>
                  ))}
                  {module.assignments.map(assignment => (
                    <div key={assignment.id} style={{ padding: '8px 12px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '4px', fontSize: '0.875rem' }}>
                      📁 {assignment.title} (Assignment)
                    </div>
                  ))}
                  {module.quizzes.length === 0 && module.assignments.length === 0 && <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>No assessments yet</span>}
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <form action={createQuiz} style={{ display: 'flex', gap: '8px', flex: 1 }}>
                    <input type="hidden" name="moduleId" value={module.id} />
                    <input type="text" name="title" placeholder="Quiz title..." style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'var(--color-bg-primary)', color: 'white', border: '1px solid var(--color-border)' }} required />
                    <button type="submit" className="btn btn-secondary" style={{ padding: '4px 12px' }}>+ Quiz</button>
                  </form>
                  <form action={createAssignment} style={{ display: 'flex', gap: '8px', flex: 1 }}>
                    <input type="hidden" name="moduleId" value={module.id} />
                    <input type="text" name="title" placeholder="Assignment title..." style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'var(--color-bg-primary)', color: 'white', border: '1px solid var(--color-border)' }} required />
                    <button type="submit" className="btn btn-secondary" style={{ padding: '4px 12px' }}>+ Assig.</button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        ))}

        {course.modules.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
            <h3 className="text-xl mb-2">No Modules Yet</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Add your first module below to start building this course.</p>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '24px', marginTop: '32px' }}>
        <h2 className="text-xl font-bold mb-4">Add New Module</h2>
        <form action={createModule} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            name="title" 
            placeholder="Module Title..." 
            className="form-input" 
            style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', color: 'white' }}
            required 
          />
          <button type="submit" className="btn btn-primary">
            + Add Module
          </button>
        </form>
      </div>

    </div>
  );
}
