import { motion } from "framer-motion";
import { ShieldCheck, Timer, MapPin, BookOpen, Truck } from "lucide-react";

const ChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
      title: "Trusted & Reliable",
      desc: "We ensure every book is handled safely and delivered with professional care.",
    },
    {
      icon: <Timer className="w-8 h-8 text-purple-600" />,
      title: "Lightning Fast Service",
      desc: "Borrow a book and get it delivered faster than traditional library systems.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Nationwide Coverage",
      desc: "From Dhaka to remote towns — our service reaches every corner of Bangladesh.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: "Huge Book Collection",
      desc: "Choose from thousands of fiction, non-fiction, academic and best-seller titles.",
    },
    {
      icon: <Truck className="w-8 h-8 text-purple-600" />,
      title: "Doorstep Delivery",
      desc: "Sit back and relax — your book arrives right at your home or office.",
    },
  ];

  return (
    <section className="py-20 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* IMAGE LEFT SIDE */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <img
            src="https://i.ibb.co/1nZLhVy/choose-us-banner.png"
            alt="Why Choose BookCourier"
            className="rounded-3xl shadow-2xl w-full h-[450px] object-cover border border-purple-200"
          />
        </motion.div>

        {/* FEATURES RIGHT SIDE */}
        <div className="space-y-6">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-purple-700"
          >
            Why Choose <span className="text-indigo-600">BookCourier</span>?
          </motion.h2>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-xl"
          >
            We are not just a library — we are a reading experience. Fast,
            reliable, and designed to make book-borrowing easier than ever
            before.
          </motion.p>

          {/* Feature Cards */}
          <div className="space-y-5">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 bg-white/60 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 p-3 bg-purple-100 rounded-xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
