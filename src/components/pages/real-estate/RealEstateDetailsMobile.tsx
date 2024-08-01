import { RealEstateModel } from "../../../apis/real_estate/type";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCurrencyFromCountry } from "../../../utils";
import { IoShareSocialSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../../context/CountryContext";

interface RealEstateDetailsMobileProps {
  realEstateInfo: RealEstateModel | undefined;
}

const RealEstateDetailsMobile = ({
  realEstateInfo,
}: RealEstateDetailsMobileProps) => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      realEstateInfo?.images && realEstateInfo?.images.length < 2.5
        ? realEstateInfo?.images.length
        : 2.5,

    slidesToScroll: 2.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            realEstateInfo?.images && realEstateInfo?.images.length < 2.5
              ? realEstateInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            realEstateInfo?.images && realEstateInfo?.images.length < 2.5
              ? realEstateInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            realEstateInfo?.images && realEstateInfo?.images.length < 2.5
              ? realEstateInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            realEstateInfo?.images && realEstateInfo?.images.length < 2.5
              ? realEstateInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
    ],
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 w-full px-2 py-4  font-header space-y-4 md:justify-center md:items-center">
      <div className="w-full h-[350px]">
        <img
          src={realEstateInfo?.imageUrl}
          alt=""
          crossOrigin="anonymous"
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-lg text-primary font-semibold">
          <span className="text-red-950 ">{t("price")} : </span>{" "}
          {realEstateInfo?.price!.toFixed(2)}
          {getCurrencyFromCountry(country)}
        </p>
        <div className="flex flex-row justify-start items-center gap-x-4">
          <IoShareSocialSharp className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-lg font-body">{realEstateInfo?.title}</p>
      <hr className=" bg-slate-400 h-0.5 w-full" />
      <div className="flex flex-col space-y-3 w-full capitalize">
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("owner")}</p>
          <p>{realEstateInfo?.createdBy?.username}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("area")}</p>
          <p>{realEstateInfo?.area}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("bathrooms")}</p>
          <p>{realEstateInfo?.bathrooms}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("bedrooms")}</p>
          <p>{realEstateInfo?.bedrooms}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("location")}</p>
          <p>{realEstateInfo?.location}</p>
        </div>
        {realEstateInfo?.type && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("property_type")}</p>
            <p>{realEstateInfo?.type}</p>
          </div>
        )}
        {realEstateInfo?.category && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("residential_categories")}</p>
            <p>{realEstateInfo?.category}</p>
          </div>
        )}
        {realEstateInfo?.furnishing && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("furnishing_type")}</p>
            <p>
              {realEstateInfo?.furnishing === true
                ? t("furnished")
                : t("unfurnished")}
            </p>
          </div>
        )}
        {realEstateInfo?.forWhat && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("for_what")}</p>
            <p>{realEstateInfo?.forWhat}</p>
          </div>
        )}
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3 w-full">
          <p className="font-semibold">{t("description")}</p>
          <p>{realEstateInfo?.description}</p>
        </div>
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3">
          <p className="font-semibold">{t("product_images")} : </p>
          {realEstateInfo?.images && realEstateInfo?.images.length > 0 ? (
            <Slider {...settings}>
              {realEstateInfo?.images.map((item, index) => (
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
      </div>
    </div>
  );
};

export default RealEstateDetailsMobile;
