import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useGetAllProductsQuery } from "../../apis/product/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useAddToSelectedProductsMutation } from "../../apis/user/queries";

const AllProductsPage = () => {
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const { country } = useCountry();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const {
    data: productsInfo,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetAllProductsQuery(country);
  const { mutate: addToSelectedProducts } = useAddToSelectedProductsMutation();

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter(id => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleAddToSelectedProducts = () => {
    if (userId && selectedProducts.length > 0) {
      addToSelectedProducts({ userId, productIds: selectedProducts });
    }
  };

  if (isErrorProducts) return <div>Error !!!</div>;
  if (isLoadingProducts) return <LoadingComponent />;
  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4">
        {t("all_products")}
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {productsInfo && productsInfo.length > 0 ? (
          productsInfo.map(product => (
            <div
              key={product._id}
              className={`w-full p-2 rounded-sm shadow-sm shadow-primary border ${
                selectedProducts.includes(product._id!)
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
              } flex flex-row gap-x-2 justify-start items-center cursor-pointer hover:scale-105 ease-out duration-300`}
              onClick={() => handleSelectProduct(product._id!)}
            >
              <img
                src={product.imageUrl}
                crossOrigin="anonymous"
                alt=""
                className="rounded-full w-12 h-12 border border-primary"
              />
              <div className="justify-start items-start space-y-2">
                <p className="text-primary text-xs">{product.name}</p>
                <p className="line-clamp-3 text-xs text-gray-400">
                  {product.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">
            <p>{t("no_data_to_show")}</p>
          </div>
        )}
      </div>
      {selectedProducts.length > 0 && (
        <button
          onClick={handleAddToSelectedProducts}
          className="fixed md:bottom-3 bottom-[75px] w-1/2 md:w-1/3 rounded-md mt-6 px-4 py-2 bg-primary text-white"
        >
          {t("submit")}
        </button>
      )}
    </div>
  );
};

export default AllProductsPage;
