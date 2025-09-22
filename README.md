# Music Distribution Dashboard

A Next.js application for managing music distribution with features for track management, uploads, and analytics.

## Features

- ✅ User authentication (mock implementation)
- ✅ Dashboard with track listing and search functionality
- ✅ Track upload form
- ✅ Track detail page with dynamic routing
- ✅ Responsive design for mobile and desktop
- ✅ Dark/Light theme toggle
- ✅ Mock API endpoints for tracks

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Login Credentials

This is a mock implementation. Any email and password combination will work as long as:
- Email is in a valid format (contains @ and .)
- Password is at least 6 characters long

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- date-fns for date formatting

## Project Structure

- `/pages` - Next.js pages and API routes
- `/components` - Reusable React components
- `/types` - TypeScript type definitions
- `/styles` - Global CSS and Tailwind configuration

## Future Enhancements

- Real authentication with JWT or OAuth
- Backend integration with a database
- Analytics dashboard
- Royalty tracking
- Distribution platform integration