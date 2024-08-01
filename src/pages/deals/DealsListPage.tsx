import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetDealsByCategoryQuery } from "../../apis/deals/queries";
import { useCountry } from "../../context/CountryContext";
import { useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import DealCard from "../../components/pages/deals/DealCard";

const DealsListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { country } = useCountry();
  const { t } = useTranslation();
  const {
    data: dealsListInfo,
    isError,
    isLoading,
  } = useGetDealsByCategoryQuery(categoryId ?? "", country);
  const [searchTerm, setSearchTerm] = useState("");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredDeals = dealsListInfo?.results?.filter(deal =>
    deal.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredDeals && filteredDeals.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 md:gap-4 md:w-1/2">
          {filteredDeals &&
            filteredDeals.map((deal, index) => (
              <DealCard key={index} item={deal} />
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

export default DealsListPage;
