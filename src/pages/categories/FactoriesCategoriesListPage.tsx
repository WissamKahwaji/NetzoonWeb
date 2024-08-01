import { useTranslation } from "react-i18next";
import { useGetFactoriesCategoriesQuery } from "../../apis/departments/queries";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

const FactoriesCategoriesListPage = () => {
  const { t } = useTranslation();
  const {
    data: factoriesCategories,
    isError,
    isLoading,
  } = useGetFactoriesCategoriesQuery();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col w-full px-2 py-4 md:py-10 font-header space-y-8 md:justify-center md:items-center">
      <div className="w-full grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 md:gap-4 md:w-1/2">
        {factoriesCategories &&
          factoriesCategories.map((factory, index) => (
            <Link key={index} to={`${factory._id}`}>
              <div className="w-full px-2 py-1 text-lg bg-gray-200 border-b-2 border-black">
                {t(factory.title)}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FactoriesCategoriesListPage;
