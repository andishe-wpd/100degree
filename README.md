# Auth → Dashboard (Next.js + TS + SCSS)

A modern, responsive authentication flow built with Next.js, TypeScript, and SCSS Modules. Features a beautiful dark UI with smooth animations and comprehensive form validation.

## ✨ Features

- **🔐 Authentication Flow**: Login with Iranian phone number validation
- **🛡️ Route Protection**: Protected dashboard route with automatic redirects
- **🎨 Modern Dark UI**: Glassmorphism design with smooth transitions
- **📱 Responsive Design**: Mobile-first approach with perfect mobile experience
- **✅ Form Validation**: Real-time validation with Zod schema
- **💾 Persistent State**: User data stored in localStorage
- **♿ Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Live Demo

[View Live Demo](https://your-app.vercel.app)

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **SCSS Modules** (component-scoped styling)
- **Zod** (schema validation)
- **Random User API** (for demo user data)

## 📦 Installation

### Prerequisites

- Node.js ≥ 18.18.0
- npm/yarn/pnpm

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/auth-to-dashboard.git
cd auth-to-dashboard

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Fork/Clone** this repository
2. **Connect** to [Vercel](https://vercel.com)
3. **Import** the repository
4. **Deploy** with default settings

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

### Environment Variables

Set these in your Vercel dashboard:

```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://randomuser.me/api
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to any platform
npm run start
```

## 📱 Usage

### Authentication Flow

1. **Enter Phone Number**: Use format `09123456789`
2. **Real-time Validation**: See instant feedback on format
3. **API Integration**: Fetches random user data
4. **Automatic Redirect**: Goes to dashboard on success
5. **Persistent Login**: Stays logged in on page refresh

### Validation Rules

- ✅ Exactly 11 digits
- ✅ Must start with "09"
- ✅ Only numeric characters allowed
- ✅ Real-time format checking

## 🎨 UI Components

### Enhanced Input Component
- **Character Filtering**: Auto-removes non-digits
- **Visual Feedback**: Color-coded validation states
- **Character Counter**: Real-time length display
- **Helpful Messages**: Contextual guidance

### Modern Button Component
- **Loading States**: Animated spinners
- **Hover Effects**: Smooth transitions
- **Variants**: Primary and secondary styles
- **Accessibility**: Full keyboard support

## 🔧 Project Structure

```
auth-to-dashboard/
├── app/                    # Next.js App Router
│   ├── auth/              # Login page
│   ├── dashboard/         # Protected dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.scss       # Global styles
├── components/
│   └── ui/               # Reusable components
│       ├── Button/       # Button component
│       └── Input/        # Enhanced input component
├── lib/
│   ├── auth/             # Authentication logic
│   ├── validation/       # Zod schemas
│   ├── storage/          # localStorage helpers
│   └── types/            # TypeScript types
├── vercel.json           # Vercel configuration
└── next.config.ts        # Next.js configuration
```

## 🧪 Testing

### Manual Test Scenarios

- ✅ **Happy Path**: Valid phone → Login → Dashboard
- ✅ **Validation**: Invalid formats show appropriate errors
- ✅ **Network Errors**: Graceful error handling
- ✅ **Persistence**: Page refresh maintains login state
- ✅ **Route Protection**: Unauthorized access redirects
- ✅ **Mobile Responsive**: Perfect on all screen sizes

### Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🔒 Security

- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Secure form handling
- **Input Sanitization**: Automatic character filtering
- **Route Protection**: Client-side authentication guards

## 📈 Performance

- **Bundle Optimization**: Tree shaking and code splitting
- **Image Optimization**: WebP/AVIF formats
- **CSS Optimization**: Purged unused styles
- **Caching**: Efficient static asset caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [Vercel](https://vercel.com) for hosting
- [Random User API](https://randomuser.me) for demo data
- [Zod](https://zod.dev) for validation

---

**Made with ❤️ using Next.js, TypeScript, and SCSS**
