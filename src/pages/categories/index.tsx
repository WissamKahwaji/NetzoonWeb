import { useTranslation } from "react-i18next";
import { FaArrowDown } from "react-icons/fa";
import { categories, USER_TYPE } from "../../constants";
import ImageWithTextCard from "../../components/const/ImageWithTextCard/ImageWithTextCard";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClick = (userType: string) => {
    if (userType === USER_TYPE.FACTORY) {
      navigate("facroties-categories");
    } else {
      navigate(`${userType}`);
    }
  };
  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="flex flex-row justify-start items-center gap-x-2">
        <p className="font-body font-bold text-lg">{t("categories")}</p>
        <FaArrowDown />
      </div>
      <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 md:w-1/2">
        {categories &&
          categories.map((category, index) => (
            <ImageWithTextCard
              key={index}
              text={t(category.name)}
              imageUrl={category.url}
              onClick={() => {
                handleOnClick(category.type);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
