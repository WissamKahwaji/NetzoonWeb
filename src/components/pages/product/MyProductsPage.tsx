import { useTranslation } from "react-i18next";
import { useGetSelectedProductsQuery } from "../../../apis/product/queries";
import LoadingComponent from "../loading/LoadingComponent";
import { useNavigate } from "react-router-dom";

const MyProductsPage = () => {
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: selectedProductsInfo,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetSelectedProductsQuery(userId ?? "");

  if (isErrorProducts) return <div>Error !!!</div>;
  if (isLoadingProducts) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4">
        {t("my_products")}
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {selectedProductsInfo && selectedProductsInfo.length > 0 ? (
          selectedProductsInfo.map((product, index) => (
            <div
              key={index}
              className="w-full p-2 rounded-sm shadow-sm shadow-primary border border-gray-200 flex flex-row gap-x-2 justify-start items-center cursor-pointer"
              onClick={() => {
                navigate(
                  `/departments/${product.category?.department}/${product.category?._id}/products/${product._id}`
                );
              }}
            >
              <img
                src={product.imageUrl}
                alt=""
                className="w-20 h-20"
                crossOrigin="anonymous"
              />
              <div className="space-y-2">
                <p className="text-sm">{product.name}</p>
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
    </div>
  );
};

export default MyProductsPage;
