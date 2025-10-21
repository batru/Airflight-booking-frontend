import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Flight } from './FlightResults';
import { PassengerDetails } from './PassengerInfo';
import { CreditCard, Lock, Shield, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentProps {
  flight: Flight;
  passengers: PassengerDetails[];
  onConfirm: (paymentInfo: PaymentInfo) => void;
  onBack: () => void;
}

export interface PaymentInfo {
  paymentMethod: 'card' | 'mpesa';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  mpesaPhone?: string;
}

export function Payment({ flight, passengers, onConfirm, onBack }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');

  const totalPrice = flight.price * passengers.length;
  const taxes = totalPrice * 0.12;
  const serviceFee = 15;
  const grandTotal = totalPrice + taxes + serviceFee;

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error('Please fill in all card details');
        return;
      }
      onConfirm({ paymentMethod: 'card', cardNumber, cardName, expiryDate, cvv });
    } else if (paymentMethod === 'mpesa') {
      if (!mpesaPhone) {
        toast.error('Please enter your M-Pesa phone number');
        return;
      }
      onConfirm({ paymentMethod: 'mpesa', mpesaPhone });
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you'd like to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'mpesa')}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-100/50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <div>Credit / Debit Card</div>
                      <div className="text-sm text-gray-500">Pay with Visa, Mastercard, or Amex</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-100/50 transition-colors">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <div>M-Pesa</div>
                      <div className="text-sm text-gray-500">Pay with mobile money</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {paymentMethod === 'card' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Card Information
                </CardTitle>
                <CardDescription>Enter your card details securely</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name *</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date *</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      maxLength={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === 'mpesa' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  M-Pesa Payment
                </CardTitle>
                <CardDescription>Enter your M-Pesa phone number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mpesaPhone">M-Pesa Phone Number *</Label>
                  <Input
                    id="mpesaPhone"
                    placeholder="+254 712 345 678"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    type="tel"
                  />
                  <p className="text-sm text-gray-500">
                    You will receive a payment prompt on your phone
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-sm mb-2">How to complete payment:</h4>
                  <ol className="text-sm text-gray-500 space-y-1 list-decimal list-inside">
                    <li>Enter your M-Pesa registered phone number</li>
                    <li>Click "Pay Now" button below</li>
                    <li>Check your phone for the M-Pesa prompt</li>
                    <li>Enter your M-Pesa PIN to confirm payment</li>
                  </ol>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
                  <Shield className="h-4 w-4" />
                  <span>M-Pesa payments are secure and instant</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Flight</div>
                <div>{flight.airline} {flight.flightNumber}</div>
                <div className="text-sm">{flight.departure.city} → {flight.arrival.city}</div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-gray-500">Passengers</div>
                {passengers.map((p, i) => (
                  <div key={i} className="text-sm">
                    {i + 1}. {p.firstName} {p.lastName}
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
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
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={handlePayment} className="w-full" size="lg">
              <Lock className="mr-2 h-4 w-4" />
              Pay ${grandTotal.toFixed(2)}
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
