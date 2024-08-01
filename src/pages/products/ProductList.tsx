import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useParams } from "react-router-dom";
import { Params } from "./type";

import { useEffect, useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useGetProductsByCategoryQuery } from "../../apis/product/queries";

import ProductCard from "../../components/pages/product/ProductCard";

const ProductList = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const { categoryId } = useParams<Params>();
  const {
    data: productsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetProductsByCategoryQuery(categoryId ?? "", country);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    refetch();
  }, [country, refetch]);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productsInfo?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder={`${t("search")} ...`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 mb-4 border rounded-md border-primary outline-none"
        />
      </div>
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-4 md:w-1/2">
          {filteredProducts &&
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-primary font-semibold w-full flex justify-center items-center">
          {t("no_data_to_show")}
        </p>
      )}
    </div>
  );
};

export default ProductList;
