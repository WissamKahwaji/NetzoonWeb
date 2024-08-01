import { Link, useParams } from "react-router-dom";
import { useCountry } from "../../context/CountryContext";
import { useTranslation } from "react-i18next";
import { useGetServicesByCategoryQuery } from "../../apis/services/queries";
import { useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import ServiceCard from "../../components/pages/services/ServiceCard";

const ServiceListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { country } = useCountry();
  const { t } = useTranslation();
  const {
    data: servicesListInfo,
    isError,
    isLoading,
  } = useGetServicesByCategoryQuery(categoryId ?? "", country);
  const [searchTerm, setSearchTerm] = useState("");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredService = servicesListInfo?.services.filter(service =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredService && filteredService.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-4 md:w-1/2 ">
          {filteredService &&
            filteredService.map((service, index) => (
              <Link to={`${service._id}`}>
                <ServiceCard key={index} service={service} />
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

export default ServiceListPage;
