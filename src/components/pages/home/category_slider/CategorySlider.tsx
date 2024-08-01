import TextWithButton from "../../../const/text-with-button/TextWithButton";
import { useTranslation } from "react-i18next";
import { categories, USER_TYPE } from "../../../../constants";
import ImageWithTextCard from "../../../const/ImageWithTextCard/ImageWithTextCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const settings = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    rtl: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClick = (userType: string) => {
    if (userType === USER_TYPE.FACTORY) {
      navigate("/categories/facroties-categories");
    } else {
      navigate(`/categories/${userType}`);
    }
  };
  return (
    <div className="w-full font-header md:mt-3">
      <TextWithButton
        text={t("categories")}
        btnText={t("show_all")}
        onClick={() => {
          navigate("/categories");
        }}
      />
      <div className="mt-3">
        <Slider {...settings}>
          {categories &&
            categories.map((item, index) => (
              <div
                key={index}
                className="px-2"
                onClick={() => {
                  handleOnClick(item.type);
                }}
              >
                <ImageWithTextCard text={t(item.name)} imageUrl={item.url} />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider;
