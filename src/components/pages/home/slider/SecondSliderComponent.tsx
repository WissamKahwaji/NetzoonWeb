/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSliderInfoQuery } from "../../../../apis/sliders/queries";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SecondSliderComponent = () => {
  const { data: sliderInfo } = useGetSliderInfoQuery();

  const [currectSlider, setCurrectSlider] = useState<number>();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    rtl: false,
    afterChange: (index: number) => {
      setCurrectSlider(index);
    },
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            margin: "0",
            padding: "0",
            listStyle: "none",
            display: "flex",
          }}
        >
          {dots.map((_dot: any, index: number) => (
            <li
              key={index}
              style={{
                width: "8px",
                height: "4px",
                background:
                  index === currectSlider
                    ? "rgba(87, 118, 165, 1)"
                    : "rgba(30, 30, 29, 0.5)",
                borderRadius: "2px",

                marginLeft: index === 0 ? "0" : "5px",
              }}
            />
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <div className="w-full px-0">
      {sliderInfo &&
        sliderInfo.mainSliderWeb &&
        sliderInfo.mainSliderWeb.length > 0 && (
          // <div className="md:flex md:flex-col  md:w-full md:h-full  mb-12 w-full min-w-full">
          <Slider {...settings}>
            {sliderInfo &&
              sliderInfo.mainSliderWeb?.map((image, index) => (
                <div key={index} className="w-full h-full   ">
                  <img
                    src={image}
                    alt={`Cropped ${index}`}
                    className="w-full h-full   object-cover lg:object-cover"
                  />
                </div>
              ))}
          </Slider>
          // </div>
        )}
    </div>
  );
};

export default SecondSliderComponent;
