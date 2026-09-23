# LearnFlow

LearnFlow is a modern learning platform built with Next.js, Prisma, and TypeScript. It features interactive quizzes, user progress tracking, and an administrative dashboard for managing content.

## Features

- **User Dashboard**: Track learning progress and take interactive quizzes.
- **Admin Dashboard**: Manage courses, users, and view platform analytics.
- **Interactive Quizzes**: Test knowledge with real-time feedback.
- **Authentication**: Secure login and role-based access control.
- **Database**: Prisma ORM with relational database support.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

First, install dependencies:

```bash
npm install
# or yarn install / pnpm install
```

Then, set up your environment variables by creating a `.env` file (you can use your local database URL).

Run the database migrations or push schema:

```bash
npx prisma db push
# or npx prisma migrate dev
```

(Optional) Seed the database:
```bash
npm run seed
```

Finally, run the development server:

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
