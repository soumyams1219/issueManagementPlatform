# Minimal Issue Management Platform

## Overview

A Full Stack Issue Management Platform built as part of a MERN Stack Coding Challenge.

The application allows users to:

- Create and manage issues
- View all issues
- View issue details
- Add discussions to issues
- Generate AI-powered issue analysis using Gemini AI

This project demonstrates:

- Clean Architecture
- REST API Design
- PostgreSQL Database Integration
- AI Integration using Gemini
- Type-Safe Development with TypeScript
- Modern Frontend Development using Next.js

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios

## Backend

- NestJS
- TypeScript
- PostgreSQL (Neon Database)
- Drizzle ORM
- REST API

## AI Integration

- Google Gemini API

---

# Project Structure

```text
IssueManagementPlatform/
│
├── frontend/
│   ├── app/
│   ├── types/
│   ├── services/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── issues/
│   │   ├── discussions/
│   │   ├── ai/
│   │   ├── db/
│   │   └── ...
│   │
│   ├── drizzle/
│   └── ...
│
└── README.md
```

---

# Features

## Issue Management

- Create Issue
- View All Issues
- View Single Issue
- Update Issue
- Delete Issue

## Discussion System

- Add Discussion Updates
- View Discussion History

## AI-Powered Analysis

Generate automated insights using Gemini AI based on:

- Issue Title
- Issue Description
- Discussion History

Generated Analysis:

- Issue Summary
- Root Cause Analysis
- Priority Assessment
- Suggested Resolution Steps

---

# Database Schema

## Issues Table

| Column | Type |
|----------|----------|
| id | UUID |
| title | VARCHAR |
| description | TEXT |
| status | VARCHAR |
| priority | VARCHAR |
| analysis | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

## Discussions Table

| Column | Type |
|----------|----------|
| id | UUID |
| issue_id | UUID |
| message | TEXT |
| created_at | TIMESTAMP |

### Relationship

```text
Issue
   |
   └── Multiple Discussions
```

---

# API Endpoints

## Issues

```http
GET     /issues
GET     /issues/:id
POST    /issues
PATCH   /issues/:id
DELETE  /issues/:id
```

## Discussions

```http
GET     /issues/:issueId/discussions
POST    /issues/:issueId/discussions
```

## AI Analysis

```http
POST    /issues/:issueId/analyze
GET     /issues/:issueId/analysis
```

---

# API Documentation

Swagger documentation is available after starting the backend server:

```text
http://localhost:3001/api
```

---

# Environment Variables

## Backend (.env)

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=your_neon_database_connection_string

GEMINI_API_KEY=your_gemini_api_key

PORT=3001
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/soumyams1219/issueManagementPlatform.git

cd issue-management-platform
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file and add required environment variables.

Generate migrations:

```bash
npm run drizzle:generate
```

Run migrations:

```bash
npm run drizzle:migrate
```

Start development server:

```bash
npm run start:dev
```

Backend runs at:

```text
http://localhost:3001
```

Swagger Documentation:

```text
http://localhost:3001/api
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

# Database

The application uses:

- PostgreSQL
- Neon Serverless Database
- Drizzle ORM

Database migrations are managed using Drizzle Kit.

---

# AI Integration

The application integrates Google Gemini API to generate automated issue analysis.

Analysis is generated using:

- Issue Information
- Discussion History
- Contextual Issue Updates

### Note

Gemini API requires:

- Valid API Key
- Active Google AI Studio Project
- Available API Quota

If quota is exceeded, the core Issue Management functionality continues to work normally.

---

# Engineering Decisions

### NestJS

Chosen for:

- Modular Architecture
- Dependency Injection
- Scalability
- Maintainability

### PostgreSQL + Neon

Chosen for:

- Relational Data Modeling
- Cloud-Hosted Database
- Easy Scalability

### Drizzle ORM

Chosen for:

- Type Safety
- Lightweight Design
- Excellent TypeScript Support

### Next.js

Chosen for:

- Modern React Development
- Routing System
- Performance
- Developer Experience

### REST API

Chosen for:

- Simplicity
- Easy Frontend Integration
- Clear Resource-Based Design

---

# Future Improvements

- Authentication & Authorization
- User Roles
- Issue Assignment
- File Attachments
- Email Notifications
- Real-Time Discussion Updates
- Docker Support
- Unit Testing
- Integration Testing
- CI/CD Pipeline

---

# Deployment

Not deployed yet.

### Local Development URLs

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:3001
```

---

# Author

**Soumya M S**

MERN Stack Developer

GitHub:

https://github.com/soumyams1219

LinkedIn:

https://www.linkedin.com/in/soumya-ms
