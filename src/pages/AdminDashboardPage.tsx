import { useNavigate } from 'react-router-dom';
import { AdminDashboard, Booking } from '../components/AdminDashboard';
import { BackgroundImage } from '../components/BackgroundImage';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// Mock data for admin dashboard
const mockBookings: Booking[] = [
  {
    id: '1',
    bookingReference: 'BKXY4F21',
    passengerName: 'John Doe',
    email: 'john.doe@email.com',
    flightNumber: 'SW-101',
    route: 'New York → Los Angeles',
    date: '11/15/2025',
    passengers: 2,
    totalAmount: 683.76,
    status: 'confirmed',
    bookedAt: '2025-10-18T10:30:00Z',
  },
  {
    id: '2',
    bookingReference: 'BK9A2C8E',
    passengerName: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    flightNumber: 'AV-205',
    route: 'New York → Los Angeles',
    date: '11/16/2025',
    passengers: 1,
    totalAmount: 293.88,
    status: 'confirmed',
    bookedAt: '2025-10-19T14:20:00Z',
  },
  {
    id: '3',
    bookingReference: 'BKDF7H3G',
    passengerName: 'Michael Johnson',
    email: 'michael.j@email.com',
    flightNumber: 'CJ-450',
    route: 'New York → Los Angeles',
    date: '11/14/2025',
    passengers: 1,
    totalAmount: 461.88,
    status: 'cancelled',
    bookedAt: '2025-10-17T09:15:00Z',
  },
];

export function AdminDashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to admin login
    navigate('/admin/login');
  };

  const handleCancelBooking = (bookingId: string) => {
    // Handle booking cancellation logic here
    console.log('Cancelling booking:', bookingId);
  };

  return (
    <BackgroundImage>
      <Navbar />
      
      <div className="pt-24 pb-12">
        <AdminDashboard
          bookings={mockBookings}
          onCancelBooking={handleCancelBooking}
          onLogout={handleLogout}
        />
      </div>
      
      <Footer />
    </BackgroundImage>
  );
}
