import React from "react";
import { useLoaderData } from "react-router";

const RecentBooks = () => {
  const booksCollections = useLoaderData();
  console.log(booksCollections);
  const firstBook = booksCollections[0];
  const secondBook = booksCollections[1];
  const thirdBook = booksCollections[2];
  const fourthBook = booksCollections[3];
  const fifthBook = booksCollections[4];
  const sixthBook = booksCollections[5];

  return (
    <div className="mt-1 md:mt-18">
      <div className="flex justify-center">
        <div class="card">
          <div class="loader">
            <p className="text-xl md:text-4xl md:font-extrabold text-purple-700 font-bold">
              Latest Collections
            </p>
            <div class="words mt-2">
              <span class="word text-xl md:text-3xl font-bold">"1984"</span>
              <span class="word text-xl md:text-3xl font-bold">
                "To Kill a Mockingbird"
              </span>
              <span class="word text-xl md:text-3xl font-bold">
                "The Great Gatsby"
              </span>
              <span class="word text-xl md:text-3xl font-bold">
                "Crime and Punishment"
              </span>
              <span class="word text-xl md:text-3xl font-bold">
                "Pride and Prejudice"
              </span>
              <span class="word text-xl md:text-3xl font-bold">
                "The Count of Monte Cristo"
              </span>
              <span class="word text-xl md:text-3xl font-bold">
                "Pride and Prejudice"
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-4 max-w-5xl gap-2 h-[1100px] mx-auto mt-4 md:mt-2">
        {/* Card 1 */}
        <div className="row-span-2 shadow-lg overflow-hidden relative group">
          <img src={firstBook.image} alt="" className="w-full h-full" />

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>

          {/* Text & Button */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
              {firstBook.title}
            </h3>
            <p className="text-gray-200 text-sm mt-1">
              A man secretly rebels against a surveillance-controlled regime
              seeking truth and freedom.
            </p>
            <button className="mt-3 px-4 py-2 bg-white text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-linear-to-r from-[#522ba7] to-[#04AC47]">
              Explore More
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="row-span-1 shadow-lg overflow-hidden relative group">
          <img src={secondBook.image} alt="" className="w-full h-full" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
              {secondBook.title}
            </h3>
            <p className="text-gray-200 text-sm mt-1">
              A man secretly rebels against a surveillance-controlled regime
              seeking truth and freedom.
            </p>
            <button className="mt-3 px-4 py-2 bg-white text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-linear-to-r from-[#522ba7] to-[#04AC47]">
              Explore More
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="row-span-1 shadow-lg overflow-hidden relative group">
          <img src={thirdBook.image} alt="" className="w-full h-full" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
              {thirdBook.title}
            </h3>
            <p className="text-gray-200 text-sm mt-1">
              A man secretly rebels against a surveillance-controlled regime
              seeking truth and freedom.
            </p>
            <button className="mt-3 px-4 py-2 bg-white text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-linear-to-r from-[#522ba7] to-[#04AC47]">
              Explore More
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="row-span-1 shadow-lg overflow-hidden relative group">
          <img src={fourthBook.image} alt="" className="w-full h-full" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
              {fourthBook.title}
            </h3>
            <p className="text-gray-200 text-sm mt-1">
              A man secretly rebels against a surveillance-controlled regime
              seeking truth and freedom.
            </p>
            <button className="mt-3 px-4 py-2 bg-white text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-linear-to-r from-[#522ba7] to-[#04AC47]">
              Explore More
            </button>
          </div>
        </div>

        {/* Card 5 */}
        <div className="row-span-2 shadow-lg overflow-hidden relative group">
          <img src={fifthBook.image} alt="" className="w-full h-full" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
              {fifthBook.title}
            </h3>
            <p className="text-gray-200 text-sm mt-1">
              A man secretly rebels against a surveillance-controlled regime
              seeking truth and freedom.
            </p>
            <button className="mt-3 px-4 py-2 bg-white text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-linear-to-r from-[#522ba7] to-[#04AC47]">
              Explore More
            </button>
          </div>
        </div>

        {/* Card 6 */}
        <div className="row-span-1 shadow-lg overflow-hidden relative group">
          <img src={sixthBook.image} alt="" className="w-full h-full" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">
              {sixthBook.title}
            </h3>
            <p className="text-gray-200 text-sm mt-1">
              A man secretly rebels against a surveillance-controlled regime
              seeking truth and freedom.
            </p>
            <button className="mt-3 px-4 py-2 bg-white text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-linear-to-r from-[#522ba7] to-[#04AC47]">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBooks;
