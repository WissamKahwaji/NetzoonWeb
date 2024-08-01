import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../../apis/services/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const {
    data: serviceInfo,
    isError,
    isLoading,
  } = useGetServiceByIdQuery(id ?? "");
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      serviceInfo?.serviceImageList &&
      serviceInfo?.serviceImageList.length < 2.5
        ? serviceInfo?.serviceImageList.length
        : 2.5,

    slidesToScroll: 2.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            serviceInfo?.serviceImageList &&
            serviceInfo?.serviceImageList.length < 2.5
              ? serviceInfo?.serviceImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            serviceInfo?.serviceImageList &&
            serviceInfo?.serviceImageList.length < 2.5
              ? serviceInfo?.serviceImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            serviceInfo?.serviceImageList &&
            serviceInfo?.serviceImageList.length < 2.5
              ? serviceInfo?.serviceImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            serviceInfo?.serviceImageList &&
            serviceInfo?.serviceImageList.length < 2.5
              ? serviceInfo?.serviceImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
    ],
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className=" grid grid-cols-1 md:grid-cols-1 gap-x-4 w-full px-2 pt-2 pb-20 shadow-lg  font-header space-y-4 md:justify-center md:items-center md:w-1/2 md:mx-auto">
      <div className="w-full max-h-[350px] md:max-h-[550px]">
        <img
          src={serviceInfo?.imageUrl}
          alt=""
          className="w-full h-full max-h-[350px] md:max-h-[350px] shadow-sm object-contain"
        />
      </div>
      <p className="font-bold text-primary text-lg">{serviceInfo?.title}</p>
      <div className="flex flex-row justify-start items-center gap-x-2">
        <p>{serviceInfo?.averageRating?.toFixed(2)}</p>
        <p>{`(${serviceInfo?.totalRatings} Review)`}</p>
      </div>
      <p className="text-gray-600 whitespace-pre-wrap">
        {serviceInfo?.description}
      </p>
      <hr className=" bg-slate-200 h-0.5 w-full" />
      <div className="flex flex-col space-y-3">
        <p className="font-semibold">{t("images")} : </p>
        {serviceInfo?.serviceImageList &&
        serviceInfo?.serviceImageList.length > 0 ? (
          <Slider {...settings}>
            {serviceInfo?.serviceImageList.map((item, index) => (
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
      {serviceInfo?.vedioUrl && (
        <div className="flex flex-col space-y-3 w-full">
          <p className="font-semibold">{t("video")}</p>
          <video
            playsInline
            muted
            controls
            autoPlay
            className="object-cover bg-transparent w-full max-h-[250px] "
          >
            <source src={serviceInfo?.vedioUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className=" fixed  bottom-0 w-full flex justify-center items-center py-3 bg-slate-100 flex-row gap-x-3 md:w-1/2 left-0 right-0 md:mx-auto">
        <button className="px-2 py-2 text-white rounded-xl bg-primary  w-28">
          {t("call")}
        </button>
        <button className="px-2 py-2 text-white rounded-xl bg-primary  w-28">
          {t("chat")}
        </button>
        <button className="px-2 py-2 text-white rounded-xl bg-primary  w-28">
          {t("whatsapp")}
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
