import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingStepper } from '../components/BookingStepper';
import { PassengerInfo, PassengerDetails } from '../components/PassengerInfo';
import { Payment, PaymentInfo } from '../components/Payment';
import { BookingConfirmation } from '../components/BookingConfirmation';
import { Flight } from '../components/FlightResults';
import { SearchData } from '../components/FlightSearch';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { BackgroundImage } from '../components/BackgroundImage';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { flight, searchData } = location.state as { flight: Flight; searchData: SearchData };
  
  const [currentStep, setCurrentStep] = useState(0);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [bookingReference] = useState(() => 
    'BK' + Math.random().toString(36).substr(2, 8).toUpperCase()
  );

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/results', { state: { searchData } });
    }
  };

  const handlePassengerContinue = (passengerData: PassengerDetails[]) => {
    setPassengers(passengerData);
    toast.success('Passenger information saved! Proceeding to payment...');
    setCurrentStep(1);
  };

  const handlePaymentConfirm = (paymentData: PaymentInfo) => {
    setPaymentInfo(paymentData);
    toast.success('Payment processed successfully! Generating confirmation...');
    setCurrentStep(2);
  };

  const handleNewBooking = () => {
    navigate('/');
  };

  // If no flight or search data, redirect to home
  if (!flight || !searchData) {
    navigate('/');
    return null;
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PassengerInfo
            flight={flight}
            passengerCount={searchData.passengers}
            onContinue={handlePassengerContinue}
            onBack={handleBack}
          />
        );
      case 1:
        return (
          <Payment
            flight={flight}
            passengers={passengers}
            onConfirm={handlePaymentConfirm}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <BookingConfirmation
            bookingReference={bookingReference}
            flight={flight}
            passengers={passengers}
            onNewBooking={handleNewBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <BackgroundImage>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-6">
          <Button variant="outline" onClick={handleBack} className="mb-4 bg-white/90 hover:bg-white shadow-lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <BookingStepper currentStep={currentStep} />
        
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="flex justify-center">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </BackgroundImage>
  );
}
