import React from 'react';
import { Plane } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6" />
              <div className="text-lg font-medium">SkyBooker</div>
            </div>
            <p className="text-sm text-slate-400">
              Airline Trade Association | ATA | was aviation user of all up to HaebagkyongIn good
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-base font-medium">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">
                BookAir
              </a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">
                About Us
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-base font-medium">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              © 2025 SkyBooker. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

