import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/logo.png"
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 1, name: "Trang chủ", href: "#" },
    { id: 2, name: "Giới thiệu", href: "#" },
    { id: 3, name: "Dịch vụ", href: "#" },
    { id: 4, name: "Liên hệ", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <img
              className="w-auto h-16"
              src={Logo}
              alt="Logo"
              aria-label="Company Logo"
            />
          </div>

          <nav className="hidden space-x-8 md:flex">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                aria-label={item.name}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="items-center hidden space-x-4 md:flex">
            <button
              className="px-4 py-2 text-white transition-all duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Login"
            >
              <span className="flex items-center">
                <FaUserCircle className="mr-2" />
                Login
              </span>
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiX className="block w-6 h-6" />
              ) : (
                <HiMenu className="block w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="block w-full px-3 py-2 text-base font-medium text-left text-gray-600 transition-colors duration-200 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                aria-label={item.name}
              >
                {item.name}
              </button>
            ))}
            <button
              className="w-full px-4 py-2 mt-4 text-white transition-all duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Login"
            >
              <span className="flex items-center justify-center">
                <FaUserCircle className="mr-2" />
                Login
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;