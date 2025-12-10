import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">Book Shelpie</h2>
          <p className="mt-3 text-sm text-gray-400">
            Borrow your favorite books from anywhere in Bangladesh. Fast,
            simple, and reliable.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-red-500 transition"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Browse Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Coverage
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@bookcourier.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} BookCourier — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
