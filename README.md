# Sparky Platform - Social Networking Application

[![Node.js](https://img.shields.io/badge/Node.js-16+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)](https://www.mongodb.com/)
[![Angular](https://img.shields.io/badge/Angular-19.1-red)](https://angular.dev/)

## Overview

Sparky Platform is a full-stack social networking application built with Angular (frontend) and Node.js/Express (backend). The platform enables rich social interactions, real-time messaging, and AI-powered content generation.

🎥 **Watch the Demo:**

- [YouTube](https://youtu.be/RJTGfV7cW88)

## Key Features

- **User Management**

  - Secure authentication with JWT
  - Profile customization with image uploads
  - Follow/Unfollow system
  - Real-time user status tracking

- **Social Features**

  - Post creation with multiple image uploads
  - Comments and "sparks" (likes) system
  - AI-powered post generation using Google's Gemini
  - Private messaging system
  - Real-time notifications

- **UI/UX**
  - Responsive modern design
  - Dark/Light theme support
  - Real-time updates via WebSocket
  - pagination for content
  - Image preview and gallery view

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

- Node.js (v16+)
- MongoDB
- Angular CLI

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

### Running the Server

- `npm start` or `yarn start` (uses nodemon for automatic restarts during development)

## API Endpoints (Examples)

- `POST /users/register`: Register a new user.
- `POST /users/login`: Log in an existing user.
- `GET /users/:id`: Get user information.
- `POST /posts`: Create a new post.
- `GET /posts`: Get all posts (with pagination).
- `POST /followOrUnfollow/:id/follow`: Follow a user.
- `POST /followOrUnfollow/:id/unfollow`: Unfollow a user.
- ... more

(Refer to the API documentation or route files for a complete list of endpoints.)

## Future Enhancements

- Implement more advanced notification features (e.g., real-time updates using WebSockets).
- Implement image/video upload functionality for posts.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## Core Features Implementation

### Real-time Messaging

- WebSocket integration for instant messaging
- Message read status tracking
- Recent conversations list

- Conversation history
- Message delivery status indicators

### Post Management

- private advice for each post
- Create, edit, and delete posts
- Multiple image uploads with preview
- AI-powered content generation with Gemini
- Comments and reactions system

### User Interactions

- Follow/Unfollow system with notifications
- Real-time activity updates
- Profile customization options
  - Profile picture and cover photo
  - Bio and personal information
    -follower / following tracking
    -user activity and own post history
    -fetching private advices for each post

### API Documentation

#### Authentication Endpoints

```
POST /users/register - Register new user
POST /users/login - User login
GET  /users/current - Get current user
```

#### Posts Endpoints

```
POST /posts - Create post
GET  /posts - Get feed posts
PUT  /posts/:id - Update post
POST /posts/:id/spark - Toggle spark
POST /posts/:id/comments - Add comment
```

#### Social Endpoints

```
POST /follow/:id - Follow user
POST /unfollow/:id - Unfollow user
GET  /social/:id - Get followers/following
```

#### Messages Endpoints

```
POST  /messages - Send message
GET   /messages/:userId - Get conversation
PATCH /messages/seen/:messageId - Mark as read
GET   /messages/recent - Get recent conversations
```

## Conclusion

Sparky Platform aims to provide a modern social networking experience with:

- Full-stack integration (Angular + Node.js)
- Real-time features and AI capabilities
- Secure user data handling
- Scalable architecture

Join our community and contribute to shaping the future of social networking!

For support: [GitHub Issues](https://github.com/username/sparky-platform/issues)
