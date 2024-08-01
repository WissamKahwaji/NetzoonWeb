import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

import { USER_TYPE } from "../../constants";
import UserProfile from "../../components/pages/profiles/UserProfile";
import LocalCompanyProfile from "../../components/pages/profiles/LocalCompanyProfile";
import VehicleCompanyProfile from "../../components/pages/profiles/VehicleCompanyProfile";
import RealEstateCompanyProfile from "../../components/pages/profiles/RealEstateCompanyProfile";
import DeliveryCompanyProfile from "../../components/pages/profiles/DeliveryCompanyProfile";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userInfo, isError, isLoading } = useGetUserByIdQuery(id ?? "");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <>
      {userInfo?.userType === USER_TYPE.USER && (
        <UserProfile userInfo={userInfo} id={id} />
      )}
      {(userInfo?.userType === USER_TYPE.LOCAL_COMPANY ||
        userInfo?.userType === USER_TYPE.FREEZONE ||
        userInfo?.userType === USER_TYPE.TRADER ||
        userInfo?.userType === USER_TYPE.FACTORY) && (
        <LocalCompanyProfile userInfo={userInfo} id={id} />
      )}
      {(userInfo?.userType === USER_TYPE.CAR ||
        userInfo?.userType === USER_TYPE.PLANES ||
        userInfo?.userType === USER_TYPE.SEA_COMPANIES) && (
        <VehicleCompanyProfile userInfo={userInfo} id={id} />
      )}
      {userInfo?.userType === USER_TYPE.REAL_ESTATE && (
        <RealEstateCompanyProfile userInfo={userInfo} id={id} />
      )}
      {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
        <DeliveryCompanyProfile userInfo={userInfo} id={id} />
      )}
    </>
  );
};

export default ProfilePage;
