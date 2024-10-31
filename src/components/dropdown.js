import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FaHome, FaUser, FaCog, FaEnvelope, FaSignOutAlt, FaBook, FaBriefcase, FaQuestionCircle } from "react-icons/fa";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      id: 2,
      label: "Profile",
      icon: <FaUser className="w-5 h-5" />,
      submenu: [
        { id: "2-1", label: "View Profile", icon: <FaUser className="w-4 h-4" /> },
        { id: "2-2", label: "Edit Profile", icon: <FaCog className="w-4 h-4" /> },
      ],
    },
    {
      id: 3,
      label: "Services",
      icon: <FaBriefcase className="w-5 h-5" />,
      submenu: [
        { id: "3-1", label: "Consulting", icon: <FaBook className="w-4 h-4" /> },
        { id: "3-2", label: "Support", icon: <FaQuestionCircle className="w-4 h-4" /> },
      ],
    },
    {
      id: 4,
      label: "Messages",
      icon: <FaEnvelope className="w-5 h-5" />,
    },
    {
      id: 5,
      label: "Logout",
      icon: <FaSignOutAlt className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuClick = (itemId) => {
    setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
  };

  return (
    <div
      className="relative w-full md:w-64"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full px-4 py-3 text-gray-800 transition-all duration-300 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="font-medium">Menu</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div
          className="absolute z-50 w-full py-2 mt-2 bg-white rounded-lg shadow-xl animate-slideDown"
          role="menu"
          aria-orientation="vertical"
        >
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                role="menuitem"
                onClick={() => item.submenu && handleSubmenuClick(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="flex-grow text-left">{item.label}</span>
                {item.submenu && (
                  <FiChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${activeSubmenu === item.id ? "transform rotate-90" : ""}`}
                  />
                )}
              </button>

              {item.submenu && activeSubmenu === item.id && (
                <div className="pl-4 bg-gray-50">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                      role="menuitem"
                    >
                      <span className="mr-3">{subItem.icon}</span>
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
