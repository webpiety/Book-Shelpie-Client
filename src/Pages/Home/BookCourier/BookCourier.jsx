import { motion } from "framer-motion";

const BookCourier = () => {
  return (
    <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Borrow Your Favorite Books <br />
            From <span className="text-yellow-300">BookCourier</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl">
            Order books from anywhere in Bangladesh and get them delivered right
            to your doorstep. Read, enjoy, and return with ease.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-xl hover:bg-yellow-400 transition">
              Browse Books
            </button>
            <button className="px-6 py-3 border border-white font-semibold rounded-xl hover:bg-white hover:text-purple-700 transition">
              How It Works
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <img
            src="https://i.ibb.co/CVn0QLT/book-reading-cover.png"
            alt="Book Courier Banner"
            className="rounded-3xl shadow-2xl w-full h-[450px] object-cover border border-white/20"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BookCourier;
