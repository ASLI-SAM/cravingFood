import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";
import {} from "swiper";

const Slider = () => {
  const products = useSelector((state) => state.products);

  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    setFruits(products?.filter((data) => data.category === "fruits"));
    console.log(fruits);
  }, [products]);

  return (
    <div className="w-full pt-10 pb-10 ">
      <Swiper
        breakpoints={{
          768: { slidesPerView: 3.5 },
        }}
        slidesPerView={1.5}
        centeredSlides={false}
        spaceBetween={5}
        grabCursor={true}
        className="{mySwiper}"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
