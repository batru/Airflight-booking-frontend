import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Flight } from './FlightResults';
import { User } from 'lucide-react';

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  passportNumber: string;
}

interface PassengerInfoProps {
  flight: Flight;
  passengerCount: number;
  onContinue: (passengers: PassengerDetails[]) => void;
  onBack: () => void;
}

export function PassengerInfo({ flight, passengerCount, onContinue, onBack }: PassengerInfoProps) {
  const [passengers, setPassengers] = useState<PassengerDetails[]>(
    Array.from({ length: passengerCount }, (_, index) => ({
      firstName: index === 0 ? 'John' : 'Jane',
      lastName: 'Doe',
      email: index === 0 ? 'john.doe@email.com' : 'jane.doe@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: index === 0 ? '1990-05-15' : '1992-08-20',
      gender: index === 0 ? 'male' : 'female',
      passportNumber: index === 0 ? 'US123456789' : 'US987654321',
    }))
  );

  const updatePassenger = (index: number, field: keyof PassengerDetails, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = () => {
    // Validate all required fields are filled
    const isValid = passengers.every(p => 
      p.firstName && p.lastName && p.email && p.phone && p.dateOfBirth && p.gender
    );
    
    if (isValid) {
      onContinue(passengers);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
          <CardDescription>
            {flight.airline} {flight.flightNumber} • {flight.departure.city} → {flight.arrival.city}
          </CardDescription>
        </CardHeader>
      </Card>

      {passengers.map((passenger, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Passenger {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                <Input
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                <Input
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email *</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={passenger.email}
                  onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phone-${index}`}>Phone Number *</Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dob-${index}`}>Date of Birth *</Label>
                <Input
                  id={`dob-${index}`}
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`gender-${index}`}>Gender *</Label>
                <Select
                  value={passenger.gender}
                  onValueChange={(value) => updatePassenger(index, 'gender', value)}
                >
                  <SelectTrigger id={`gender-${index}`}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`passport-${index}`}>Passport Number (Optional)</Label>
                <Input
                  id={`passport-${index}`}
                  value={passenger.passportNumber}
                  onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Flights
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
