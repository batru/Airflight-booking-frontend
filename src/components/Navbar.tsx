import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Plane, User } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-slate-900" />
              <div>
                <div className="text-xl font-semibold">SkyBooker</div>
                <div className="text-xs text-gray-500">Airline Association</div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm hover:text-slate-900 transition-colors">Flights</a>
            <a href="#" className="text-sm text-gray-500 hover:text-slate-900 transition-colors">Contact Us</a>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/login')}>
            <User className="mr-2 h-4 w-4" />
            ADMIN LOGIN
          </Button>
        </div>
      </div>
    </nav>
  );
}

