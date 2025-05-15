# AI Knowledge Sprout - Daily Micro Learning App

AI Knowledge Sprout is a modern web application that delivers daily micro-learning content powered by AI. The app allows users to select topics of interest and receive bite-sized knowledge to build expertise over time.

## 🌟 Features

- **User Authentication**: Secure signup and login with JWT-based authentication
- **Topic Selection**: Choose from curated topics to focus your learning
- **AI-Generated Content**: Receive fresh, relevant content tailored to your interests
- **Progress Tracking**: Monitor your learning journey with visual progress indicators
- **Daily Learning Streaks**: Build consistency through daily learning sessions
- **Responsive Design**: Beautiful interface that works on any device
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Form Validation**: Robust form validation using Zod and React Hook Form

## 📸 Screenshots

### Landing Page

![Landing Page](./screenshots/landing-page.png)

### Login Page

![Login Page](./screenshots/login-page.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

## 🚀 Technologies Used

- **Frontend**:

  - React with TypeScript
  - Tailwind CSS for styling
  - Shadcn/UI components
  - React Router for navigation
  - React Query for data fetching
  - Zod for form validation
  - React Hook Form for form management

- **Backend**:
  - Express.js server with TypeScript
  - MongoDB with Mongoose
  - JWT for authentication
  - bcrypt for password hashing
  - CORS for cross-origin requests

## 📦 Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx        # Login form with validation
│   │   └── SignupForm.tsx       # Signup form with validation
│   ├── AnimatedTransition.tsx   # Smooth transitions between states
│   ├── Header.tsx               # App header component
│   ├── LearningCard.tsx         # Content display component
│   ├── ProgressIndicator.tsx    # Visual progress tracking
│   └── TopicSelector.tsx        # Topic selection interface
├── contexts/              # React contexts
│   ├── AuthContext.ts           # Authentication context types
│   └── AuthProvider.tsx         # Authentication provider component
├── hooks/                 # React custom hooks
│   ├── useAuth.ts              # Authentication hook
│   ├── useLearning.ts          # Learning content management
│   └── useTopics.ts            # Topic data management
├── lib/                   # Utility functions and configurations
│   ├── api.ts                   # API service with auth
│   └── validations/             # Form validation schemas
│       └── auth.ts              # Authentication schemas
├── pages/                 # Application pages
│   ├── auth/                    # Authentication pages
│   │   ├── LoginPage.tsx       # Login page
│   │   └── SignupPage.tsx      # Signup page
│   ├── Index.tsx                # Landing page
│   ├── Topic.tsx                # Topic details and learning content
│   └── NotFound.tsx             # 404 page
├── types/                 # TypeScript type definitions
│   └── index.ts                 # Shared types
├── utils/                 # Utility functions
│   └── animations.ts            # Animation helpers
├── App.tsx               # Main app component with routing
└── index.css             # Global styles

server/                   # Backend server
├── index.ts              # Express server setup
└── models/               # MongoDB models
    ├── User.ts           # User model
    ├── LearningContent.ts # Content model
    ├── UserProgress.ts    # Progress model
    └── Topic.ts           # Topic model
```

## 🔐 Authentication Features

### User Registration

- Secure signup with email and password
- Password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- Email validation and uniqueness check
- Automatic login after successful registration

### User Login

- Secure login with email and password
- JWT-based authentication
- Token storage in localStorage
- Protected route access
- Automatic redirect for authenticated users
- Persistent authentication state

### API Security

- JWT verification middleware
- Protected API endpoints
- CORS configuration
- Password hashing with bcrypt
- Secure token generation and validation
- Type-safe authentication context

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or pnpm

### Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=your_mongodb_connection_string
VITE_API_URL=http://localhost:3000/api
JWT_SECRET=your_jwt_secret_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd ai-knowledge-sprout
```

2. Install dependencies:

```sh
pnpm install
```

3. Start the development servers:

```sh
pnpm dev:all
```

4. Open your browser and navigate to:

```
http://localhost:8080/
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1440px and up)

## 🔮 Future Enhancements

- **OAuth Integration**: Social login options
- **Email Verification**: Verify user email addresses
- **Password Reset**: Forgot password functionality
- **User Profile**: Profile management and preferences
- **Real AI Integration**: Connect to actual AI APIs
- **Social Sharing**: Share learning insights
- **Offline Support**: PWA features
- **Personalized Learning**: AI-recommended topics

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Design inspired by Apple's design principles
- Icons from Lucide React
- UI components from shadcn/ui
- Form validation powered by Zod
- Authentication system using JWT
