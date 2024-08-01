import { useTranslation } from "react-i18next";
import TextWithButton from "../../../const/text-with-button/TextWithButton";
import { useGetNewsListQuery } from "../../../../apis/news/queries";
import LoadingComponent from "../../loading/LoadingComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useCountry } from "../../../../context/CountryContext";
import { useNavigate } from "react-router-dom";

const NewsContainer = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const {
    data: newsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetNewsListQuery(country);

  useEffect(() => {
    refetch();
  }, [refetch, country]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: false,
    centerMode: true,
    centerPadding: "17%",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,

          slidesToScroll: 2,
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
    <>
      <div className="flex  flex-col w-full mt-3 justify-start items-start md:hidden ">
        <TextWithButton
          text={t("news")}
          btnText={t("show_all")}
          onClick={() => {
            navigate(`/news`);
          }}
        />
        {isError && <div className="text-red-500">Error !!!</div>}
        {isLoading && <LoadingComponent />}
        {newsInfo && (
          <div className="w-full bg-primary/10 py-8 mt-2">
            <Slider {...settings}>
              {newsInfo.map((item, index) => (
                <div key={index} className="px-2 py-12">
                  <div
                    className="cursor-pointer relative w-full md:w-[400px] h-[210px] rounded-lg shadow-lg border border-primary flex flex-col justify-start items-start bg-white transition-transform transform hover:scale-105 duration-300"
                    onClick={() => navigate(`/news/${item._id}`)}
                  >
                    <img
                      src={item.imgUrl}
                      crossOrigin="anonymous"
                      alt={`card image`}
                      className="w-full h-[60%] object-cover rounded-t-lg"
                    />
                    <div className="p-2 w-full h-[40%] flex flex-col justify-between bg-primary/10">
                      <p className="text-sm font-semibold font-body text-center">
                        {item.title}
                      </p>
                      <p className="text-xs overflow-hidden overflow-ellipsis whitespace-pre-wrap line-clamp-2 text-start">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      <div className="md:flex  flex-col w-full mt-3 justify-start items-start hidden ">
        <TextWithButton
          text={t("news")}
          btnText={t("show_all")}
          onClick={() => {
            navigate(`/news`);
          }}
        />
        {isError && <div className="text-red-500">Error !!!</div>}
        {isLoading && <LoadingComponent />}
        {newsInfo && (
          <div className="w-full bg-primary/10 py-8 mt-2">
            {newsInfo.length > 6 ? (
              <Slider {...settings}>
                {newsInfo.map((item, index) => (
                  <div key={index} className="px-2 py-12">
                    <div
                      className="cursor-pointer relative w-full md:w-[400px] h-[210px] rounded-lg shadow-lg border border-primary flex flex-col justify-start items-start bg-white transition-transform transform hover:scale-105 duration-300"
                      onClick={() => navigate(`/news/${item._id}`)}
                    >
                      <img
                        src={item.imgUrl}
                        crossOrigin="anonymous"
                        alt={`card image`}
                        className="w-full h-[60%] object-cover rounded-t-lg"
                      />
                      <div className="p-2 w-full h-[40%] flex flex-col justify-between bg-primary/10">
                        <p className="text-sm font-semibold font-body text-center">
                          {item.title}
                        </p>
                        <p className="text-xs overflow-hidden overflow-ellipsis whitespace-pre-wrap line-clamp-2 text-start">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="flex flex-row justify-start items-center gap-x-10">
                {newsInfo.map((item, index) => (
                  <div key={index} className="px-2 py-12">
                    <div
                      className="cursor-pointer relative w-full md:w-[400px] h-[210px] rounded-lg shadow-lg border border-primary flex flex-col justify-start items-start bg-white transition-transform transform hover:scale-105 duration-300"
                      onClick={() => navigate(`/news/${item._id}`)}
                    >
                      <img
                        src={item.imgUrl}
                        crossOrigin="anonymous"
                        alt={`card image`}
                        className="w-full h-[60%] object-cover rounded-t-lg"
                      />
                      <div className="p-2 w-full h-[40%] flex flex-col justify-between bg-primary/10">
                        <p className="text-sm font-semibold font-body text-center">
                          {item.title}
                        </p>
                        <p className="text-xs overflow-hidden overflow-ellipsis whitespace-pre-wrap line-clamp-2 text-start">
                          {item.description}
                        </p>
                      </div>
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

export default NewsContainer;
