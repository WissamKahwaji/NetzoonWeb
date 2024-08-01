import { useTranslation } from "react-i18next";
import TextWithButton from "../../../const/text-with-button/TextWithButton";
import { useGetAdsListQuery } from "../../../../apis/ads/queries";
import LoadingComponent from "../../loading/LoadingComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCountry } from "../../../../context/CountryContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdsCard from "../../advertising/AdsCard";

const AdsContainer = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const {
    data: adsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAdsListQuery(country);

  useEffect(() => {
    refetch();
  }, [refetch, country]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3.5,
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
    <div className="flex flex-col w-full mt-3 justify-start items-start">
      <TextWithButton
        text={t("ads")}
        btnText={t("show_all")}
        onClick={() => {
          navigate("/ads");
        }}
      />
      <div className="w-full mt-2">
        {isError && <div>Error !!!</div>}
        {isLoading && <LoadingComponent />}
        {adsInfo && adsInfo.results && (
          <div className="w-full bg-primary/10 py-8">
            <Slider {...settings}>
              {adsInfo.results.map((item, index) => (
                <div key={index} className="px-2">
                  <AdsCard key={index} adsInfo={item} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsContainer;
