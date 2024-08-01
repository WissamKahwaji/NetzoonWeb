import { useParams } from "react-router-dom";
import { useGetAdsByIdQuery } from "../../apis/ads/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { advertisingType } from "../../apis/ads/type";
import CarAdsInfoPage from "../../components/pages/advertising/CarAdsInfoPage";
import AdsInfoPage from "../../components/pages/advertising/AdsInfoPage";

const AdsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: adsInfo, isError, isLoading } = useGetAdsByIdQuery(id);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div>
      {adsInfo?.advertisingType === advertisingType.CAR ? (
        <CarAdsInfoPage adsInfo={adsInfo} />
      ) : (
        adsInfo && <AdsInfoPage adsInfo={adsInfo} />
      )}
    </div>
  );
};

export default AdsDetailsPage;
