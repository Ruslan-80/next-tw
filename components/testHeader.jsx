"use client";

import { useState } from "react";

export default function TestHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-semibold tracking-wide">
          SENSE
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-10 text-white text-sm">
          <a href="#" className="hover:opacity-70 transition">
            Work
          </a>
          <a href="#" className="hover:opacity-70 transition">
            Studio
          </a>
          <a href="#" className="hover:opacity-70 transition">
            Services
          </a>
          <a href="#" className="hover:opacity-70 transition">
            Contact
          </a>
        </nav>

        {/* Burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          <div className="space-y-1">
            <span className="block w-6 h-[2px] bg-white"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 text-white text-lg">
          <a href="#">Work</a>
          <a href="#">Studio</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  );
}
