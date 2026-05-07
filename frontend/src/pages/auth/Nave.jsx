import React, { useState } from "react";

function Nave() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">MyBrand</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li className="hover:text-indigo-600 cursor-pointer">Home</li>
          <li className="hover:text-indigo-600 cursor-pointer">About</li>

          {/* Services Dropdown */}
          <li className="relative group">
            <button className="hover:text-indigo-600">Services ▾</button>

            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-3 w-56">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
                  Web Development
                </li>
                <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
                  App Development
                </li>
                <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
                  UI/UX Design
                </li>
                <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
                  SEO Optimization
                </li>
              </ul>
            </div>
          </li>

          <li className="hover:text-indigo-600 cursor-pointer">Portfolio</li>
          <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
        </ul>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4">
          <ul className="space-y-3">
            <li>Home</li>
            <li>About</li>
            <li>
              <details>
                <summary className="cursor-pointer">Services</summary>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>Web Development</li>
                  <li>App Development</li>
                  <li>UI/UX Design</li>
                  <li>SEO Optimization</li>
                </ul>
              </details>
            </li>
            <li>Portfolio</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nave;
