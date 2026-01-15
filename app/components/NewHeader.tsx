"use client"
import React,{ useEffect, useState } from "react";

export default function NewHeader() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // scroll down → header hide
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      }
      // scroll up → header show
      else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white border-b border-gray-200 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main content */}
        <div className="p-4">Main Content</div>

        {/* Sticky Nav */}
        <nav className="sticky top-0 bg-white border-t border-gray-200">
          <ul className="flex gap-6 p-4">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
