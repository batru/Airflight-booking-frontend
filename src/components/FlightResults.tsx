import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';
import { SearchData } from './FlightSearch';
import { format } from 'date-fns';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    city: string;
  };
  arrival: {
    airport: string;
    time: string;
    city: string;
  };
  duration: string;
  price: number;
  stops: number;
  availableSeats: number;
  cabin: 'economy' | 'business';
}

interface FlightResultsProps {
  searchData: SearchData;
  flights: Flight[];
  onSelectFlight: (flight: Flight) => void;
}

export function FlightResults({ searchData, flights, onSelectFlight }: FlightResultsProps) {
  return (
    <div className="w-full space-y-2 mt-6">
      <Card>
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-base ">Available Flights</CardTitle>
          <CardDescription className="text-sm">
            {searchData.origin} → {searchData.destination} •{' '}
            {format(searchData.departureDate, 'PPP')} • {searchData.passengers} passenger(s)
          </CardDescription>
        </CardHeader>
      </Card>

      {flights.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500 text-sm">
            No flights found for your search criteria.
          </CardContent>
        </Card>
      ) : (
        flights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Badge variant="outline" className="text-xs px-2 py-0.5">{flight.airline}</Badge>
                    <span>{flight.flightNumber}</span>
                    <Badge variant={flight.cabin === 'business' ? 'default' : 'secondary'} className="text-xs px-2 py-0.5">
                      {flight.cabin === 'business' ? 'Business' : 'Economy'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-sm">
                    <div className="space-y-0.5">
                      <div className="text-lg font-medium">{flight.departure.time}</div>
                      <div className="text-xs">{flight.departure.airport}</div>
                      <div className="text-xs text-gray-500">{flight.departure.city}</div>
                    </div>

                    <div className="flex flex-col items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mb-1" />
                      <div>{flight.duration}</div>
                      <div className="h-px w-12 bg-gray-300 my-1" />
                      <div>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}</div>
                    </div>

                    <div className="text-right space-y-0.5">
                      <div className="text-lg font-medium">{flight.arrival.time}</div>
                      <div className="text-xs">{flight.arrival.airport}</div>
                      <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    {flight.availableSeats} seat(s) available
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end border-l border-gray-200 pl-3 ml-2 text-right">

                  <div className="text-sm text-gray-600">From</div>
                  <div className="text-xl font-semibold">${flight.price}</div>
                  <Button onClick={() => onSelectFlight(flight)} size="sm" className="mt-2">
                    Select
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
