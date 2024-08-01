import { useTranslation } from "react-i18next";
import { useGetAdsListQuery } from "../../apis/ads/queries";
import { useCountry } from "../../context/CountryContext";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useState } from "react";
import { advertisingType } from "../../apis/ads/type";
import AdsCard from "../../components/pages/advertising/AdsCard";

const AdsListPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();

  const { data: adsListInfo, isError, isLoading } = useGetAdsListQuery(country);
  const [adsType, setAdsType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredAds = adsListInfo?.results?.filter(
    ads =>
      ads.advertisingTitle?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (adsType ? ads.advertisingType === adsType : true)
  );

  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center capitalize">
      <div className="flex flex-row  gap-x-2 w-full md:w-1/2 justify-between items-center">
        <p className="font-body font-bold text-lg">{t("advertisments")}</p>
        <div className="relative">
          <select
            id="advertisingType"
            name="advertisingType"
            className="block mt-2 appearance-none w-full pr-8 text-xs  font-header mb-2 px-4 py-3 border border-primary rounded-lg focus:outline-none   "
            onChange={e => {
              setAdsType(e.target.value);
            }}
            value={adsType}
          >
            <option value={""} className="text-xs">
              {t("show_all")}
            </option>
            <option value={advertisingType.CAR} className="text-xs">
              {t(advertisingType.CAR)}
            </option>
            <option value={advertisingType.PLANES} className="text-xs">
              {t(advertisingType.PLANES)}
            </option>
            <option value={advertisingType.SEA_COMPANIES} className="text-xs">
              {advertisingType.SEA_COMPANIES}
            </option>
            <option value={advertisingType.REAL_ESTATE} className="text-xs">
              {t(advertisingType.REAL_ESTATE)}
            </option>
            <option value={advertisingType.PRODUCT} className="text-xs">
              {t(advertisingType.PRODUCT)}
            </option>
            <option value={advertisingType.SERVICE} className="text-xs">
              {t(advertisingType.SERVICE)}
            </option>
            <option
              value={advertisingType.DELIVERY_SERVICE}
              className="text-xs"
            >
              {t(advertisingType.DELIVERY_SERVICE)}
            </option>
            <option value={advertisingType.USER} className="text-xs">
              {t(advertisingType.USER)}
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 top-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder={`${t("search")} ...`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 mb-4 border rounded-md border-primary outline-none"
        />
      </div>
      {filteredAds && filteredAds.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 md:gap-4 md:w-1/2">
          {filteredAds &&
            filteredAds.map((item, index) => (
              <AdsCard key={index} adsInfo={item} />
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

export default AdsListPage;
