# Job Application Tracker – MERN Stack

A full-stack **Job Application Tracking System** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This application helps users track their job applications, manage statuses, and stay organized during their job search.

Built with clean architecture, scalable folder structure, and professional Git practices.

---

## Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [API Overview](#-api-overview)
- [Environment Variables](#-environment-variables)
- [Setup & Installation](#-setup--installation)
- [Running the Application](#-running-the-application)
- [Git Workflow & Commit Convention](#-git-workflow--commit-convention)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [License](#-license)

---

## Project Overview

The **Job Application Tracker** is a real-world MERN application designed to simulate how production-grade applications are built.

Users can:
- Register and log in securely
- Create and manage job applications
- Track application status (Applied, Interview, Offer, Rejected)
- View everything in a clean dashboard

This project is built **end-to-end**, focusing on:
- Clean backend APIs
- Secure authentication
- Scalable frontend architecture
- Professional Git usage

---

## Key Features

### Authentication
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware

### Job Management
- Create job applications
- Update job status
- Delete applications
- Filter and search jobs

### User Profile
- View and update profile
- Secure user-specific data access

### Engineering Best Practices
- Modular backend architecture
- Separation of concerns
- Clean commit history
- Environment-based configuration

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Context API
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- cors

### Dev Tools
- Git & GitHub
- Nodemon
- Postman

---

## Project Architecture

```

Client (React)
↓ Axios
REST API (Express + Node)
↓ Mongoose
MongoDB Database

```

---

## Folder Structure

```

job-tracker-mern/
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
│   │   ├── services/       # API calls
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

````

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
````

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

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend  | [http://localhost:5000](http://localhost:5000) |

---

## Git Workflow & Commit Convention

We follow **Conventional Commits**:

```
feat: add new feature
fix: fix a bug
chore: setup or configuration
refactor: code improvement
docs: documentation changes
```
---

## Future Enhancements

* Resume upload (Cloudinary)
* Job analytics dashboard
* Pagination & sorting
* Email notifications
* Role-based access control
* Deployment (Render / Vercel)

---

## Learning Outcomes

By building this project, you will learn:

* Full-stack MERN development
* Secure authentication flows
* REST API design
* MongoDB data modeling
* Frontend–backend integration
* Professional Git practices
* Interview-ready explanation of concepts

---

## License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it.

---
