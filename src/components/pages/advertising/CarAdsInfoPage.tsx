import { AdsModel } from "../../../apis/ads/type";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../../context/CountryContext";
import { getCurrencyFromCountry } from "../../../utils";
import { IoShareSocialSharp } from "react-icons/io5";

interface CarAdsInfoPageProps {
  adsInfo: AdsModel;
}

const CarAdsInfoPage = ({ adsInfo }: CarAdsInfoPageProps) => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      adsInfo?.advertisingImageList &&
      adsInfo?.advertisingImageList.length < 2.5
        ? adsInfo?.advertisingImageList.length
        : 2.5,

    slidesToScroll: 2.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
    ],
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-1 w-full px-2 py-4  font-header space-y-4 md:justify-center md:items-center md:w-1/2 md:mx-auto">
      <div className="w-full h-[350px]">
        <img
          src={adsInfo?.advertisingImage}
          alt=""
          crossOrigin="anonymous"
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        {adsInfo?.advertisingPrice && (
          <p className="text-lg text-primary font-semibold">
            <span className="text-red-950 ">{t("price")} : </span>{" "}
            {adsInfo?.advertisingPrice!.toFixed(2)}
            {getCurrencyFromCountry(country)}
          </p>
        )}
        <div className="flex flex-row justify-start items-center gap-x-4">
          <IoShareSocialSharp className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-lg font-body font-semibold">
        {adsInfo.advertisingTitle}
      </p>
      <p>
        {t("num_of_viewers")}: {adsInfo.adsViews}
      </p>
      <hr className=" bg-slate-400 h-0.5 w-full" />
      <div className="flex flex-col space-y-3 w-full capitalize">
        <p className="text-lg font-body font-semibold">{t("details")} : </p>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("owner")}</p>
          <p>{adsInfo?.owner?.username}</p>
        </div>
        {adsInfo.advertisingType && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("category")}</p>
            <p>{adsInfo?.advertisingType}</p>
          </div>
        )}
        {adsInfo.type && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("car_name")}</p>
            <p>{adsInfo?.type}</p>
          </div>
        )}
        {adsInfo.category && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("car_category")}</p>
            <p>{adsInfo?.category}</p>
          </div>
        )}
        {adsInfo.advertisingYear && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("year")}</p>
            <p>{adsInfo?.advertisingYear}</p>
          </div>
        )}
        {adsInfo.color && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("color")}</p>
            <p>{adsInfo?.color}</p>
          </div>
        )}
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("guarantee")}</p>
          <p>{adsInfo?.guarantee === true ? "Applies" : "not Applies"}</p>
        </div>
        {adsInfo.advertisingLocation && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("location")}</p>
            <p>{adsInfo?.advertisingLocation}</p>
          </div>
        )}
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3 w-full">
          <p className="font-semibold">{t("description")}</p>
          <p>{adsInfo.advertisingDescription}</p>
        </div>
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3">
          <p className="font-semibold">{t("images")} : </p>
          {adsInfo?.advertisingImageList &&
          adsInfo?.advertisingImageList.length > 0 ? (
            <Slider {...settings}>
              {adsInfo?.advertisingImageList.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="relative w-full h-[140px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={item}
                      crossOrigin="anonymous"
                      alt={`card image`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>no images</p>
          )}
        </div>
        <hr className=" bg-slate-400 h-0.5 w-full" />
        {adsInfo?.advertisingVedio && (
          <div className="flex flex-col space-y-3 w-full">
            <p className="font-semibold">{t("video")}</p>
            <video
              playsInline
              muted
              controls
              autoPlay
              className="object-cover bg-transparent w-full max-h-[250px] "
            >
              <source src={adsInfo?.advertisingVedio} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarAdsInfoPage;
