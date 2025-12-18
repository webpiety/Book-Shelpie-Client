import React, { useEffect, useState } from "react";

const slides = [
  {
    img: "https://i.ibb.co.com/99CjFxMc/cafe-frankfurt-germany.jpg",
    title: "Welcome to Book Selfie",
    subtitle: "Borrow books from libraries across the country.",
    btn: "Explore Books",
    direction: "left",
  },
  {
    img: "https://i.ibb.co.com/nssZ4gfX/young-student-looking-book-library.jpg",
    title: "Discover New Worlds",
    subtitle: "Thousands of readers already love Book Selfie.",
    btn: "Start Reading",
    direction: "top",
  },
  {
    img: "https://i.ibb.co.com/YTNJmC3g/good-books-library.jpg",
    title: "Read More, Pay Less",
    subtitle: "Borrow, return, and enjoy anytime, anywhere.",
    btn: "Browse Collection",
    direction: "right",
  },
];

const HeaderBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getAnimationClass = (direction) => {
    switch (direction) {
      case "left":
        return "animate-fadeInLeft";
      case "right":
        return "animate-fadeInRight";
      case "top":
        return "animate-fadeInDown";
      case "bottom":
        return "animate-fadeInUp";
      default:
        return "animate-fadeInLeft";
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6  h-[400px] md:h-[500px]">
      <div className=" text-center  relative">
        <div
          key={current}
          className={getAnimationClass(slides[current].direction)}
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-primary to-secondary 
            text-transparent bg-clip-text drop-shadow-xl"
          >
            {slides[current].title}
          </h1>
          <p className="inter-font text-lg md:text-xl mb-6 text-base-content/80 max-w-xl">
            {slides[current].subtitle}
          </p>
          <button className="btn btn-lg bg-indigo-600 text-white border-none shadow-xl hover:opacity-90">
            {slides[current].btn}
          </button>
        </div>
      </div>

      <div className=" relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              current === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderBanner;
