# ReplitAI Flight - Group Bookings Web Application

A modern React-based web application for group travel bookings with ReplitAI Airlines, built with TypeScript, Express, and Tailwind CSS.

## Architecture Overview

### Frontend Architecture
```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Base UI components (buttons, cards, etc.)
│   │   └── ...         # Feature-specific components
│   ├── data/           # Static data and mock APIs
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   └── pages/          # Page components and routing
```

### Backend Architecture
```
server/
├── routes.ts           # API route definitions
├── storage.ts          # Data storage interface
└── index.ts           # Server entry point
```

### Shared Code
```
shared/
└── schema.ts          # Shared type definitions and database schema
```

## Key Features

### Frontend Components
- **FlightSearchForm**: Main search interface for flights
- **SpecialOffers**: Displays promotional deals and special rates
- **TripTypeSelector**: Handles one-way/round-trip selection
- **BestFlightDeals**: Shows current best deals
- **Header/Footer**: Navigation and site structure

### Pages
- **Home**: Landing page with search functionality
- **SearchResults**: Flight listing and filtering
- **Itinerary**: Trip details and passenger information
- **Payment**: Secure payment processing
- **Confirmation**: Booking confirmation
- **ETicket**: Electronic ticket generation

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Hook Form
- TanStack Query

### Backend
- Express.js
- Drizzle ORM
- PostgreSQL Database
- Node.js

### Development Tools
- Vite
- ESBuild
- TypeScript
- PostCSS

## Data Flow

1. **User Input** → Flight search parameters entered
2. **API Request** → Server processes search criteria
3. **Data Processing** → Flight filtering and sorting
4. **Response** → Available flights displayed
5. **Booking Flow** → User selects flight → Enters details → Makes payment
6. **Confirmation** → Booking confirmed → E-ticket generated

## Security Features

- Session-based authentication
- Secure payment processing
- Input validation and sanitization
- CSRF protection
- Rate limiting

## Performance Optimizations

- Client-side caching
- Lazy loading of components
- Image optimization
- Bundle size optimization
- Server-side pagination

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment

The application is configured for deployment on Replit with:
- Automated builds
- Production optimization
- Environment variable management
- Database connection pooling

## Contributing

1. Create a new branch for features
2. Follow TypeScript best practices
3. Maintain component documentation
4. Test thoroughly before merging

## Environment Variables

Required environment variables:
- `NODE_ENV`: Development/production environment
- `DATABASE_URL`: Database connection string
- `SESSION_SECRET`: Session encryption key

## Project Details

Author name: Jegan SP   
Created By: ----  
Project Name: ReplitAI Testing Projects