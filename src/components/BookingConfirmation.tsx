import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Flight } from './FlightResults';
import { PassengerDetails } from './PassengerInfo';
import { CheckCircle, Download, Mail, Plane } from 'lucide-react';

interface BookingConfirmationProps {
  bookingReference: string;
  flight: Flight;
  passengers: PassengerDetails[];
  onNewBooking: () => void;
}

export function BookingConfirmation({ bookingReference, flight, passengers, onNewBooking }: BookingConfirmationProps) {
  const totalPrice = flight.price * passengers.length;
  const taxes = totalPrice * 0.12;
  const serviceFee = 15;
  const grandTotal = totalPrice + taxes + serviceFee;

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="border-2 border-green-500">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2>Booking Confirmed!</h2>
              <p className="text-gray-500 mt-2">
                Your flight has been successfully booked
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Booking Reference:</span>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                {bookingReference}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Airline</div>
              <div>{flight.airline}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Flight Number</div>
              <div>{flight.flightNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Departure</div>
              <div>{flight.departure.city} ({flight.departure.airport})</div>
              <div className="text-sm">{flight.departure.time}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Arrival</div>
              <div>{flight.arrival.city} ({flight.arrival.airport})</div>
              <div className="text-sm">{flight.arrival.time}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {passengers.map((passenger, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                <div>
                  <div>{passenger.firstName} {passenger.lastName}</div>
                  <div className="text-sm text-gray-500">{passenger.email}</div>
                </div>
                <Badge variant="outline">Passenger {index + 1}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Ticket Price ({passengers.length}x ${flight.price})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes & Fees</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Total Paid</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Ticket
        </Button>
        <Button variant="outline" className="flex-1">
          <Mail className="mr-2 h-4 w-4" />
          Email Ticket
        </Button>
        <Button onClick={onNewBooking} className="flex-1">
          Book Another Flight
        </Button>
      </div>

      <Card className="bg-gray-100">
        <CardContent className="pt-6">
          <p className="text-sm text-center text-gray-500">
            A confirmation email has been sent to {passengers[0].email}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
