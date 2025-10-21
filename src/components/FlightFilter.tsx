import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { X } from 'lucide-react';

export interface FilterOptions {
  airlines: string[];
  stops: string[];
  cabin: string;
}

interface FlightFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  availableAirlines: string[];
  resultCount: number;
}

export function FlightFilter({ filters, onFilterChange, availableAirlines, resultCount }: FlightFilterProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleAirlineChange = (airline: string, checked: boolean) => {
    const newAirlines = checked
      ? [...localFilters.airlines, airline]
      : localFilters.airlines.filter(a => a !== airline);
    
    const newFilters = { ...localFilters, airlines: newAirlines };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStopChange = (stop: string, checked: boolean) => {
    const newStops = checked
      ? [...localFilters.stops, stop]
      : localFilters.stops.filter(s => s !== stop);
    
    const newFilters = { ...localFilters, stops: newStops };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCabinChange = (cabin: string) => {
    const newFilters = { ...localFilters, cabin };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      airlines: [],
      stops: [],
      cabin: 'economy'
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = 
    localFilters.airlines.length > 0 || 
    localFilters.stops.length > 0 || 
    localFilters.cabin !== 'economy';

  return (
    <Card className="h-fit sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Filters</CardTitle>
            <CardDescription className="text-sm">
              {resultCount} flight{resultCount !== 1 ? 's' : ''}
            </CardDescription>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700 h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {/* Airlines Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Airlines</Label>
          <div className="space-y-2">
            {availableAirlines.map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  id={`airline-${airline}`}
                  checked={localFilters.airlines.includes(airline)}
                  onCheckedChange={(checked) => 
                    handleAirlineChange(airline, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`airline-${airline}`}
                  className="text-xs font-normal cursor-pointer"
                >
                  {airline}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-3" />

        {/* Stops Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Stops</Label>
          <div className="space-y-2">
            {[
              { value: '0', label: 'Non-stop' },
              { value: '1', label: '1 stop' },
              { value: '2+', label: '2+ stops' }
            ].map((stop) => (
              <div key={stop.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`stop-${stop.value}`}
                  checked={localFilters.stops.includes(stop.value)}
                  onCheckedChange={(checked) => 
                    handleStopChange(stop.value, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`stop-${stop.value}`}
                  className="text-xs font-normal cursor-pointer"
                >
                  {stop.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-3" />

        {/* Cabin Class Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Cabin Class</Label>
          <RadioGroup
            value={localFilters.cabin}
            onValueChange={handleCabinChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="economy" id="economy" />
              <Label htmlFor="economy" className="text-xs font-normal cursor-pointer">
                Economy
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business" className="text-xs font-normal cursor-pointer">
                Business
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
