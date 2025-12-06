## Project Overview

In this sprint, our group completed the final part of the TrackEvent application.
This project lets users:

view past events

create events

manage personal data

login/logout using authentication

Sprint 5 focused mainly on Clerk authentication, user data management, and deployment.

## Sprint 5 
### T.1 — Clerk Auth Setup

We added Clerk to the frontend and backend.

Users can now log in, register, and log out.

Clerk middleware protects backend routes.

Clerk components manage session state on frontend.

### T.2 — Vercel Deployment

Both frontend and backend deploy automatically to Vercel.

Deployment triggers every time we push to main.

Only one group member's Vercel account manages deployments.

### T.3 — Backend User Management

Added userId to Prisma schema.

Updated database migrations.

Protected backend routes that require authentication.

Events now store the Clerk user’s ID.

### T.4 — Login & Registration

Login page is visible and easy to find.

Logout button added.

Pages change depending on user login status.

Some features hidden for guests.

### T.5 — Local Setup Instructions

Included below in this README.

## Tech Stack
### Frontend

React

TypeScript

Clerk Auth

Vite

### Backend

Node.js

Express

Prisma

PostgreSQL

### Deployment

Vercel (Frontend + Backend)

## Project Folder Structure
project/
│
├── apps/
│   ├── frontend/
│   └── backend/
│
├── prisma/
└── README.md

## Local Setup Instructions 

These instructions help anyone on the team run the project locally.

### 1. Install Required Tools

Before running the project, install:

Node.js

npm

PostgreSQL

Git

Clerk account

### 2. Create Local Database

Open pgAdmin or terminal and run:

CREATE DATABASE trackevent_dev;

### 3. Add Environment Variables
Backend → /apps/backend/.env
DATABASE_URL="postgresql://postgres:<yourpassword>@localhost:5432/trackevent_dev?schema=public"
CLERK_PUBLISHABLE_KEY=<your_key>
CLERK_SECRET_KEY=<your_key>
PORT=3000

Frontend → /apps/frontend/.env
VITE_CLERK_PUBLISHABLE_KEY=<your_key>
VITE_API_URL=http://localhost:3000/api

### 4. Run Backend
cd apps/backend
npm install
npx prisma migrate dev
npx prisma generate
npm run dev


Backend runs at:
http://localhost:3000

### 5. Run Frontend
cd apps/frontend
npm install
npm run dev


Frontend runs at:
http://localhost:5173

## How Authentication Works 

User signs in using Clerk

Clerk gives the frontend a session token

When user creates an event → token is sent to backend

Backend verifies the token

The event is saved with the userId

This ensures each user only sees their own data.

## Group Member Contributions
Member	    Work Done
Sukhtab:	Backend, Clerk integration, protected routes, fixing errors
Prabhjot:	Frontend UI and login page
Daljit:	    Database setup, migrations
Arshnoor:	Vercel deployment