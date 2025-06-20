import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const banners = [
    "./banner1.jpg",
    "./banner2.jpg",
    "./banner3.jpg",
  ];

  return (
    <div style={{ marginTop: '0rem' }}>
      <Slider {...settings}>
        {banners.map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt={`Banner ${i}`}
              style={{
  width: "100%",
  height: "600px",
  objectFit: "cover",
 objectPosition: "center top"
}}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
