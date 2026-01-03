// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f3f0e8] px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          <ul className="space-y-1">
            <li><a href="#">For Pre School</a></li>
            <li><a href="#">For Kindergarten</a></li>
            <li><a href="#">For School</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press & Media</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Account</h3>
          <ul className="space-y-1">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Update Pro</a></li>
            <li><a href="#">Subscription</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            <li><a href="#">FAQ's</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <ul className="space-y-1">
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Extras</h3>
          <ul className="space-y-1">
            <li><a href="#">Find a Shop</a></li>
            <li><a href="#">Offer Insights</a></li>
            <li><a href="#">Get Our App</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 border-t pt-6 text-xs text-center text-gray-500">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="space-x-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
          <div>
            Design by <span className="font-medium">Ryllic Studio</span>
          </div>
        </div>
        <div className="mt-2">© EduKids Inc. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
