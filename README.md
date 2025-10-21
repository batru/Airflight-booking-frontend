# Airline Ticket Booking UI - Multi-Page Application

This is a fully functional multi-page airline ticket booking application built with React and React Router.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3001/` (or the port shown in terminal)

## 📱 Application Flow

### Customer Booking Flow

1. **Home Page (`/`)** - Landing page with search form
   - Pre-filled with dummy data for easy testing
   - Click "Search" to proceed to results

2. **Results Page (`/results`)** - Flight search results
   - Shows 3 mock flights with different airlines and prices
   - Click "Select Flight" on any flight to proceed to booking

3. **Booking Page (`/booking`)** - Multi-step booking process
   - **Step 1: Passenger Details** - Pre-filled with dummy passenger data
   - **Step 2: Payment** - Pre-filled with dummy payment data (card or M-Pesa)
   - **Step 3: Confirmation** - Booking confirmation with reference number

### Admin Flow

1. **Admin Login (`/admin/login`)**
   - Username: `admin`
   - Password: `admin123`
   - Click "Sign In" to access dashboard

2. **Admin Dashboard (`/admin/dashboard`)**
   - View all bookings with mock data
   - Cancel bookings functionality
   - Logout to return to login

## 🎯 Testing Features

### Pre-filled Data for Easy Testing

- **Search Form**: Pre-filled with "New York" → "Los Angeles" route
- **Passenger Info**: Pre-filled with John Doe and Jane Doe details
- **Payment**: Pre-filled with test card number `4111 1111 1111 1111`
- **Admin Login**: Use `admin` / `admin123` credentials

### Navigation Features

- **Back Buttons**: Navigate back through the flow
- **Stepper UI**: Visual progress indicator in booking process
- **Toast Notifications**: Success/error messages for user feedback
- **URL Routing**: Each page has its own URL for direct access

## 🛠️ Technical Features

- **React Router**: Multi-page navigation with proper routing
- **State Management**: Data passed between pages via router state
- **Responsive Design**: Works on desktop and mobile devices
- **UI Components**: Built with shadcn/ui components
- **TypeScript**: Full type safety throughout the application

## 📁 Project Structure

```
src/
├── pages/           # Page components with routing logic
│   ├── HomePage.tsx
│   ├── ResultsPage.tsx
│   ├── BookingPage.tsx
│   ├── AdminLoginPage.tsx
│   └── AdminDashboardPage.tsx
├── components/      # Reusable UI components
│   ├── BookingStepper.tsx
│   ├── LandingPage.tsx
│   ├── FlightResults.tsx
│   ├── PassengerInfo.tsx
│   ├── Payment.tsx
│   ├── BookingConfirmation.tsx
│   ├── AdminLogin.tsx
│   └── AdminDashboard.tsx
└── App.tsx         # Main app with router setup
```

## 🎨 UI Features

- **Modern Design**: Clean, professional airline booking interface
- **Stepper Component**: Visual progress indicator for multi-step forms
- **Toast Notifications**: User feedback for actions
- **Responsive Layout**: Adapts to different screen sizes
- **Loading States**: Smooth transitions between pages

## 🔧 Development

The application is built with:
- **React 18** with TypeScript
- **React Router DOM** for navigation
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Lucide React** for icons
- **Sonner** for toast notifications

All components are fully functional with dummy data, making it easy to test the complete user flow without a backend.