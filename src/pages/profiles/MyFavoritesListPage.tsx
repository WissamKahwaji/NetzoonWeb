import { useTranslation } from "react-i18next";
import {
  useGetUserFavoritesListQuery,
  useRemoveProductFromFavoritesMutation,
} from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { getCurrencyFromCountry } from "../../utils";
import { useCountry } from "../../context/CountryContext";
import { MdFavorite } from "react-icons/md";

const MyFavoritesListPage = () => {
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const { country } = useCountry();
  const {
    data: favoritesListInfo,
    isLoading: isLoading,
    isError: isError,
  } = useGetUserFavoritesListQuery(userId ?? "");
  const { mutate: removeItem } = useRemoveProductFromFavoritesMutation();
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4">
        {t("my_favorites")}
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {favoritesListInfo && favoritesListInfo.length > 0 ? (
          favoritesListInfo.map((product, index) => (
            <div
              key={index}
              className="w-full p-2 rounded-sm shadow-sm shadow-primary border border-gray-200 flex flex-row gap-x-2 justify-start items-center  "
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
                <div className="w-full flex flex-row justify-between items-center">
                  <p className="text-xs">
                    {product.price}
                    {t(getCurrencyFromCountry(country))}
                  </p>
                  <MdFavorite
                    className="text-red-600 text-lg cursor-pointer"
                    onClick={() => {
                      removeItem({
                        userId: userId ?? "",
                        productId: product.productId,
                      });
                    }}
                  />
                </div>
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

export default MyFavoritesListPage;
