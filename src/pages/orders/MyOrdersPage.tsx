import { useTranslation } from "react-i18next";
import { useGetUserOrdersQuery } from "../../apis/order/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import OrderCard from "../../components/const/order-card/OrderCard";

const MyOrdersPage = () => {
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();

  const {
    data: ordersInfo,
    isError,
    isLoading,
  } = useGetUserOrdersQuery(userId ?? "");
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col justify-start items-center px-2 py-2 font-header w-full md:w-[60%] md:mx-auto md:py-5">
      <p className="text-lg font-bold font-serif text-primary mb-4">
        {t("my_orders")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {ordersInfo && ordersInfo.length > 0 ? (
          [...ordersInfo]
            .reverse()
            .map((order, index) => (
              <OrderCard
                key={index}
                order={order}
                orderNumber={ordersInfo.length - index}
              />
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

export default MyOrdersPage;
