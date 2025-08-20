# Toki Issue Tracker

![Issues Page](https://github.com/user-attachments/assets/5a43e38c-7524-40b8-81fc-406df8753826)

## Introduction

Toki Issue Tracker is a comprehensive web application designed to help teams efficiently track, manage, and resolve issues across projects. Built with modern web technologies, it provides a seamless experience for creating, assigning, and monitoring issues with a clean and intuitive interface. The application streamlines workflow management and enhances team collaboration through real-time updates and detailed analytics.

## Overview

Toki is a full-stack issue tracking system that enables teams to maintain organized workflows by categorizing issues based on type, priority, and status. The application features a responsive design that works across devices, allowing team members to stay updated on the go. With role-based access control, customizable dashboards, and comprehensive reporting, Toki helps teams improve productivity and project visibility.

## Requirements

To run Toki Issue Tracker locally, you'll need:

- **Node.js** (v18.0.0 or newer)
- **npm** or **yarn** package manager
- **PostgreSQL** database
- Internet connection for authentication services

## Features

### User Management

- Secure authentication with email/password or OAuth providers
- Role-based access control (Employee, Manager, Admin)
- Customizable user profiles with avatars

### Issue Tracking

- Create and edit issues with detailed descriptions
- Categorize issues by type:
  - Bug
  - Feature
  - Enhancement
  - Documentation
  - Other
- Prioritize with multiple levels:
  - Minor
  - Lowest
  - Low
  - Medium
  - High
  - Highest
  - Critical
- Track status through workflow stages:
  - Backlog
  - To Do
  - In Progress
  - Code Review
  - Completed
  - Canceled

### Team Collaboration

- Assign issues to team members
- Tag issues for easy filtering and categorization
- Track issue history and updates

### Reporting & Analytics

- Visual dashboards showing project status
- Charts for issue distribution by status, type, and priority
- Performance metrics and team productivity insights

## Screenshots

### Dashboard

![Dashboard](https://github.com/user-attachments/assets/5a43e38c-7524-40b8-81fc-406df8753826)

## Technologies Used

- **Frontend**:

  - Next.js 15.1.2 (React 19)
  - Tailwind CSS for styling
  - shadcn/ui component library
  - react-hook-form for form handling
  - zod for validation
  - recharts for data visualization

- **Backend**:

  - Next.js API routes
  - Prisma ORM
  - PostgreSQL database

- **Authentication**:
  - NextAuth.js

## Running the App Locally

Follow these steps to set up and run Toki Issue Tracker on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/VladSydorets/toki.git
cd toki
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/toki"
DIRECT_URL="postgresql://username:password@localhost:5432/toki"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Optional: OAuth providers
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

### 4. Set Up the Database

```bash
npx prisma migrate dev
# or
yarn prisma migrate dev
```

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 6. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Deployment

Toki is optimized for deployment on Vercel, but can be deployed to any platform that supports Next.js applications. For detailed deployment instructions, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Demo

Try the live demo: [https://toki-one.vercel.app/](https://toki-one.vercel.app/)

## Author

**Vlad Sydorets**

- GitHub: [VladSydorets](https://github.com/VladSydorets)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ using Next.js and Prisma
