import { useEffect } from "react";
import { useGetUserByIdQuery } from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useNavigate } from "react-router-dom";

import { USER_TYPE } from "../../constants";
import MyLocalCompanyProfile from "../../components/pages/my-profile/MyLocalCompanyProfile";
import MyUserProfile from "../../components/pages/my-profile/MyUserProfile";
import MyVehicleCompanyProfile from "../../components/pages/my-profile/MyVehicleCompanyProfile";
import MyRealEstateCompanyProfile from "../../components/pages/my-profile/MyRealEstateCompanyProfile";
import MyDeliveryCompanyProfile from "../../components/pages/my-profile/MyDeliveryCompanyProfile";

const MyProfilePage = () => {
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/", { replace: true });
    }
  }, [navigate, userId]);
  const {
    data: userInfo,
    isError,
    isLoading,
  } = useGetUserByIdQuery(userId ?? "");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <>
      {userInfo?.userType === USER_TYPE.USER && (
        <MyUserProfile userInfo={userInfo} />
      )}
      {(userInfo?.userType === USER_TYPE.LOCAL_COMPANY ||
        userInfo?.userType === USER_TYPE.FREEZONE ||
        userInfo?.userType === USER_TYPE.TRADER ||
        userInfo?.userType === USER_TYPE.FACTORY) && (
        <MyLocalCompanyProfile userInfo={userInfo} />
      )}
      {(userInfo?.userType === USER_TYPE.CAR ||
        userInfo?.userType === USER_TYPE.PLANES ||
        userInfo?.userType === USER_TYPE.SEA_COMPANIES) && (
        <MyVehicleCompanyProfile userInfo={userInfo} />
      )}
      {userInfo?.userType === USER_TYPE.REAL_ESTATE && (
        <MyRealEstateCompanyProfile userInfo={userInfo} />
      )}
      {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
        <MyDeliveryCompanyProfile userInfo={userInfo} />
      )}
    </>
  );
};

export default MyProfilePage;
