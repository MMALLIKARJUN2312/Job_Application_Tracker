# Job Application Tracker

A full-stack **Job Application Tracking System*-- built using the **MERN stack (MongoDB, Express, React, Node.js)**.
This application helps users track their job applications, manage statuses, and stay organized during their job search.

Built with clean architecture, scalable folder structure, and professional Git practices.

---

## Table of Contents

- [Job Application Tracker](#job-application-tracker)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Key Features](#key-features)
    - [Authentication](#authentication)
    - [Job Management](#job-management)
    - [User Profile](#user-profile)
    - [Advanced Frontend Features](#advanced-frontend-features)
    - [Testing](#testing)
    - [Engineering Best Practices](#engineering-best-practices)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Testing](#testing-1)
    - [Dev Tools](#dev-tools)
  - [Project Architecture](#project-architecture)
  - [Folder Structure](#folder-structure)
  - [API Overview](#api-overview)
    - [Auth Routes](#auth-routes)
    - [Job Routes (Protected)](#job-routes-protected)
  - [Environment Variables](#environment-variables)
  - [Setup \& Installation](#setup--installation)
    - [Clone the Repository](#clone-the-repository)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
  - [Git Workflow \& Commit Convention](#git-workflow--commit-convention)
  - [Future Enhancements](#future-enhancements)
  - [Learning Outcomes](#learning-outcomes)
  - [License](#license)

---

## Project Overview

The **Job Application Tracker*-- is a real-world MERN application designed to simulate how production-grade applications are built.

Users can:

-- Register and log in securely
-- Create and manage job applications
-- Track application status (Applied, Interview, Offer, Rejected)
-- View everything in a clean dashboard

This project is built **end-to-end**, focusing on:
-- Clean backend APIs
-- Secure authentication
-- Scalable frontend architecture
-- Optimized data fetching and caching
-- Professional Git usage

---

## Key Features

### Authentication

-- User Registration & Login
-- Password hashing using bcrypt
-- JWT-based authentication
-- Protected routes using middleware

### Job Management

-- Create job applications
-- Update job status
-- Delete applications
-- Filter, sort, and search jobs
-- Pagination support for scalable data handling

### User Profile

-- View and update profile
-- Secure user-specific data access

### Advanced Frontend Features

-- Server state management using React Query
-- API caching and background refetching
-- Optimistic UI updates for better UX
-- Toast notifications for success/error feedback
-- Skeleton loading UI for improved perceived performance
-- Error boundaries for graceful error handling

### Testing

-- Unit testing using Vitest
-- API mocking using MSW (Mock Service Worker)
-- Component testing with React Testing Library

### Engineering Best Practices

-- Modular backend architecture
-- Separation of concerns
-- Centralized API handling using Axios interceptors
-- Clean commit history following conventional commits
-- Environment-based configuration

---

## Tech Stack

### Frontend

-- React (Vite)
-- React Router
-- React Query
-- Axios
-- Context API
-- React Hook Form + Zod
-- TailwindCSS
-- react-hot-toast
-- react-loading-skeleton

### Backend

-- Node.js
-- Express.js
-- MongoDB
-- Mongoose
-- JWT
-- bcrypt
-- dotenv
-- cors

### Testing

-- Vitest
-- MSW (Mock Service Worker)
-- React Testing Library

### Dev Tools

-- Git & GitHub
-- Nodemon
-- Postman

---

## Project Architecture

```
Client (React)
↓ Axios + React Query
REST API (Express + Node)
↓ Mongoose
MongoDB Database
```

---

## Folder Structure

```
job-application-tracker/
│
├── backend/
│   ├── src/
│   │   ├── config/         # DB & app configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Auth & error handling
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # App entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── context/        # Global state management
│   │   ├── api/            # API layer (Axios + React Query)
│   │   ├── hooks/          # Custom hooks
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## API Overview

### Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
```

### Job Routes (Protected)

```
GET    /api/jobs
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
GET    /api/jobs/stats
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/job-tracker-mern.git
cd job-tracker-mern
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Running the Application

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | <http://localhost:5173> |
| Backend  | <http://localhost:5000> |

---

## Git Workflow & Commit Convention

We follow **Conventional Commits**:

```
feat: add new feature
fix: fix a bug
chore: setup or configuration
refactor: code improvement
docs: documentation changes
perf: performance improvements
test: add or update tests
```

---

## Future Enhancements

-- Charts & analytics dashboard
-- Resume upload (Cloudinary)
-- Email notifications
-- Role-based access control
-- Deployment (Render / Vercel)
-- End-to-End testing (Playwright)

---

## Learning Outcomes

By building this project, you will learn:

-- Full-stack MERN development
-- Secure authentication flows
-- REST API design
-- MongoDB data modeling
-- Frontend–backend integration
-- Server state management with React Query
-- Testing strategies using Vitest and MSW
-- Performance optimization techniques
-- Professional Git practices

---

## License

This project is licensed under the **MIT License**.
