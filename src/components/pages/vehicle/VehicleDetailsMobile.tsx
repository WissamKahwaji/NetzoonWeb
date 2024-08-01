import { useTranslation } from "react-i18next";
import { VehicleModel, VehicleType } from "../../../apis/vehicle/type";
import { useCountry } from "../../../context/CountryContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCurrencyFromCountry } from "../../../utils";
import { IoShareSocialSharp } from "react-icons/io5";

interface VehicleDetailsMobileProps {
  vehicleInfo: VehicleModel | undefined;
}

const VehicleDetailsMobile = ({ vehicleInfo }: VehicleDetailsMobileProps) => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      vehicleInfo?.carImages && vehicleInfo?.carImages.length < 2.5
        ? vehicleInfo?.carImages.length
        : 2.5,

    slidesToScroll: 2.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            vehicleInfo?.carImages && vehicleInfo?.carImages.length < 2.5
              ? vehicleInfo?.carImages.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            vehicleInfo?.carImages && vehicleInfo?.carImages.length < 2.5
              ? vehicleInfo?.carImages.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            vehicleInfo?.carImages && vehicleInfo?.carImages.length < 2.5
              ? vehicleInfo?.carImages.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            vehicleInfo?.carImages && vehicleInfo?.carImages.length < 2.5
              ? vehicleInfo?.carImages.length
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
          src={vehicleInfo?.imageUrl}
          alt=""
          crossOrigin="anonymous"
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-lg text-primary font-semibold">
          <span className="text-red-950 ">{t("price")} : </span>{" "}
          {vehicleInfo?.price!.toFixed(2)}
          {getCurrencyFromCountry(country)}
        </p>
        <div className="flex flex-row justify-start items-center gap-x-4">
          <IoShareSocialSharp className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-lg font-body">{vehicleInfo?.name}</p>
      <hr className=" bg-slate-400 h-0.5 w-full" />
      <div className="flex flex-col space-y-3 w-full capitalize">
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("owner")}</p>
          <p>{vehicleInfo?.creator?.username}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("category")}</p>
          <p>{vehicleInfo?.category}</p>
        </div>
        {vehicleInfo?.category === VehicleType.PLANES &&
          vehicleInfo.aircraftType && (
            <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
              <p>{t("aircraft_type")}</p>
              <p>{vehicleInfo?.aircraftType}</p>
            </div>
          )}
        {vehicleInfo?.category === VehicleType.SHIPS &&
          vehicleInfo.shipType && (
            <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
              <p>{t("ship_type")}</p>
              <p>{vehicleInfo?.shipType}</p>
            </div>
          )}
        {vehicleInfo?.contactNumber && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("contact_number")}</p>
            <p>{vehicleInfo?.contactNumber}</p>
          </div>
        )}
        {vehicleInfo?.year && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("year")}</p>
            <p>{vehicleInfo?.year.toString()}</p>
          </div>
        )}
        {vehicleInfo?.kilometers !== undefined &&
          vehicleInfo?.kilometers > 0 && (
            <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
              <p>{t("kilometers")}</p>
              <p>{vehicleInfo?.kilometers}</p>
            </div>
          )}
        {vehicleInfo?.regionalSpecs && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("regionalSpecs")}</p>
            <p>{vehicleInfo?.regionalSpecs}</p>
          </div>
        )}
        {vehicleInfo?.location && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("location")}</p>
            <p>{vehicleInfo?.location}</p>
          </div>
        )}
        {vehicleInfo?.manufacturer && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("manufacturer")}</p>
            <p>{vehicleInfo?.manufacturer}</p>
          </div>
        )}
        {vehicleInfo?.vehicleModel && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("model")}</p>
            <p>{vehicleInfo?.vehicleModel}</p>
          </div>
        )}
        {vehicleInfo?.maxDistance && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("max_distance")}</p>
            <p>{vehicleInfo?.maxDistance}</p>
          </div>
        )}
        {vehicleInfo?.maxSpeed && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("max_speed")}</p>
            <p>{vehicleInfo?.maxSpeed}</p>
          </div>
        )}
        {vehicleInfo?.category === VehicleType.SHIPS &&
          vehicleInfo?.shipLength && (
            <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
              <p>{t("ship_length")}</p>
              <p>{vehicleInfo?.shipLength}</p>
            </div>
          )}
        {vehicleInfo?.exteriorColor && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("exteriorColor")}</p>
            <p>{vehicleInfo?.exteriorColor}</p>
          </div>
        )}
        {vehicleInfo?.interiorColor && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("interiorColor")}</p>
            <p>{vehicleInfo?.interiorColor}</p>
          </div>
        )}
        {vehicleInfo?.doors && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("doors")}</p>
            <p>{vehicleInfo?.doors}</p>
          </div>
        )}
        {vehicleInfo?.bodyCondition && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("bodyCondition")}</p>
            <p>{vehicleInfo?.bodyCondition}</p>
          </div>
        )}
        {vehicleInfo?.bodyType && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("bodyType")}</p>
            <p>{vehicleInfo?.bodyType}</p>
          </div>
        )}
        {vehicleInfo?.mechanicalCondition && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("mechanicalCondition")}</p>
            <p>{vehicleInfo?.mechanicalCondition}</p>
          </div>
        )}
        {vehicleInfo?.seatingCapacity && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("seatingCapacity")}</p>
            <p>{vehicleInfo?.seatingCapacity}</p>
          </div>
        )}
        {vehicleInfo?.numofCylinders && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("numofCylinders")}</p>
            <p>{vehicleInfo?.numofCylinders}</p>
          </div>
        )}
        {vehicleInfo?.transmissionType && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("transmissionType")}</p>
            <p>{vehicleInfo?.transmissionType}</p>
          </div>
        )}
        {vehicleInfo?.horsepower && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("horsepower")}</p>
            <p>{vehicleInfo?.horsepower}</p>
          </div>
        )}
        {vehicleInfo?.fuelType && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("fuelType")}</p>
            <p>{vehicleInfo?.fuelType}</p>
          </div>
        )}
        {vehicleInfo?.extras && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("extras")}</p>
            <p>{vehicleInfo?.extras}</p>
          </div>
        )}
        {vehicleInfo?.technicalFeatures && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("technicalFeatures")}</p>
            <p>{vehicleInfo?.technicalFeatures}</p>
          </div>
        )}
        {vehicleInfo?.steeringSide && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("steeringSide")}</p>
            <p>{vehicleInfo?.steeringSide}</p>
          </div>
        )}
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("guarantee")}</p>
          <p>{vehicleInfo?.guarantee ? "applies" : "not applies"}</p>
        </div>
        {vehicleInfo?.type && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("condition")}</p>
            <p>{vehicleInfo?.type}</p>
          </div>
        )}
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3 w-full">
          <p className="font-semibold">{t("description")}</p>
          <p>{vehicleInfo?.description}</p>
        </div>
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3">
          <p className="font-semibold">{t("product_images")} : </p>
          {vehicleInfo?.carImages && vehicleInfo?.carImages.length > 0 ? (
            <Slider {...settings}>
              {vehicleInfo?.carImages.map((item, index) => (
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
        {vehicleInfo?.vedioUrl && (
          <div className="flex flex-col space-y-3 w-full">
            <p className="font-semibold">{t("vehicle_video")}</p>
            <video
              playsInline
              muted
              controls
              autoPlay
              className="object-cover bg-transparent w-full max-h-[250px] "
            >
              <source src={vehicleInfo?.vedioUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailsMobile;
