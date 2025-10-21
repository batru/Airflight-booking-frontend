import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FlightResults, Flight } from '../components/FlightResults';
import { FlightFilter, FilterOptions } from '../components/FlightFilter';
import { SearchData } from '../components/FlightSearch';
import { BackgroundImage } from '../components/BackgroundImage';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { ArrowLeft, Filter } from 'lucide-react';

// Mock flight data
const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'SkyWings',
    flightNumber: 'SW-101',
    departure: { airport: 'JFK', time: '08:00 AM', city: 'New York' },
    arrival: { airport: 'LAX', time: '11:30 AM', city: 'Los Angeles' },
    duration: '5h 30m',
    price: 299,
    stops: 0,
    availableSeats: 45,
    cabin: 'economy',
  },
  {
    id: '2',
    airline: 'AirVoyage',
    flightNumber: 'AV-205',
    departure: { airport: 'JFK', time: '10:15 AM', city: 'New York' },
    arrival: { airport: 'LAX', time: '02:00 PM', city: 'Los Angeles' },
    duration: '5h 45m',
    price: 249,
    stops: 1,
    availableSeats: 28,
    cabin: 'economy',
  },
  {
    id: '3',
    airline: 'CloudJet',
    flightNumber: 'CJ-450',
    departure: { airport: 'JFK', time: '02:30 PM', city: 'New York' },
    arrival: { airport: 'LAX', time: '06:15 PM', city: 'Los Angeles' },
    duration: '5h 45m',
    price: 399,
    stops: 0,
    availableSeats: 12,
    cabin: 'business',
  },
  {
    id: '4',
    airline: 'SkyWings',
    flightNumber: 'SW-202',
    departure: { airport: 'JFK', time: '04:00 PM', city: 'New York' },
    arrival: { airport: 'LAX', time: '07:30 PM', city: 'Los Angeles' },
    duration: '5h 30m',
    price: 599,
    stops: 0,
    availableSeats: 8,
    cabin: 'business',
  },
  {
    id: '5',
    airline: 'AirVoyage',
    flightNumber: 'AV-310',
    departure: { airport: 'JFK', time: '06:30 PM', city: 'New York' },
    arrival: { airport: 'LAX', time: '11:45 PM', city: 'Los Angeles' },
    duration: '5h 15m',
    price: 199,
    stops: 2,
    availableSeats: 35,
    cabin: 'economy',
  },
];

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchData = location.state?.searchData as SearchData;

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    airlines: [],
    stops: [],
    cabin: 'economy'
  });

  // Get unique airlines from mock data
  const availableAirlines = useMemo(() => {
    return Array.from(new Set(mockFlights.map(flight => flight.airline)));
  }, []);

  // Filter flights based on current filters
  const filteredFlights = useMemo(() => {
    return mockFlights.filter(flight => {
      // Filter by airlines
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false;
      }

      // Filter by stops
      if (filters.stops.length > 0) {
        const flightStops = flight.stops === 0 ? '0' : flight.stops === 1 ? '1' : '2+';
        if (!filters.stops.includes(flightStops)) {
          return false;
        }
      }

      // Filter by cabin class
      if (filters.cabin && flight.cabin !== filters.cabin) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleSelectFlight = (flight: Flight) => {
    // Navigate to booking page with flight and search data
    navigate('/booking', { state: { flight, searchData } });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // If no search data, redirect to home
  if (!searchData) {
    navigate('/');
    return null;
  }

  return (
    <BackgroundImage>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {/* <Button variant="outline" onClick={handleBack} className="bg-white/90 hover:bg-white shadow-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button> */}
            
            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-white/90 hover:bg-white shadow-lg">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FlightFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    availableAirlines={availableAirlines}
                    resultCount={filteredFlights.length}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* <div className="flex flex-col lg:flex-row gap-6"> */}
        <div className="flex flex-row gap-3 max-w-7xl mx-auto mt-10">

          {/* Results */}
          <div className="flex-1">
            <FlightResults
              searchData={searchData}
              flights={filteredFlights}
              onSelectFlight={handleSelectFlight}
            />
          </div>
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FlightFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              availableAirlines={availableAirlines}
              resultCount={filteredFlights.length}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </BackgroundImage>
  );
}
