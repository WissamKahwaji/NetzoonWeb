import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import {
  useGetAllCarsQuery,
  useGetAllPlanesQuery,
} from "../../apis/vehicle/queries";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { VehicleModel, VehicleType } from "../../apis/vehicle/type";

const VehiclesListPage = () => {
  const { t } = useTranslation();
  const { vehicleType } = useParams<{ vehicleType: string }>();
  const { country } = useCountry();
  const [vehicleList, setVehicleList] = useState<VehicleModel[]>([]);
  const {
    data: carsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAllCarsQuery(country, vehicleType === VehicleType.CARS);
  const {
    data: plansInfo,
    isError: isErrorPlans,
    isLoading: isLoadingPlans,
    refetch: refetchPlans,
  } = useGetAllPlanesQuery(country, vehicleType === VehicleType.PLANES);
  // const {
  //   data: shipsInfo,
  //   isError: isErrorShips,
  //   isLoading: isLoadingShips,
  //   refetch: refetchShips,
  // } = useGetAllShipsQuery(country, filterType === VehicleType.SHIPS);
  const [searchTerm, setSearchTerm] = useState("");
  //   const navigate = useNavigate();
  useEffect(() => {
    refetch();
    refetchPlans();
    if (carsInfo && vehicleType === VehicleType.CARS) {
      setVehicleList(carsInfo);
    } else if (plansInfo && vehicleType === VehicleType.PLANES) {
      setVehicleList(plansInfo);
    }
  }, [carsInfo, country, plansInfo, refetch, refetchPlans, vehicleType]);
  if (isError || isErrorPlans) return <div>Error !!!</div>;
  if (isLoading || isLoadingPlans) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredCars = vehicleList?.filter(vehicle =>
    vehicle.name!.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredCars && filteredCars.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-4 md:w-3/4">
          {filteredCars &&
            filteredCars.map((item, index) => (
              <Link to={`${item._id}`}>
                <div
                  key={index}
                  className="relative w-[180px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                    <p className="text-sm font-semibold">{item.name}</p>
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

export default VehiclesListPage;
