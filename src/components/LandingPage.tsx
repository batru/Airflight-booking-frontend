import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CalendarIcon, ArrowLeftRight, Plane, MapPin, Users, User } from 'lucide-react';
import { format } from 'date-fns';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface SearchData {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
}

interface LandingPageProps {
  onSearch: (searchData: SearchData) => void;
}

const trendingDestinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1659003505996-d5d7ca66bb25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGNpdHlzY2FwZSUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MDk1MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 450,
  },
  {
    id: 2,
    city: 'Maldives',
    country: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1660632990091-1a23285d33c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzYwOTUwMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 890,
  },
  {
    id: 3,
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1643904736472-8b77e93ca3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBidXJqJTIwa2hhbGlmYXxlbnwxfHx8fDE3NjA5NTAyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 620,
  },
  {
    id: 4,
    city: 'Cairo',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1704640728496-bb1756181fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWlybyUyMGVneXB0JTIwbGFuZG1hcmtzfGVufDF8fHx8MTc2MDk1MDI2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 520,
  },
];

export function LandingPage({ onSearch }: LandingPageProps) {
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [origin, setOrigin] = useState('New York');
  const [destination, setDestination] = useState('Los Angeles');
  const [departureDate, setDepartureDate] = useState<Date>(new Date('2025-11-15'));
  const [returnDate, setReturnDate] = useState<Date>(new Date('2025-11-22'));
  const [passengers, setPassengers] = useState(1);

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
    <div>
      <Navbar />

      {/* Hero Section with Search */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Search Form */}
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center pt-20">
          <Card className="w-full max-w-4xl shadow-2xl">
            <CardContent className="p-6">
              {/* Trip Type Tabs */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={tripType === 'round-trip' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTripType('round-trip')}
                    className="text-sm"
                  >
                    Round trip
                  </Button>
                  <Button
                    variant={tripType === 'one-way' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTripType('one-way')}
                    className="text-sm"
                  >
                    One Way
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm"
                  >
                    Multi-city
                  </Button>
                </div>
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr] gap-3 items-end mb-4">
                {/* Origin */}
                <div className="relative">
                  <Label className="text-xs text-gray-500 mb-1">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Departure"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="pl-10 bg-gray-50 border-0"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={swapLocations}
                  className="mb-0.5"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>

                {/* Destination */}
                <div className="relative">
                  <Label className="text-xs text-gray-500 mb-1">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10 bg-gray-50 border-0"
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Depart on Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-gray-50 border-0"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, 'MMM dd, yyyy') : 'Select date'}
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

                {/* Passengers */}
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Traveler</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-gray-50 border-0"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        {passengers} {passengers === 1 ? 'traveler' : 'travelers'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64" align="end">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Passengers</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{passengers}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPassengers(Math.min(9, passengers + 1))}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} className="w-full" size="lg">
                Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2 text-xl font-medium">Trending Destinations</h2>
              <p className="text-gray-500">Book the best for your next reservation</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                ‹
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                ›
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDestinations.map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 hover:bg-primary">
                      ${destination.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-1 text-lg font-medium">{destination.city}</h3>
                  <p className="text-sm text-gray-500">{destination.country}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
