import { useTranslation } from "react-i18next";
import { useGetServicesCategoriesQuery } from "../../apis/services/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCategoriesListPage = () => {
  const { t } = useTranslation();

  const {
    data: serviceCategories,
    isError,
    isLoading,
  } = useGetServicesCategoriesQuery();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="flex flex-row justify-start items-center gap-x-2">
        <p className="font-body font-bold text-lg">
          {t("services_categories")}
        </p>
        <FaArrowDown />
      </div>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-2 md:gap-4 md:w-1/2">
        {serviceCategories &&
          serviceCategories.map((category, index) => (
            <Link to={`${category._id}`}>
              <div
                key={index}
                className="px-3 py-3 border w-full h-12 rounded-md flex justify-center items-center border-primary bg-white "
              >
                <p className="text-[9px] text-center font-header font-semibold text-primary">
                  {category.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ServiceCategoriesListPage;
