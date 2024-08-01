import { useTranslation } from "react-i18next";
import { UserModel } from "../../../apis/user/type";
import { Link } from "react-router-dom";

interface UserInfoListProps {
  userInfo: UserModel;
}

const UserInfoList = ({ userInfo }: UserInfoListProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-3 w-full capitalize">
      <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
        <p>{t("company_name")}</p>
        <p>{userInfo.username}</p>
      </div>
      {userInfo.description && (
        <div className="flex flex-col space-y-2 justify-start items-start w-full   border-b  border-primary/30">
          <p>{t("description")}</p>
          <p>{userInfo.description}</p>
        </div>
      )}
      {userInfo.firstMobile && (
        <div className="grid grid-cols-2 grid-flow-row    border-b  border-primary/30">
          <p>{t("mobile")}</p>
          <Link to={`tel:${userInfo.firstMobile}`}>
            <div className="px-3 py-1 rounded-full bg-primary shadow-sm text-white mb-1  justify-center items-center w-full flex">
              <p>{userInfo.firstMobile}</p>
            </div>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 grid-flow-row w-full   border-b  border-primary/30">
        <p>{t("email")}</p>
        <Link to={`mailto:${userInfo.email}`}>
          <p>{userInfo.email}</p>
        </Link>
      </div>
      {userInfo.bio && (
        <div className="flex flex-col space-y-2 justify-start items-start w-full   border-b  border-primary/30">
          <p>{t("bio")}</p>
          <p>{userInfo.bio}</p>
        </div>
      )}
      {userInfo.addressDetails && (
        <div className="grid grid-cols-2 grid-flow-row w-full   border-b  border-primary/30">
          <p>{t("address")}</p>
          <p>{userInfo.addressDetails}</p>
        </div>
      )}
      {userInfo.website && (
        <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
          <p>{t("website")}</p>
          <p>{userInfo.website}</p>
        </div>
      )}
      {userInfo.link && (
        <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
          <p>{t("link")}</p>
          <p>{userInfo.link}</p>
        </div>
      )}
      {userInfo.deliveryType && (
        <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
          <p>{t("delivery_type")}</p>
          <p>{userInfo.deliveryType}</p>
        </div>
      )}
      {userInfo.deliveryCarsNum && (
        <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
          <p>{t("deliveryCarsNum")}</p>
          <p>{userInfo.deliveryCarsNum}</p>
        </div>
      )}
      {userInfo.deliveryMotorsNum && (
        <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
          <p>{t("deliveryMotorsNum")}</p>
          <p>{userInfo.deliveryMotorsNum}</p>
        </div>
      )}
      {userInfo.isThereWarehouse !== undefined && (
        <div className="grid grid-cols-2 grid-flow-row  w-full   border-b  border-primary/30">
          <p>{t("is_there_a_warehouse")}</p>
          <p>{userInfo.isThereWarehouse === true ? "yes" : "no"}</p>
        </div>
      )}
      {userInfo.isThereFoodsDelivery !== undefined && (
        <div className="grid grid-cols-2 grid-flow-row gap-x-2 w-full   border-b  border-primary/30">
          <p>{t("is_there_food_delivery")}</p>
          <p>{userInfo.isThereFoodsDelivery === true ? "yes" : "no"}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfoList;
