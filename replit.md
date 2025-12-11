# QRTZ AI - Developer Mode

## Overview

QRTZ AI is a technical AI chat assistant application designed with a developer-focused UX. It provides a minimalist chat interface where users can interact with an AI assistant powered by Google's Gemini API. The application follows a modern full-stack architecture with a React frontend and Express backend, emphasizing engineering clarity, fast interaction, and professional technical aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite with React plugin and Replit-specific plugins for development

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints under `/api` prefix
- **AI Integration**: Google Gemini API (`@google/genai`) for chat completions
- **Request Validation**: Zod schemas in shared module for type-safe API contracts

### Project Structure
```
client/           # React frontend application
  src/
    components/ui/  # Shadcn UI components
    pages/          # Route components
    hooks/          # Custom React hooks
    lib/            # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  gemini.ts       # AI integration layer
  storage.ts      # Data storage interface
shared/           # Shared types and schemas
  schema.ts       # Zod schemas for API contracts
```

### Data Flow
1. User sends message through chat interface
2. Frontend makes POST request to `/api/chat` with message and conversation history
3. Backend validates request using Zod schema
4. Gemini API generates response with system prompt defining AI personality
5. Response returned to frontend and displayed in chat

### Storage Pattern
- Uses an interface-based storage abstraction (`IStorage`)
- Default implementation is in-memory (`MemStorage`)
- Prepared for PostgreSQL integration via Drizzle ORM (schema defined but not actively used for chat)

## External Dependencies

### AI Services
- **Google Gemini API**: Primary AI model for chat responses (requires `GEMINI_API_KEY` environment variable)

### Database
- **PostgreSQL**: Configured via Drizzle ORM (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries
- **connect-pg-simple**: PostgreSQL session store (available but not currently used)

### UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Shadcn/ui**: Pre-built component library using Radix primitives
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management
- **Tailwind CSS**: Utility-first CSS framework

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across full stack