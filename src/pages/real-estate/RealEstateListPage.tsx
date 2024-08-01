import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useState } from "react";
import { useGetRealEstateListQuery } from "../../apis/real_estate/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { Link } from "react-router-dom";

const RealEstateListPage = () => {
  const { t } = useTranslation();

  const { country } = useCountry();

  const {
    data: realEstateInfo,
    isError,
    isLoading,
  } = useGetRealEstateListQuery(country);

  const [searchTerm, setSearchTerm] = useState("");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredRealEstate = realEstateInfo?.filter(realEstate =>
    realEstate.title!.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="w-full md:w-3/4">
        <input
          type="text"
          placeholder={`${t("search")} ...`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 mb-4 border rounded-md border-primary outline-none"
        />
      </div>
      {filteredRealEstate && filteredRealEstate.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-4 md:w-3/4">
          {filteredRealEstate &&
            filteredRealEstate.map((item, index) => (
              <Link to={`${item._id}`}>
                <div
                  key={index}
                  className="relative w-[180px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                  <img
                    src={item.imageUrl}
                    crossOrigin="anonymous"
                    alt={`card image`}
                    className="w-full h-full object-center rounded-lg"
                  />
                </div>
              </Link>
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

export default RealEstateListPage;
