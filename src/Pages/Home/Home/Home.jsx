import React from "react";
import RecentBooks from "../RecentBooks/RecentBooks";
import Coverage from "../Coverage/Coverage";
import HeaderBanner from "../../../Components/HeaderBanner";
import ServicesPlaces from "../ServicesPlaces/ServicesPlaces";
import ChooseUs from "../ChooseUs/ChooseUs";
import BookCourier from "../BookCourier/BookCourier";
import Borrowing from "../Borrowing/Borrowing";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div className="mt-8 md:mt-24">
      <div className="mt-24">
        <HeaderBanner></HeaderBanner>
      </div>
      <RecentBooks></RecentBooks>
      <div>
        <ServicesPlaces></ServicesPlaces>
      </div>

      <div>
        <BookCourier></BookCourier>
      </div>
      <div>
        <ChooseUs></ChooseUs>
      </div>
      <div>
        <Borrowing></Borrowing>
      </div>
      <div>
        <Reviews></Reviews>
      </div>
    </div>
  );
};

export default Home;
