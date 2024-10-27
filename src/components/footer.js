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
    <footer className="px-12 pt-12 pb-8 text-white bg-gray-900" role="contentinfo">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-xl font-bold" role="heading">Danh mục sản phẩm</h2>
            <ul className="space-y-2">
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Dịch vụ đám mây</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Trực tuyến</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Sản phẩm công nghệ</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Phụ kiện</button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold" role="heading">Dịch vụ khách hàng</h2>
            <ul className="space-y-2">
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Dịch vụ trực tuyến</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Chính sách bảo hành</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">FAQs</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Liên hệ trợ giúp</button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold" role="heading">Giới thiệu </h2>
            <ul className="space-y-2">
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Tiểu sử thành viên</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Địa chỉ liên hệ</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Sản phẩm</button>
              </li>
              <li>
                <button className="transition-colors rounded hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">Blog</button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold" role="heading">Liên hệ với chúng tôi</h2>
            <div className="flex mb-4 space-x-4">
              <button
                aria-label="Facebook"
                className="p-2 transition-colors rounded-full hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FaFacebook size={24} />
              </button>
              <button
                aria-label="Twitter"
                className="p-2 transition-colors rounded-full hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FaTwitter size={24} />
              </button>
              <button
                aria-label="Instagram"
                className="p-2 transition-colors rounded-full hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FaInstagram size={24} />
              </button>
              <button
                aria-label="LinkedIn"
                className="p-2 transition-colors rounded-full hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <FaLinkedin size={24} />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold">Bản tin</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Địa chỉ email của bạn"
                  className="w-full px-4 py-2 text-white bg-gray-800 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Email for newsletter"
                />
                <button className="px-4 py-2 transition-colors bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-gray-800">
          <p className="text-gray-400">&copy; 2024 Hệ nhúng N01. All rights reserved.</p>
        </div>
      </div>

      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed p-3 text-white transition-all bg-blue-500 rounded-full shadow-lg bottom-8 right-8 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </footer>
  );
};

export default Footer;