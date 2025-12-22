import React from "react";
import Banner from "../Banner/Banner";
import Brand from "../../../component/Brand/Brand";
import Reviews from "../Reviews/Reviews";

const reviewPromis = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      {" "}
      <Banner />
      <Brand />
      <Reviews reviewPromis={reviewPromis} />
    </div>
  );
};

export default Home;
