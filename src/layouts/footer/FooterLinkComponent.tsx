import { useTranslation } from "react-i18next";
import { useGetAllCategoriesByDepartmentQuery } from "../../apis/departments/queries";
import { Link } from "react-router-dom";

interface FooterLinkComponentProps {
  id: string;
  name: string;
}

const FooterLinkComponent = ({ id, name }: FooterLinkComponentProps) => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;

  const { data: categoriesInfo } = useGetAllCategoriesByDepartmentQuery(
    id ?? ""
  );
  return (
    <div className={`${name === "in_account" ? "hidden" : "flex flex-col"}`}>
      <h3 className="font-bold mb-3 capitalize">{t(name)}</h3>
      <ul className="space-y-2">
        {categoriesInfo &&
          categoriesInfo.slice(1, 8).map((category, index) => (
            <li key={index}>
              <Link
                to={`/departments/${category.department._id}/${category._id}/products`}
                reloadDocument
                className="text-gray-600 hover:text-primary"
              >
                {selectedLang === "en" ? category.name : category.nameAr}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FooterLinkComponent;
