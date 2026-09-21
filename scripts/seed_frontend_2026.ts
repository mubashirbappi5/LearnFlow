import { PrismaClient, Status, QuestionType, SubmissionType } from '@prisma/client';
import { frontendRoadmap2026 } from './data/frontend_2026';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Frontend 2026 Complete Roadmap...');
  console.log(`Milestones to process: ${frontendRoadmap2026.milestones.length}`);

  // 1. Wipe old Frontend Developer paths to prevent duplicates
  console.log('Wiping old front-end careers...');
  await prisma.careerPath.deleteMany({
    where: { 
      slug: { in: ['frontend-developer', 'front-end-engineering-2026'] } 
    }
  });

  // 2. Create the Career Path
  const career = await prisma.careerPath.create({
    data: {
      title: frontendRoadmap2026.career.title,
      slug: frontendRoadmap2026.career.slug,
      description: frontendRoadmap2026.career.description,
      overview: frontendRoadmap2026.career.overview,
      coreSkills: frontendRoadmap2026.career.coreSkills,
      tools: frontendRoadmap2026.career.tools,
      estimatedDuration: frontendRoadmap2026.career.estimatedDuration,
      status: frontendRoadmap2026.career.status as Status,
    }
  });

  console.log(`Created Career: ${career.title}`);

  // 3. Iterate through Milestones (Courses)
  for (const milestone of frontendRoadmap2026.milestones) {
    console.log(`Processing ${milestone.title}...`);
    const course = await prisma.course.create({
      data: {
        title: milestone.title,
        slug: milestone.slug,
        description: milestone.description,
        careerPathId: career.id,
        order: milestone.order,
        status: Status.PUBLISHED
      }
    });

    let moduleOrder = 1;
    // 4. Iterate through Modules
    for (const modData of milestone.modules) {
      const module = await prisma.module.create({
        data: {
          title: modData.title,
          description: `Topics covered: ${modData.topics}`,
          courseId: course.id,
          order: moduleOrder++,
          status: Status.PUBLISHED
        }
      });

      // 5. Create Lesson(s) for the module
      const topicsArr = modData.topics.split(',').map(t => t.trim());
      
      let lessonOrder = 1;
      for (const topic of topicsArr) {
        await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: topic,
            videoUrl: modData.videoUrl, // Reusing the module-level video URL since creating 500 unique URLs is impossible without an external DB.
            content: `# ${topic}\n\nThis lesson covers the fundamentals of **${topic}** as part of the ${modData.title} module.\n\n### Learning Objectives\n- Understand the core concepts of ${topic}.\n- Learn how ${topic} interacts with other web technologies.\n- Practice implementing ${topic} in a real-world scenario.\n\nMake sure to watch the attached video for an in-depth walkthrough!`,
            order: lessonOrder++,
            status: Status.PUBLISHED
          }
        });
      }

      // Add a Quiz for the module (as requested by the PDF Quiz System)
      await prisma.quiz.create({
        data: {
          title: `${modData.title} Quiz`,
          moduleId: module.id,
          passingScore: 70,
          status: Status.PUBLISHED,
          questions: {
            create: [
              {
                type: QuestionType.MULTIPLE_CHOICE,
                question: `Which of the following is covered in ${modData.title}?`,
                options: JSON.stringify([topicsArr[0] || 'Variables', 'Database Modeling', 'Server Maintenance']),
                correctOptions: JSON.stringify([topicsArr[0] || 'Variables']),
                order: 1
              }
            ]
          }
        }
      });
    }

    // 6. Create the Milestone Mini Assignment
    await prisma.assignment.create({
      data: {
        title: milestone.assignment.title,
        instructions: milestone.assignment.instructions,
        requirements: milestone.assignment.requirements,
        moduleId: (await prisma.module.findFirst({ where: { courseId: course.id }, orderBy: { order: 'desc' } }))!.id,
        allowedTypes: [SubmissionType.GITHUB_URL, SubmissionType.LIVE_URL],
        status: Status.PUBLISHED
      }
    });
  }

  console.log('Successfully completed the massive 2026 Front-End Engineering Seed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
