import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Reviews = () => {
  const reviews = [
    {
      name: "Arif Hossen",
      avatar: "https://i.ibb.co/X2hq9LH/user1.jpg",
      rating: 5,
      text: "BookCourier has completely changed how I read books! Fast delivery and very professional service. I love how easy it is to borrow and return.",
    },
    {
      name: "Maria Rahman",
      avatar: "https://i.ibb.co/nwZ5wr9/user2.jpg",
      rating: 5,
      text: "Amazing collection of books. The courier service is smooth and the process is super simple. Highly recommended for book lovers!",
    },
    {
      name: "Shakib Hasan",
      avatar: "https://i.ibb.co/Dzk2Sdj/user3.jpg",
      rating: 4,
      text: "Great experience! Delivery was fast and the book quality was perfect. Borrowing books has never been this easy before.",
    },
  ];

  return (
    <section className="py-20 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-indigo-600 mb-6">
          What Our Readers Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Thousands of readers across Bangladesh trust BookCourier to deliver
          quality books right to their doorstep.
        </p>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 mb-4"
                />
              </div>

              <h3 className="text-xl font-semibold">{review.name}</h3>

              {/* Rating Stars */}
              <div className="flex justify-center my-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
