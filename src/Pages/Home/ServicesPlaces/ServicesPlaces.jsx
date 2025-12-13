import React from "react";
import coverage from "../../../assets/coverage.png";
const ServicesPlaces = () => {
  return (
    <section className="py-16 bg-base-100">
      {/* Heading */}
      <div className="flex justify-center">
        <div class="card">
          <div class="loader">
            <h2 className="text-4xl font-extrabold text-indigo-600">
              Nationalwise Library Coverage
            </h2>
            <div class="words mt-3">
              <span class="word text-xl md:text-1xl font-bold">"1984"</span>
              <span class="word text-xl md:text-1xl font-bold">"Dhaka"</span>
              <span class="word text-xl md:text-1xl font-bold">
                "Chittagong"
              </span>
              <span class="word text-xl md:text-1xl font-bold">"Sylhet"</span>
              <span class="word text-xl md:text-1xl font-bold">"Khulna"</span>
              <span class="word text-xl md:text-1xl font-bold">"Rangpur"</span>
              <span class="word text-xl md:text-1xl font-bold">"Rajshahi"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mx-auto mt-8">
        {/* Left Image */}
        <div className="w-full">
          <img
            src={coverage}
            alt="Bangladesh Coverage"
            className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
          />
        </div>

        {/* Right Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-xl transition">
            <div className="text-secondary text-4xl mb-3">📍</div>
            <h3 className="font-bold text-xl mb-2">64 Districts Covered</h3>
            <p className="text-gray-600 text-sm">
              Our service reaches every district of Bangladesh so you can borrow
              books no matter where you live.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-xl transition">
            <div className="text-secondary text-4xl mb-3">🚚</div>
            <h3 className="font-bold text-xl mb-2">Doorstep Delivery</h3>
            <p className="text-gray-600 text-sm">
              Pick your favorite books and get them delivered directly to your
              home quickly and safely.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-xl transition">
            <div className="text-secondary text-4xl mb-3">🔄</div>
            <h3 className="font-bold text-xl mb-2">Easy Book Return</h3>
            <p className="text-gray-600 text-sm">
              Returning books is easy — schedule a pickup or drop them at your
              nearest service point.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-xl transition">
            <div className="text-secondary text-4xl mb-3">📦</div>
            <h3 className="font-bold text-xl mb-2">Fast Processing</h3>
            <p className="text-gray-600 text-sm">
              Orders are processed within 24–48 hours so you never have to wait
              long to start reading.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPlaces;
