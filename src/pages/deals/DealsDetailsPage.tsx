import { useParams } from "react-router-dom";
import { useGetDealByIdQuery } from "../../apis/deals/queries";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { formatDateWithoutTime, getCurrencyFromCountry } from "../../utils";
import { useCountry } from "../../context/CountryContext";

const DealsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { country } = useCountry();
  const { data: dealInfo, isError, isLoading } = useGetDealByIdQuery(id ?? "");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full px-2 py-4  font-header space-y-4 md:justify-center md:items-center">
      <div className="w-full h-[350px]">
        <img
          src={dealInfo?.imgUrl}
          alt=""
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="flex flex-col space-y-3 w-full capitalize">
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_title")}</p>
          <p>{dealInfo?.name}</p>
        </div>
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("vendor_name")}</p>
          <p>{dealInfo?.companyName}</p>
        </div>
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_description")}</p>
          <p>{dealInfo?.description}</p>
        </div>
        {dealInfo?.startDate && (
          <div className="w-full grid grid-cols-2  border-b  border-primary/30">
            <p>{t("deal_start_date")}</p>
            <p>{formatDateWithoutTime(dealInfo?.startDate)}</p>
          </div>
        )}
        {dealInfo?.endDate && (
          <div className="w-full grid grid-cols-2  border-b  border-primary/30">
            <p>{t("deal_end_date")}</p>
            <p>{formatDateWithoutTime(dealInfo?.endDate)}</p>
          </div>
        )}
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_price_before")}</p>
          <p>
            {dealInfo?.prevPrice} {getCurrencyFromCountry(country)}
          </p>
        </div>
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_current_price")}</p>
          <p>
            {dealInfo?.currentPrice} {getCurrencyFromCountry(country)}
          </p>
        </div>

        <div className="w-full">
          <button className="w-full flex justify-center items-center rounded-md shadow-md bg-primary py-3 mt-3 capitalize text-white font-semibold ">
            {t("buy_now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealsDetailsPage;
