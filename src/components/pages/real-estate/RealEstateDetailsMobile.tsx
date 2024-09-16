import { RealEstateModel } from "../../../apis/real_estate/type";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCurrencyFromCountry } from "../../../utils";
import { IoShareSocialSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../../context/CountryContext";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteRealEstateMutation } from "../../../apis/real_estate/queries";
import { useState } from "react";
import Modal from "react-modal";
import { MdDelete, MdEdit } from "react-icons/md";

interface RealEstateDetailsMobileProps {
  realEstateInfo: RealEstateModel | undefined;
}

const RealEstateDetailsMobile = ({
  realEstateInfo,
}: RealEstateDetailsMobileProps) => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { mutate: deleteRealEstateInfo } = useDeleteRealEstateMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteRealEstate = () => {
    deleteRealEstateInfo(realEstateInfo?._id ?? "");
  };

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
      {userId === realEstateInfo?.createdBy?._id && (
        <div className="flex flex-row justify-start items-center gap-x-6">
          <MdEdit
            className="text-primary w-6 h-6 cursor-pointer"
            onClick={() => {
              navigate("edit");
            }}
          />

          <MdDelete
            className="text-red-500 w-6 h-6 cursor-pointer"
            onClick={openModal}
          />
        </div>
      )}
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
      <div className=" fixed  bottom-[62px] w-full flex justify-center items-center py-3 bg-slate-100 flex-row gap-x-3 md:w-1/2 left-0 right-0 md:mx-auto">
        <Link to={`tel:${realEstateInfo?.createdBy.firstMobile}`}>
          <button className="px-2 py-2 text-white rounded-xl bg-primary  w-28">
            {t("call")}
          </button>
        </Link>
        <button className="px-2 py-2 text-white rounded-xl bg-primary  w-28">
          {t("chat")}
        </button>
        <button
          className="px-2 py-2 text-white rounded-xl bg-primary  w-28"
          onClick={() => {
            if (realEstateInfo?.createdBy.firstMobile) {
              const sanitizedNumber =
                realEstateInfo?.createdBy.firstMobile.replace(/\s+/g, "");
              window.open(`https://wa.me/${sanitizedNumber}`, "_blank");
            }
          }}
        >
          {t("whatsapp")}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">{t("delete_real_esate")}</h2>
          <p className="mb-4">{t("delete_real_esate_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteRealEstate();
                closeModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RealEstateDetailsMobile;
