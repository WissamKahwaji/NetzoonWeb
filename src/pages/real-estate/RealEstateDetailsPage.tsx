import { useParams } from "react-router-dom";
import { useGetRealEstateByIdQuery } from "../../apis/real_estate/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import RealEstateDetailsMobile from "../../components/pages/real-estate/RealEstateDetailsMobile";
import RealEstateDetailsWeb from "../../components/pages/real-estate/RealEstateDetailsWeb";

const RealEstateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: realEstateInfo,
    isError,
    isLoading,
  } = useGetRealEstateByIdQuery(id!);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <div className="flex md:hidden">
        <RealEstateDetailsMobile realEstateInfo={realEstateInfo} />
      </div>
      <div className="md:flex hidden">
        <RealEstateDetailsWeb realEstateInfo={realEstateInfo} />
      </div>
    </>
  );
};

export default RealEstateDetailsPage;
