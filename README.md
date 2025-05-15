
# ReplitAI Flight  - Group Bookings Web Application

A modern React-based web application for group travel bookings with ReplitAI Airlines.

## Project Structure

```
client/
├── src/
│   ├── components/      # UI and feature components
│   ├── data/           # Static data and mock APIs
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   ├── pages/          # Page components
│   └── App.tsx         # Root component
server/
├── routes.ts           # API route definitions
├── storage.ts          # Data storage interface
└── index.ts           # Server entry point
```

## Key Components

### Pages
- `Home` - Landing page with flight search
- `SearchResults` - Displays available flights
- `Itinerary` - Trip details and passenger information
- `Payment` - Payment processing interface
- `Confirmation` - Booking confirmation
- `ETicket` - Electronic ticket display

### Feature Components
- `FlightSearchForm` - Flight search interface
- `TripTypeSelector` - Select between one-way/round-trip
- `BestFlightDeals` - Displays promotional deals
- `SpecialOffers` - Shows special group rates
- `Header` - Navigation and branding
- `Footer` - Site footer with links

## Setup and Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- Express.js Backend
- Drizzle ORM

## Environment Variables

The following environment variables are required:
- `NODE_ENV` - Development/production environment
- `DATABASE_URL` - Database connection string

## API Routes

The server exposes the following API endpoints:
- `GET /api/flights` - Search available flights
- `POST /api/bookings` - Create new booking
- `GET /api/offers` - Get special offers
