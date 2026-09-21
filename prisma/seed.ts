import { PrismaClient, Role, Status, ProgressStatus, QuestionType, SubmissionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnflow.com' },
    update: {},
    create: {
      email: 'admin@learnflow.com',
      name: 'Admin User',
      password: adminPassword,
      role: Role.ADMIN,
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // 2. Create Career Path
  const career = await prisma.careerPath.upsert({
    where: { slug: 'frontend-developer' },
    update: {},
    create: {
      title: 'Frontend Developer',
      slug: 'frontend-developer',
      description: 'Learn to build modern, responsive, and interactive web interfaces.',
      overview: 'Frontend developers are responsible for everything a user sees and interacts with on a website.',
      coreSkills: 'HTML, CSS, JavaScript, React, DOM Manipulation, Git',
      tools: 'VS Code, GitHub, Chrome DevTools',
      estimatedDuration: '3-6 months',
      status: Status.PUBLISHED,
    },
  })
  console.log(`Created career path: ${career.title}`)

  // 3. Create Course
  const course = await prisma.course.upsert({
    where: { slug: 'web-fundamentals' },
    update: {},
    create: {
      title: 'Web Fundamentals',
      slug: 'web-fundamentals',
      description: 'The core foundations of the web: HTML, CSS, and basic JavaScript.',
      careerPathId: career.id,
      status: Status.PUBLISHED,
      order: 1,
    },
  })
  console.log(`Created course: ${course.title}`)

  // 4. Create Modules
  const mod1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Introduction to HTML',
      description: 'Learn the structure of web pages.',
      order: 1,
      status: Status.PUBLISHED,
    },
  })
  const mod2 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Styling with CSS',
      description: 'Make your web pages look beautiful.',
      order: 2,
      status: Status.PUBLISHED,
    },
  })

  // 5. Create Lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: mod1.id,
      title: 'What is HTML?',
      content: 'HTML stands for HyperText Markup Language. It is the standard markup language for documents designed to be displayed in a web browser.\n\n### Key Concepts\n- Elements\n- Tags\n- Attributes',
      order: 1,
      status: Status.PUBLISHED,
    },
  })

  const lesson2 = await prisma.lesson.create({
    data: {
      moduleId: mod1.id,
      title: 'Your First Web Page',
      content: 'Let us build a simple web page using HTML boilerplates.',
      order: 2,
      status: Status.PUBLISHED,
    },
  })

  // 6. Create Resources
  await prisma.resource.create({
    data: {
      lessonId: lesson1.id,
      title: 'MDN Web Docs: HTML Basics',
      creator: 'Mozilla',
      originalUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics',
      resourceType: 'Article',
      status: Status.PUBLISHED,
    },
  })

  // 7. Create Quiz
  const quiz = await prisma.quiz.create({
    data: {
      moduleId: mod1.id,
      title: 'HTML Basics Quiz',
      description: 'Test your knowledge on HTML fundamentals.',
      passingScore: 70,
      status: Status.PUBLISHED,
    },
  })

  // 8. Add Quiz Questions
  await prisma.quizQuestion.create({
    data: {
      quizId: quiz.id,
      type: QuestionType.MULTIPLE_CHOICE,
      question: 'What does HTML stand for?',
      options: JSON.stringify(['Hyper Text Preprocessor', 'HyperText Markup Language', 'Hyper Terminal Motor Language', 'Hyperlink and Text Markup Language']),
      correctOptions: JSON.stringify(['HyperText Markup Language']),
      explanation: 'HTML is the standard markup language for creating Web pages.',
      order: 1,
    },
  })

  // 9. Create Assignment
  await prisma.assignment.create({
    data: {
      moduleId: mod2.id,
      title: 'Build a Personal Portfolio Layout',
      instructions: 'Using HTML and CSS, build a simple layout for a personal portfolio. It should include a header, main content area, and a footer.',
      requirements: 'Must use semantic HTML5 tags. Must have basic CSS styling (colors, layout).',
      allowedTypes: [SubmissionType.GITHUB_URL, SubmissionType.LIVE_URL],
      status: Status.PUBLISHED,
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
