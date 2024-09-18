import { useTranslation } from "react-i18next";
import { FaArrowDown } from "react-icons/fa";
import { useGetDealsCategoriesQuery } from "../../apis/deals/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { Link } from "react-router-dom";

const DealsCategoriesListPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const {
    data: dealsCategories,
    isError,
    isLoading,
  } = useGetDealsCategoriesQuery();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="flex flex-row justify-start items-center gap-x-2">
        <p className="font-body font-bold text-lg">{t("deals_categories")}</p>
        <FaArrowDown />
      </div>
      <div className="w-full grid grid-cols-1 gap-x-2 gap-y-3 md:grid-cols-2 md:gap-4 md:w-2/3">
        {dealsCategories &&
          dealsCategories.map((category, index) => (
            <Link to={`${category._id}`}>
              <div
                key={index}
                className="w-full px-2 py-3 text-lg text-white bg-primary shadow-sm rounded-lg"
              >
                {selectedLanguage === "en"
                  ? category.name
                  : category.nameAr ?? category.name}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DealsCategoriesListPage;
