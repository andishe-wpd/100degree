# Auth → Dashboard (Next.js + TS + SCSS)

A simple, responsive authentication flow built with Next.js, TypeScript, and SCSS Modules.

## Features

- **Authentication Flow**: Login with Iranian phone number validation
- **Route Protection**: Protected dashboard route with automatic redirects
- **Reusable Components**: Custom Input and Button components with forwardRef
- **Form Validation**: Schema-based validation using Zod
- **Persistent State**: User data stored in localStorage
- **Responsive Design**: Mobile-friendly UI with SCSS Modules
- **Type Safety**: Full TypeScript support with strict mode

## Routes

- `/auth` - Login form with phone validation
- `/dashboard` - Protected welcome page (requires authentication)

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **SCSS Modules** (component-scoped styling)
- **Zod** (schema validation)
- **Random User API** (for demo user data)

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Development

```bash
# Run linting
npm run lint

# Type checking
npm run type-check
```

## Project Structure

```
app/
  auth/
    page.tsx              # Login page
    Auth.module.scss      # Auth page styles
  dashboard/
    page.tsx              # Dashboard page
    Dashboard.module.scss # Dashboard styles
  layout.tsx              # Root layout with AuthProvider
  globals.scss            # Global styles
components/
  ui/
    Button/               # Reusable Button component
    Input/                # Reusable Input component
lib/
  validation/
    auth.schema.ts        # Zod validation schemas
  types/
    randomUser.ts         # API type definitions
  auth/
    useAuth.tsx           # Auth context and hooks
  storage/
    local.ts              # localStorage helpers
```

## Usage

1. **Login**: Enter a valid Iranian phone number (format: 09XXXXXXXXX)
2. **Validation**: Form validates phone number format and length
3. **API Call**: Fetches random user data from Random User API
4. **Redirect**: Automatically redirects to dashboard after successful login
5. **Persistence**: User data persists across page refreshes
6. **Logout**: Click logout button to clear session and return to auth page

## Validation Rules

- Phone number must be exactly 11 digits
- Must start with "09"
- Format: 09XXXXXXXXX

## API Integration

The app fetches user data from the Random User API:

- Endpoint: `https://randomuser.me/api/?results=1&nat=us`
- Maps response to internal User type
- Handles network errors gracefully

## Styling

- **SCSS Modules**: Component-scoped styles with nesting
- **Responsive**: Mobile-first design with breakpoints
- **Modern UI**: Clean, gradient backgrounds and card layouts
- **Accessibility**: Proper ARIA labels and semantic HTML

## Type Safety

- Strict TypeScript configuration
- Proper type definitions for all components
- Zod schema inference for form types
- API response type safety

## Testing

The app includes comprehensive manual testing scenarios:

- ✅ Happy path: Valid phone → Login → Dashboard
- ✅ Validation: Invalid phone formats
- ✅ Network errors: Offline scenarios
- ✅ Persistence: Page refresh behavior
- ✅ Route protection: Unauthorized access
- ✅ Mobile responsiveness: Small screen layouts
