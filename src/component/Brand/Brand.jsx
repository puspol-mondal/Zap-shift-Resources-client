import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
// import "./styles.css";

const brand_1 = "../../../src/assets/brands/amazon.png";
const brand_2 = "../../../src/assets/brands/amazon_vector.png";
const brand_3 = "../../../src/assets/brands/casio.png";
const brand_4 = "../../../src/assets/brands/moonstar.png";
const brand_5 = "../../../src/assets/brands/star.png";
const brand_6 = "../../../src/assets/brands/start_people.png";
const brands = [brand_1, brand_2, brand_3, brand_4, brand_5, brand_6];

const Brand = () => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {brands.map((b) => (
          <SwiperSlide>
            <img src={b} alt="" />
          </SwiperSlide>
        ))}{" "}
      </Swiper>
    </>
  );
};

export default Brand;
