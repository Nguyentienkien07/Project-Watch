import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src={
              "https://mauweb.monamedia.net/luxshopping/wp-content/uploads/2018/11/banner11.jpg"
            }
            alt=""
            width="100%"
            height="auto"
          />
        </div>
        <div>
          <img
            src={
              "https://mauweb.monamedia.net/luxshopping/wp-content/uploads/2018/11/banner2.jpg"
            }
            alt=""
            width="100%"
            height="auto"
          />
        </div>
        <div>
          <img
            src={
              "https://mauweb.monamedia.net/luxshopping/wp-content/uploads/2018/11/banner3.jpg"
            }
            alt=""
            width="100%"
            height="auto"
          />
        </div>
      </Slider>
    </div>
  );
}

export default SliderComponent;
