'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Status } from '@prisma/client'

export async function createCareer(formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const overview = formData.get('overview') as string
  const coreSkills = formData.get('coreSkills') as string
  const estimatedDuration = formData.get('estimatedDuration') as string
  const status = formData.get('status') as Status

  await prisma.careerPath.create({
    data: {
      title,
      slug,
      description,
      overview,
      coreSkills,
      estimatedDuration,
      status: status || Status.DRAFT
    }
  })

  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export async function updateCareer(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const overview = formData.get('overview') as string
  const coreSkills = formData.get('coreSkills') as string
  const estimatedDuration = formData.get('estimatedDuration') as string
  const status = formData.get('status') as Status

  await prisma.careerPath.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      overview,
      coreSkills,
      estimatedDuration,
      status: status || Status.DRAFT
    }
  })

  revalidatePath('/admin/careers')
  revalidatePath(`/admin/careers/${id}`)
  redirect('/admin/careers')
}

export async function deleteCareer(id: string) {
  await prisma.careerPath.delete({
    where: { id }
  })
  revalidatePath('/admin/careers')
}
