import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4" role="heading">Shop Categories</h2>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Clothing</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Electronics</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Home Goods</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Accessories</button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4" role="heading">Customer Service</h2>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Shipping Info</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Returns Policy</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">FAQs</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Contact Support</button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4" role="heading">About Us</h2>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Our Story</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Careers</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Press</button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Blog</button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4" role="heading">Connect With Us</h2>
            <div className="flex space-x-4 mb-4">
              <button
                aria-label="Facebook"
                className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2"
              >
                <FaFacebook size={24} />
              </button>
              <button
                aria-label="Twitter"
                className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2"
              >
                <FaTwitter size={24} />
              </button>
              <button
                aria-label="Instagram"
                className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2"
              >
                <FaInstagram size={24} />
              </button>
              <button
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-2"
              >
                <FaLinkedin size={24} />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  aria-label="Email for newsletter"
                />
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Your E-Commerce. All rights reserved.</p>
        </div>
      </div>

      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </footer>
  );
};

export default Footer;