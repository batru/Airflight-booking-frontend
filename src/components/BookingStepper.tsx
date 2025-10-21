import { Check } from 'lucide-react';
import { cn } from './ui/utils';

interface BookingStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: 'Passenger Details' },
  { id: 2, title: 'Payment' },
  { id: 3, title: 'Confirmation' },
];

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center justify-center">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-lg',
                  currentStep > index
                    ? 'bg-white border-white text-blue-600 shadow-xl'
                    : currentStep === index
                    ? 'bg-white border-white text-blue-600 shadow-xl ring-4 ring-white/50'
                    : 'bg-white/20 border-white/40 text-white/60 backdrop-blur-sm'
                )}
              >
                {currentStep > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
            </div>

            {/* Step Content */}
            <div className="ml-6 min-w-0 flex-1">
              <div
                className={cn(
                  'text-sm font-semibold',
                  currentStep >= index ? 'text-white drop-shadow-lg' : 'text-white/70'
                )}
              >
                {step.title}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-4 rounded-full transition-all duration-300',
                  currentStep > index ? 'bg-white shadow-lg' : 'bg-white/30'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
