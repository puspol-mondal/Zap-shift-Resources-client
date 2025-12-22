import { use } from "react";
import ReviewCard from "./ReviewCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = ({ reviewPromis }) => {
  const review = use(reviewPromis);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="mySwiper"
    >
      {review.map((r) => (
        <SwiperSlide>
          <ReviewCard r={r} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Reviews;
