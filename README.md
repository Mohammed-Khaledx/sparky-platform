# Sparky Platform - Social Networking Application


[![Node.js](https://img.shields.io/badge/Node.js-16+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)](https://www.mongodb.com/)
[![Angular](https://img.shields.io/badge/Angular-19.1-red)](https://angular.dev/)

## Overview

Sparky Platform is a full-stack social networking application built with Angular (frontend) and Node.js/Express (backend). The platform enables rich social interactions, real-time messaging, and AI-powered content generation.

🎥 **Watch the Demo:**

- [YouTube](https://youtu.be/X_ffZQFldBg)

## Key Features

- **User Management**

  - Secure authentication with JWT
  - Profile customization with image uploads
  - Follow/Unfollow system
  - Real-time user status tracking

- **Social Features**

  - Post creation with multiple image uploads
  - Comments and "sparks" (likes) system
  - private advice for each post
  - AI-powered post generation using Google's Gemini
  - Chat messaging system
  - Real-time notifications


## Tech Stack

### Frontend

- Angular 19.1.4
- TypeScript
- RxJS
- Socket.io Client
- SCSS/CSS Modules

### Backend

- Node.js & Express
- MongoDB with Mongoose
- Socket.io
- JWT Authentication
- Google AI API (Gemini)
- Multer for file uploads

## Project Structure

Sparky Platform follows a modular architecture, separating concerns into distinct components:

- **Routes:** Define API endpoints and handle routing requests to appropriate controllers.
- **Controllers:** Implement the application's business logic, handling requests and interacting with models.
- **Models:** Define data schemas and interact with the MongoDB database using Mongoose.
- **Middlewares:** Handle authentication, authorization, error handling, and other cross-cutting concerns.

## Setup and Installation

### Prerequisites



### Backend Setup

```bash
cd server
npm install
# Configure .env file with:
# MONGODB_URI=mongodb://127.0.0.1:27017/sparky_platfrom_db
# JWT_SECRET=your_secret_key
# GEMINI_API_KEY=your_gemini_api_key
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

