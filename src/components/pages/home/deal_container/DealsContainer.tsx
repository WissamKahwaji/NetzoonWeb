import { useTranslation } from "react-i18next";
import TextWithButton from "../../../const/text-with-button/TextWithButton";
import { useGetAllDealsItemsQuery } from "../../../../apis/deals/queries";
import LoadingComponent from "../../loading/LoadingComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCountry } from "../../../../context/CountryContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DealCard from "../../deals/DealCard";

const DealsContainer = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const {
    data: dealsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAllDealsItemsQuery(country);

  useEffect(() => {
    refetch();
  }, [refetch, country]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    initialSlide: 0,

    slidesToScroll: 3.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,

          slidesToScroll: 3.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,

          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,

          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,

          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col w-full mt-3 justify-start items-start font-header">
      <TextWithButton
        text={t("deals")}
        btnText={t("show_all")}
        onClick={() => {
          navigate("/deals");
        }}
      />
      {isError && <div>Error !!!</div>}
      {isLoading && <LoadingComponent />}
      <div className="w-full bg-primary/10 py-8 mt-2">
        <Slider {...settings}>
          {dealsInfo &&
            dealsInfo.map((item, index) => (
              <div key={index} className="px-2">
                <DealCard item={item} />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default DealsContainer;
