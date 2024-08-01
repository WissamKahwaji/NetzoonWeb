import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Params } from "./type";
import { useGetAllCategoriesByDepartmentQuery } from "../../apis/departments/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

const DepartmentCategoriesPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { departmentId } = useParams<Params>();
  const {
    data: categoriesInfo,
    isError,
    isLoading,
  } = useGetAllCategoriesByDepartmentQuery(departmentId ?? "");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      {categoriesInfo && (
        <p className="font-body font-bold text-lg capitalize">
          {t(categoriesInfo[0].department.name)}
        </p>
      )}
      <div className="w-full grid grid-cols-3 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-4 md:w-1/2">
        {categoriesInfo &&
          categoriesInfo.map((category, index) => (
            <Link key={index} to={`${category._id}/products`}>
              <div
                className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[140px] lg:h-[140px] xl:w-[180px] xl:h-[180px]"
                //   onClick={onClick}
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
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DepartmentCategoriesPage;
