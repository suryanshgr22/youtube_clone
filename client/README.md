# YouTube Clone - Frontend

This is the frontend part of the YouTube Clone project, built with React and Material-UI.

## Features

- Modern and responsive UI
- User authentication (login/register)
- Video browsing and search
- Video player with like/dislike functionality
- Comment system
- Dark theme

## Tech Stack

- React
- React Router
- Material-UI
- Axios
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── services/      # API services
├── utils/         # Utility functions
└── assets/        # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Integration

The frontend communicates with the backend API at `http://localhost:5000`. Make sure the backend server is running before starting the frontend.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
