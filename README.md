# 🚀 DashStack - Modern Admin Dashboard

A comprehensive, modern admin dashboard built with Next.js, React, TypeScript, and Tailwind CSS. DashStack provides a complete solution for managing users, products, orders, analytics, and more with a beautiful, responsive interface.

![DashStack Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=DashStack+-+Modern+Admin+Dashboard)

## ✨ Features

### 🎯 Core Dashboard Features

- **Analytics & Reports** - Comprehensive analytics with beautiful charts and detailed reports
- **User Management** - Advanced user management with roles, permissions, and team collaboration
- **E-commerce Ready** - Complete e-commerce features with product management and orders
- **Task Management** - Todo system with drag-and-drop functionality using dnd-kit
- **Calendar Integration** - Event management and calendar view
- **Invoice System** - Complete invoicing with modals and PDF generation ready
- **Contact Management** - Advanced contact system with search, filters, and pagination

### 🔐 Authentication & Security

- **Modern Login/Register** - Beautiful authentication forms with validation
- **Guest Access** - Explore the dashboard without registration
- **Logout Functionality** - Multiple logout options (sidebar, profile menu)
- **Profile Management** - Complete user profile with editable information
- **Settings Panel** - Comprehensive settings for notifications, security, appearance, and more

### 🎨 UI/UX Excellence

- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark/Light Mode** - System theme detection with manual toggle
- **Modern Components** - Custom UI components with Tailwind CSS
- **Loading States** - Smooth loading indicators and progress bars
- **Error Handling** - Comprehensive error states and fallbacks
- **Accessibility** - WCAG compliant components and navigation

### 🌐 Internationalization

- **Multi-language Support** - Georgian locale with timezone support
- **Date/Time Formatting** - Localized date and time displays
- **Currency Support** - Multiple currency formats

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui inspiration
- **Icons**: Lucide React + React Icons
- **Animations**: Framer Motion
- **Drag & Drop**: dnd-kit
- **State Management**: Redux Toolkit
- **Development**: Turbopack for fast development

## 📁 Project Structure

```
admin-dashboard-app/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Admin layout group
│   │   ├── layout.tsx           # Admin layout with navigation
│   │   ├── page.tsx             # Landing page
│   │   ├── main/                # Core dashboard pages
│   │   │   ├── dashboard/       # Main dashboard
│   │   │   ├── products/        # Product management
│   │   │   ├── order/           # Order management
│   │   │   └── inbox/           # Message system
│   │   ├── pages/               # Additional pages
│   │   │   ├── calendar/        # Calendar view
│   │   │   ├── contact/         # Contact management
│   │   │   ├── invoice/         # Invoice system
│   │   │   ├── pricing/         # Pricing plans
│   │   │   ├── team/            # Team management
│   │   │   ├── todo/            # Task management
│   │   │   └── ui-elements/     # UI showcase
│   │   └── account/             # User account
│   │       ├── profile/         # User profile
│   │       └── settings/        # Account settings
│   └── (authorization)/         # Auth layout group
│       ├── layout.tsx           # Clean auth layout
│       ├── login/               # Login page
│       └── register/            # Registration page
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   ├── calendar/                # Calendar components
│   ├── contact/                 # Contact management
│   ├── dashboard/               # Dashboard widgets
│   ├── general/                 # Shared components
│   │   ├── UI/                  # Base UI components
│   │   ├── nav/                 # Navigation components
│   │   └── header.tsx           # Header component
│   ├── inbox/                   # Message system
│   ├── invoice/                 # Invoice components
│   ├── landing/                 # Landing page components
│   ├── order/                   # Order management
│   ├── pricing/                 # Pricing components
│   ├── products/                # Product components
│   ├── profile/                 # Profile components
│   ├── settings/                # Settings components
│   ├── team/                    # Team management
│   ├── todo/                    # Todo components
│   └── ui-elements/             # UI element demos
├── lib/                         # Utilities and configuration
│   ├── dummy-database.tsx       # Mock data (centralized)
│   ├── types/                   # TypeScript definitions
│   ├── functions/               # Utility functions
│   ├── store/                   # Redux store
│   └── hooks/                   # Custom React hooks
└── public/                      # Static assets
    └── svg/                     # SVG icons
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/GeoStrong/admin-dashboard.git
   cd admin-dashboard-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Key Pages & Features

### 🏠 Landing Page (`/`)

- Modern hero section with full-width design
- Feature showcase with analytics, user management, and e-commerce
- Statistics cards and call-to-action sections
- Guest access with "Explore the App" option

### 📈 Dashboard (`/main/dashboard`)

- Real-time analytics and charts
- Key performance indicators (KPIs)
- Recent activity feed
- Quick action buttons

### 👤 Profile Management (`/account/profile`)

- Complete user profile for Giorgi Jobava (Frontend Developer)
- Profile stats: tasks completed, active projects, team members, experience
- Achievements showcase with dates and descriptions
- Activity feed with recent actions
- Skills display with modern frontend technologies
- Edit modal for profile information

### ⚙️ Settings (`/account/settings`)

- **Profile Settings**: Personal information, contact details
- **Notifications**: Email, push, SMS, and system notifications
- **Security**: Two-factor auth, session management, password settings
- **Appearance**: Theme, language (Georgian), timezone (Asia/Tbilisi)
- **Privacy**: Profile visibility, activity tracking
- **Billing**: Subscription and payment information

### 🛍️ E-commerce Features

- **Products**: Grid/list view, search, filters, favorites
- **Orders**: Order management with calendar view and filters
- **Invoice**: Invoice generation with modals and detailed views

### 📅 Productivity Tools

- **Calendar**: Event management with different event types
- **Todo**: Drag-and-drop task management with priorities
- **Contacts**: Advanced contact management with search and pagination
- **Team**: Team member management with add/edit functionality

### 💬 Communication

- **Inbox**: Message system with compose, audio messages, and threading
- **Notifications**: Real-time notification system

## 🎨 Customization

### Theme Configuration

The project uses Tailwind CSS with custom theme configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
    },
  },
};
```

### Adding New Components

1. Create component in appropriate directory under `components/`
2. Add types to `lib/types/types.ts`
3. Add mock data to `lib/dummy-database.tsx`
4. Create page in `app/` directory
5. Update navigation in `lib/dummy-database.tsx`

## 🧪 Mock Data

All mock data is centralized in `lib/dummy-database.tsx` including:

- User profiles and settings
- Products and orders
- Calendar events
- Todo tasks
- Team members
- Messages and notifications
- Analytics data

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
WELCOME_MESSAGE="Welcome to DashStack"
```

### User Profile (Giorgi Jobava)

The dashboard includes a complete profile for Giorgi Jobava with:

- **Contact**: giorgi.jobava@gmail.com, +995 599 00 00 00
- **Location**: Tbilisi, Georgia (Asia/Tbilisi timezone)
- **Role**: Frontend Developer in Engineering department
- **Skills**: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js, etc.
- **Achievements**: React mastery, UI/UX excellence, code quality, performance optimization
- **Language**: Georgian locale support

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

Fully responsive design tested on:

- iOS Safari
- Android Chrome
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Giorgi Jobava**

- Frontend Developer
- Email: giorgi.jobava03@gmail.com
- Location: Tbilisi, Georgia

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- All open source contributors

---

Built with ❤️ by Giorgi Jobava using modern web technologies.
