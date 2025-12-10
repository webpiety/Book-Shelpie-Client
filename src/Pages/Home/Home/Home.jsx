import React from "react";
import RecentBooks from "../RecentBooks/RecentBooks";
import Coverage from "../Coverage/Coverage";
import HeaderBanner from "../../../Components/HeaderBanner";

const Home = () => {
  return (
    <div className="mt-8 md:mt-24">
      <div className="mt-24">
        <HeaderBanner></HeaderBanner>
      </div>
      <RecentBooks></RecentBooks>
      <Coverage></Coverage>
    </div>
  );
};

export default Home;
