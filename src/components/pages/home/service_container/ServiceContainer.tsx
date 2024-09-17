import { useTranslation } from "react-i18next";
import TextWithButton from "../../../const/text-with-button/TextWithButton";
import { useGetServicesCategoriesQuery } from "../../../../apis/services/queries";
import LoadingComponent from "../../loading/LoadingComponent";
import { Link, useNavigate } from "react-router-dom";

const ServiceContainer = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const navigate = useNavigate();
  const {
    data: servicesCategories,
    isError,
    isLoading,
  } = useGetServicesCategoriesQuery();

  return (
    <div className="flex flex-col w-full  mt-2 md:mt-5  justify-start items-start">
      <TextWithButton
        text={t("services")}
        btnText={t("show_all")}
        onClick={() => {
          navigate(`/services`);
        }}
      />
      <div className="grid grid-cols-2 gap-2 px-2 py-6 bg-primary/30 w-full mt-2 md:gap-x-7 md:gap-y-4 md:grid-cols-3 md:px-8">
        {isError && <div>Error !!!</div>}
        {isLoading && <LoadingComponent />}
        {servicesCategories &&
          (servicesCategories.length > 0 ? (
            servicesCategories.slice(0, 8).map((category, index) => (
              <Link key={index} to={`/services/${category._id}`}>
                <div className="px-3 py-3 border w-full h-12 rounded-md flex justify-center items-center border-primary bg-white  cursor-pointer   hover:scale-105 transform ease-in-out duration-300">
                  <p className="text-[9px] md:text-base text-center font-header font-semibold text-primary">
                    {selectedLang === "en"
                      ? category.title
                      : category.titleAr ?? category.title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div>there is no sercvice categories</div>
          ))}
      </div>
    </div>
  );
};

export default ServiceContainer;
