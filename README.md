# YouTube Clone - MERN Stack Project

A full-stack YouTube clone built using the MERN (MongoDB, Express, React, Node.js) stack.

## Features

- User Authentication (Register/Login)
- Video Upload and Playback
- Search and Filter Videos
- Like/Dislike Videos
- Comment System
- Responsive Design

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: CSS/SCSS

## Project Structure

```
youtube-clone/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js/Express application
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/videos - Get all videos
- POST /api/videos - Upload new video
- GET /api/videos/:id - Get video details
- POST /api/videos/:id/comments - Add comment
- PUT /api/videos/:id/like - Like video
- PUT /api/videos/:id/dislike - Dislike video

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 