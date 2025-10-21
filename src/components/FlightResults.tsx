import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plane, Clock, Calendar } from 'lucide-react';
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
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Available Flights</CardTitle>
          <CardDescription>
            {searchData.origin} → {searchData.destination} • {format(searchData.departureDate, 'PPP')} • {searchData.passengers} passenger(s)
          </CardDescription>
        </CardHeader>
      </Card>

      {flights.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No flights found for your search criteria.
          </CardContent>
        </Card>
      ) : (
        flights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{flight.airline}</Badge>
                    <span className="text-sm text-gray-500">{flight.flightNumber}</span>
                    <Badge variant={flight.cabin === 'business' ? 'default' : 'secondary'}>
                      {flight.cabin === 'business' ? 'Business' : 'Economy'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <div>
                      <div className="text-2xl">{flight.departure.time}</div>
                      <div>{flight.departure.airport}</div>
                      <div className="text-sm text-gray-500">{flight.departure.city}</div>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <div className="text-sm">{flight.duration}</div>
                      <div className="h-px w-24 bg-gray-200" />
                      <div className="text-xs">
                        {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl">{flight.arrival.time}</div>
                      <div>{flight.arrival.airport}</div>
                      <div className="text-sm text-gray-500">{flight.arrival.city}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    {flight.availableSeats} seats available
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end border-l border-gray-200 pl-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Price per person</div>
                    <div className="text-3xl">${flight.price}</div>
                  </div>
                  <Button onClick={() => onSelectFlight(flight)} size="lg">
                    Select Flight
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
