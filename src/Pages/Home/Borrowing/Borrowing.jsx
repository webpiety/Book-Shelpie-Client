import { BookOpen, Handshake, CreditCard, Truck, Undo } from "lucide-react";
import { motion } from "framer-motion";

const Borrowing = () => {
  const steps = [
    {
      icon: <BookOpen className="w-10 h-10 text-purple-600" />,
      title: "1. Choose Your Book",
      desc: "Browse thousands of books from our library collection and select the one you want to borrow.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-purple-600" />,
      title: "2. Place Borrow Request",
      desc: "Submit a borrow request with your delivery address. No hassle, no long forms.",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-purple-600" />,
      title: "3. Pay Service Charge",
      desc: "Complete the small service charge payment online or Cash on Delivery (COD).",
    },
    {
      icon: <Truck className="w-10 h-10 text-purple-600" />,
      title: "4. Get Book Delivered",
      desc: "We deliver books anywhere in Bangladesh through our fast courier network.",
    },
    {
      icon: <Undo className="w-10 h-10 text-purple-600" />,
      title: "5. Read & Return",
      desc: "Enjoy reading! After finishing, return the book easily through our courier partner.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-6">
          How Borrowing Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Borrowing books from BookCourier is super easy! Just follow these
          simple steps and enjoy reading from anywhere in Bangladesh.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Borrowing;
