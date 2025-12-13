import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const Recent = () => {
  const axiosSecure = useAxiosSecure();
  const { data: recentBooks = [] } = useQuery({
    queryKey: ["recent"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books?type=recent");
      return res.data;
    },
  });
  console.log(recentBooks);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 mt-16">
      <h2 className="text-4xl font-extrabold text-indigo-600 mb-10 text-center ">
        Recent Collections
      </h2>
      <Swiper
        loop={true}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000, // Time between slides
          disableOnInteraction: false,
          pauseOnMouseEnter: false, // Important to keep autoplay on hover
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {recentBooks.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full aspect-3/4 bg-gray-100 overflow-hidden">
              {/* Image */}
              <img
                src={img.imageLink}
                alt={img.title}
                className="w-full h-full object-cover"
              />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-3 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{img.title}</h3>
                <Link
                  to={`/book-details/${img._id}`}
                  className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md text-sm font-medium transition"
                >
                  Get Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recent;
