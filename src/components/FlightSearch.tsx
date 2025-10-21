import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, ArrowLeftRight, Plane } from 'lucide-react';
import { format } from 'date-fns';

interface FlightSearchProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');

  const handleSearch = () => {
    if (origin && destination && departureDate) {
      onSearch({
        origin,
        destination,
        departureDate,
        returnDate: tripType === 'round-trip' ? returnDate : undefined,
        passengers,
        tripType,
      });
    }
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-6 w-6" />
          Book Your Flight
        </CardTitle>
        <CardDescription>Search for flights to your destination</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Button
              variant={tripType === 'round-trip' ? 'default' : 'outline'}
              onClick={() => setTripType('round-trip')}
            >
              Round Trip
            </Button>
            <Button
              variant={tripType === 'one-way' ? 'default' : 'outline'}
              onClick={() => setTripType('one-way')}
            >
              One Way
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="origin">From</Label>
              <Input
                id="origin"
                placeholder="Origin City or Airport"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={swapLocations}
              className="mb-1"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="destination">To</Label>
              <Input
                id="destination"
                placeholder="Destination City or Airport"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {tripType === 'round-trip' && (
              <div className="space-y-2">
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < (departureDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                max="9"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full" size="lg">
            Search Flights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
