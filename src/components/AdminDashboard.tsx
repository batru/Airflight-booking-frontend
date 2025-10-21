import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { DollarSign, Users, XCircle, TrendingUp, LogOut, Plane } from 'lucide-react';

export interface Booking {
  id: string;
  bookingReference: string;
  passengerName: string;
  email: string;
  flightNumber: string;
  route: string;
  date: string;
  passengers: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled';
  bookedAt: string;
}

interface AdminDashboardProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ bookings, onCancelBooking, onLogout }: AdminDashboardProps) {
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPassengers = confirmedBookings.reduce((sum, b) => sum + b.passengers, 0);

  return (
    <div className="min-h-screen bg-gray-100/30">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            <h1>Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Bookings</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{bookings.length}</div>
              <p className="text-xs text-gray-500">
                {confirmedBookings.length} confirmed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-500">
                From confirmed bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Passengers</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{totalPassengers}</div>
              <p className="text-xs text-gray-500">
                Active passengers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Cancellations</CardTitle>
              <XCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{cancelledBookings.length}</div>
              <p className="text-xs text-gray-500">
                {((cancelledBookings.length / bookings.length) * 100).toFixed(1)}% cancel rate
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <BookingsTable bookings={bookings} onCancelBooking={onCancelBooking} />
          </TabsContent>

          <TabsContent value="confirmed">
            <BookingsTable bookings={confirmedBookings} onCancelBooking={onCancelBooking} />
          </TabsContent>

          <TabsContent value="cancelled">
            <BookingsTable bookings={cancelledBookings} onCancelBooking={onCancelBooking} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BookingsTable({ bookings, onCancelBooking }: { bookings: Booking[]; onCancelBooking: (id: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
        <CardDescription>View and manage flight bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Flight</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-mono">{booking.bookingReference}</div>
                  </TableCell>
                  <TableCell>
                    <div>{booking.passengerName}</div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                  </TableCell>
                  <TableCell>{booking.flightNumber}</TableCell>
                  <TableCell>{booking.route}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>${booking.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.status === 'confirmed' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="!bg-red-600 !text-white hover:!bg-red-700 border-red-600"
                            style={{ backgroundColor: '#dc2626', color: 'white' }}
                          >
                            Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel booking {booking.bookingReference}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No, keep it</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onCancelBooking(booking.id)}>
                              Yes, cancel booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
