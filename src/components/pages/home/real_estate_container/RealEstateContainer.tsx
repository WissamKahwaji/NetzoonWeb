import { useTranslation } from "react-i18next";
import { useGetRealEstateListQuery } from "../../../../apis/real_estate/queries";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextWithButton from "../../../const/text-with-button/TextWithButton";
import LoadingComponent from "../../loading/LoadingComponent";
import { useCountry } from "../../../../context/CountryContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RealEstateContainer = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const {
    data: realEstateInfo,
    isError,
    isLoading,
    refetch,
  } = useGetRealEstateListQuery(country);
  useEffect(() => {
    refetch();
  }, [refetch, country]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      realEstateInfo && realEstateInfo.length < 6.5
        ? realEstateInfo.length
        : 6.5,

    slidesToScroll: 6.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            realEstateInfo && realEstateInfo.length < 6.5
              ? realEstateInfo.length
              : 6.5,

          slidesToScroll: 6.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            realEstateInfo && realEstateInfo.length < 4.5
              ? realEstateInfo.length
              : 4.5,

          slidesToScroll: 4.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            realEstateInfo && realEstateInfo.length < 3.5
              ? realEstateInfo.length
              : 4.5,

          slidesToScroll: 4.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            realEstateInfo && realEstateInfo.length < 2.5
              ? realEstateInfo.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
    ],
  };
  return (
    <>
      <div className="flex  flex-col w-full mt-3 justify-start items-start md:hidden ">
        <TextWithButton
          text={t("real_estate")}
          btnText={t("show_all")}
          onClick={() => {
            navigate(`/real-estate`);
          }}
        />
        {isError && <div className="text-red-500">Error !!!</div>}
        {isLoading && <LoadingComponent />}
        {realEstateInfo && (
          <div className="w-full bg-primary/10 py-8 mt-2">
            <Slider {...settings}>
              {realEstateInfo.map((item, index) => (
                <div key={index} className="px-2 ">
                  <div
                    className="relative w-[150px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/real-estate/${item._id}`);
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                      <p className="text-sm font-semibold">{item.title}</p>
                    </div>
                    <img
                      src={item.imageUrl}
                      crossOrigin="anonymous"
                      alt={`card image`}
                      className="w-full h-full object-center rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      <div className="md:flex  flex-col w-full mt-3 justify-start items-start hidden ">
        <TextWithButton
          text={t("real_estate")}
          btnText={t("show_all")}
          onClick={() => {
            navigate(`/real-estate`);
          }}
        />
        {isError && <div className="text-red-500">Error !!!</div>}
        {isLoading && <LoadingComponent />}
        {realEstateInfo && (
          <div className="w-full bg-primary/10 py-8 mt-2">
            {realEstateInfo.length > 6 ? (
              <Slider {...settings}>
                {realEstateInfo.map((item, index) => (
                  <div key={index} className="px-2 ">
                    <div
                      className="relative w-[150px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => {
                        navigate(`/real-estate/${item._id}`);
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                        <p className="text-sm font-semibold">{item.title}</p>
                      </div>
                      <img
                        src={item.imageUrl}
                        crossOrigin="anonymous"
                        alt={`card image`}
                        className="w-full h-full object-center rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="flex flex-row justify-start items-center gap-x-10">
                {realEstateInfo.map((item, index) => (
                  <div key={index} className="px-2 ">
                    <div
                      className="relative w-[150px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => {
                        navigate(`/real-estate/${item._id}`);
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                        <p className="text-sm font-semibold">{item.title}</p>
                      </div>
                      <img
                        src={item.imageUrl}
                        crossOrigin="anonymous"
                        alt={`card image`}
                        className="w-full h-full object-center rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RealEstateContainer;
