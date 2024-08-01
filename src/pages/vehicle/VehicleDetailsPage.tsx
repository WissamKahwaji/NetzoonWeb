import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../apis/vehicle/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

import VehicleDetailsMobile from "../../components/pages/vehicle/VehicleDetailsMobile";
import VehicleDetailsWeb from "../../components/pages/vehicle/VehicleDetailsWeb";

const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: vehicleInfo, isError, isLoading } = useGetVehicleByIdQuery(id!);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <div className="flex md:hidden">
        <VehicleDetailsMobile vehicleInfo={vehicleInfo} />
      </div>
      <div className="md:flex hidden">
        <VehicleDetailsWeb vehicleInfo={vehicleInfo} />
      </div>
    </>
  );
};

export default VehicleDetailsPage;
