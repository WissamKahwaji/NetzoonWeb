import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks";
import {
  selectDeliveryFee,
  selectOrderTotal,
} from "../../../features/cart/slice";
import { useGetFeesInfoQuery } from "../../../apis/fees/queries";
import LoadingComponent from "../loading/LoadingComponent";
import { getCurrencyFromCountry } from "../../../utils";
import { useCountry } from "../../../context/CountryContext";
import { useNavigate } from "react-router-dom";

const SummeryOrderPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const { data: dataInfo, isError, isLoading } = useGetFeesInfoQuery();

  const serviceFee = dataInfo?.feesFromBuyer ?? 0;
  const orderTotal = useAppSelector(selectOrderTotal);
  const deliveryFee = useAppSelector(selectDeliveryFee);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col justify-start items-center gap-y-2 mt-40 mb-10 font-header px-2 w-full">
      <p className="text-2xl font-bold text-primary mb-10">
        {t("summery_orders")}
      </p>
      <div className="w-full flex flex-col justify-center items-center mx-auto space-y-5">
        <div className="flex flex-row justify-center items-center gap-x-20 w-full text-gray-950 font-bold">
          <p>{t("order_total")}</p>
          <p>
            {orderTotal} {getCurrencyFromCountry(country)}
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-20 w-full text-gray-950 font-bold">
          <p>{t("service_fee")}</p>
          <p>
            {serviceFee} {getCurrencyFromCountry(country)}
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-20 w-full text-gray-950 font-bold">
          <p>{t("delivery_fee")}</p>
          <p>
            {deliveryFee}
            {getCurrencyFromCountry(country)}
          </p>
        </div>
        <hr className="w-[90%] bg-primary " />
        <div className="flex flex-row justify-center items-center gap-x-20 w-full text-primary font-bold">
          <p>{t("total_amount")}</p>
          <p>
            {deliveryFee + serviceFee + orderTotal}
            {getCurrencyFromCountry(country)}
          </p>
        </div>
        <div className="w-full flex justify-center items-center pt-7 text-white">
          <button
            className="rounded-full bg-primary py-2 w-1/2"
            onClick={() => {
              navigate("checkout");
            }}
          >
            {t("check_out")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummeryOrderPage;
