import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import TextWithButton from "../../../const/text-with-button/TextWithButton";
import { useGetAllCategoriesByDepartmentQuery } from "../../../../apis/departments/queries";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

interface DepartmentContainerProps {
  id: string;
  name: string;
  onClick: () => void;
}

const DepartmentContainer = ({
  id,
  name,
  onClick,
}: DepartmentContainerProps) => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const navigate = useNavigate();
  const {
    data: categoriesInfo,
    isError,
    isLoading,
  } = useGetAllCategoriesByDepartmentQuery(id ?? "");

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      categoriesInfo && categoriesInfo.length < 6.5
        ? categoriesInfo.length
        : 6.5,

    slidesToScroll:
      categoriesInfo && categoriesInfo.length < 6.5
        ? categoriesInfo.length
        : 6.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            categoriesInfo && categoriesInfo.length < 6.5
              ? categoriesInfo.length
              : 6.5,

          slidesToScroll:
            categoriesInfo && categoriesInfo.length < 6.5
              ? categoriesInfo.length
              : 6.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            categoriesInfo && categoriesInfo.length < 4.5
              ? categoriesInfo.length
              : 4.5,

          slidesToScroll: 4.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            categoriesInfo && categoriesInfo.length < 3.5
              ? categoriesInfo.length
              : 4.5,

          slidesToScroll: 4.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            categoriesInfo && categoriesInfo.length < 3.5
              ? categoriesInfo.length
              : 3.5,

          slidesToScroll: 3.5,
        },
      },
    ],
  };

  return (
    <div
      className={`w-full mt-6 flex-col ${
        name === "in_account" ? "hidden" : "flex"
      }`}
    >
      <TextWithButton
        text={t(name)}
        btnText={t("show_all")}
        onClick={onClick}
      />
      <div className="w-full mt-2 hidden md:flex">
        {isError || isLoading ? (
          <div className="w-full h-[200px] bg-primary/20 flex justify-center items-center">
            ....
          </div>
        ) : (
          <div className="w-full bg-primary/10 py-8">
            {categoriesInfo && categoriesInfo?.length > 6 ? (
              <Slider {...settings}>
                {categoriesInfo?.map((category, index) => (
                  <div key={index} className="px-2">
                    <div
                      className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[140px] lg:h-[140px] xl:w-[180px] xl:h-[180px]  cursor-pointer   hover:scale-105 transform ease-in-out duration-300"
                      onClick={() => {
                        navigate(`/departments/${id}/${category._id}/products`);
                      }}
                    >
                      <div className="absolute w-full h-[40px]  flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/60 text-center text-[9px] font-semibold text-white px-2 py-1 rounded-br-lg rounded-bl-lg whitespace-normal capitalize">
                        {selectedLang === "en"
                          ? category.name
                          : category.nameAr ?? category.name}
                      </div>
                      <img
                        src={category.imageUrl}
                        alt={`card image`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="flex flex-row gap-x-10 justify-start items-center">
                {categoriesInfo?.map((category, index) => (
                  <div key={index} className="px-2">
                    <div
                      className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[140px] lg:h-[140px] xl:w-[180px] xl:h-[180px]  cursor-pointer   hover:scale-105 transform ease-in-out duration-300"
                      onClick={() => {
                        navigate(`/departments/${id}/${category._id}/products`);
                      }}
                    >
                      <div className="absolute w-full h-[40px]  flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/60 text-center text-[9px] font-semibold text-white px-2 py-1 rounded-br-lg rounded-bl-lg whitespace-normal capitalize">
                        {selectedLang === "en"
                          ? category.name
                          : category.nameAr ?? category.name}
                      </div>
                      <img
                        src={category.imageUrl}
                        alt={`card image`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full mt-2 flex md:hidden">
        {isError || isLoading ? (
          <div className="w-full h-[200px] bg-primary/20 flex justify-center items-center">
            ....
          </div>
        ) : (
          <div className="w-full bg-primary/10 py-8">
            <Slider {...settings}>
              {categoriesInfo?.map((category, index) => (
                <div key={index} className="px-2">
                  <div
                    className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[140px] lg:h-[140px] xl:w-[180px] xl:h-[180px]  cursor-pointer   hover:scale-105 transform ease-in-out duration-300"
                    onClick={() => {
                      navigate(`/departments/${id}/${category._id}/products`);
                    }}
                  >
                    <div className="absolute w-full h-[40px]  flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/60 text-center text-[9px] font-semibold text-white px-2 py-1 rounded-br-lg rounded-bl-lg whitespace-normal capitalize">
                      {selectedLang === "en"
                        ? category.name
                        : category.nameAr ?? category.name}
                    </div>
                    <img
                      src={category.imageUrl}
                      alt={`card image`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentContainer;
