import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../apis/order/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useTranslation } from "react-i18next";
import { formatDateWithoutTime, getCurrencyFromCountry } from "../../utils";
import { useCountry } from "../../context/CountryContext";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { country } = useCountry();
  const {
    data: orderInfo,
    isError,
    isLoading,
  } = useGetOrderByIdQuery(id ?? "");
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <div className="flex flex-col justify-start items-center px-4 py-6 w-full  bg-white shadow-lg rounded-lg">
        <div className="w-full  mb-6">
          <h1 className="text-2xl font-bold text-primary">
            {t("order_summary")}
          </h1>
          <p className="text-sm text-gray-500">
            {t("order_id")} - {orderInfo?._id}
          </p>
        </div>

        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-primary">
            {t("order_details")}
          </h2>
          <div className="flex flex-col space-y-2 mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold"> {t("placed_on")}</span>:{" "}
              {formatDateWithoutTime(orderInfo?.createdAt ?? "")}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("order_holder")}</span>:{" "}
              {orderInfo?.userId.username}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("order_seller")}</span>:{" "}
              {orderInfo?.clientId.username}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("shipping_address")}</span>:{" "}
              {orderInfo?.shippingAddress}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("mobile_number")}</span>:{" "}
              {orderInfo?.mobile}
            </p>
          </div>
        </div>

        <div className="w-full mb-8">
          <h2 className="text-lg font-semibold text-primary">
            {t("products")}
          </h2>
          <div className="flex flex-col space-y-3 mt-2">
            {orderInfo?.products?.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 border border-gray-200 rounded-lg"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                  crossOrigin="anonymous"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-800">
                    {item.product.name}
                  </p>
                  <div className="flex gap-x-1 text-sm text-gray-600">
                    <p>{item.qty}</p>
                    <p>x</p>
                    <p>
                      {item.amount} {t(getCurrencyFromCountry(country))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold text-primary">
            {t("order_summary")}
          </h2>
          <div className="flex flex-col space-y-2 mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("order_total")}</span>:{" "}
              {orderInfo?.subTotal} {t(getCurrencyFromCountry(country))}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("service_fee")}</span>:{" "}
              {orderInfo?.serviceFee} {t(getCurrencyFromCountry(country))}
            </p>
            <p className="text-lg font-bold text-primary">
              {t("total_amount")}: {orderInfo?.grandTotal}{" "}
              {t(getCurrencyFromCountry(country))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
