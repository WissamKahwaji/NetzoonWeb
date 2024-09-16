import { useCallback, useEffect, useState } from "react";
import { SignInValues, UserModel } from "../../../apis/user/type";
import { useTranslation } from "react-i18next";
import { FaCarAlt, FaUserEdit } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import { IoChatboxEllipsesOutline, IoClose } from "react-icons/io5";
import CircleIconText from "../../circle-icon-text";
import UserInfoList from "../profiles/UserInfoList";
import { USER_TYPE } from "../../../constants";
import { useGetCompaniesVehiclesQuery } from "../../../apis/vehicle/queries";
import { VehicleModel } from "../../../apis/vehicle/type";
import { Link, useNavigate } from "react-router-dom";
import {
  useChangeAccountMutation,
  useGetUserAccountsQuery,
} from "../../../apis/user/queries";
import Modal from "react-modal";
import LoadingComponent from "../loading/LoadingComponent";
import { IoIosArrowDown, IoMdAddCircle } from "react-icons/io";

interface MyVehicleCompanyProfileProps {
  userInfo: UserModel;
}
const MyVehicleCompanyProfile = ({
  userInfo,
}: MyVehicleCompanyProfileProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [activeTab, setActiveTab] = useState("about_us");
  const [firstTab, setFirstTab] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: changeAccount } = useChangeAccountMutation();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const {
    data: vehicleList,
    isLoading: isLoadingVehicles,
    isError: isErrorVehicles,
  } = useGetCompaniesVehiclesQuery(userId ?? "", activeTab === firstTab);
  const {
    data: userAccounts,
    isLoading: isLoadingUserAccounts,
    isError: isErrorUserAccounts,
  } = useGetUserAccountsQuery(userInfo.email, isModalOpen);

  useEffect(() => {
    if (userInfo.userType === USER_TYPE.CAR) {
      setFirstTab("carss");
      setActiveTab("carss");
    } else if (userInfo.userType === USER_TYPE.PLANES) {
      setFirstTab("planes");
      setActiveTab("planes");
    } else {
      setFirstTab("ships");
      setActiveTab("ships");
    }
  }, [userInfo.userType]);

  const tabs = [
    { tab: firstTab, label: firstTab },
    { tab: "about_us", label: "about_us" },
  ];

  const iconsmenu = [
    {
      text: "sold_items",
      icon: <FaCarAlt className="text-white text-lg" />,
    },
    {
      text: "netzoon_credits",
      icon: <MdWallet className="text-white text-lg" />,
      to: "netzoon-credits",
    },
    {
      text: "chat",
      icon: <IoChatboxEllipsesOutline className="text-white text-lg" />,
    },
    {
      text: "edit_profile",
      icon: <FaUserEdit className="text-white text-lg" />,
      to: "/my-account/edit-profile",
    },
  ];

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start  py-2 font-header w-full md:w-[60%] md:mx-auto md:py-5">
      {userInfo?.coverPhoto && (
        <img
          src={userInfo.coverPhoto}
          alt="cover image"
          className="w-full h-[200px] shadow-md object-contain"
        />
      )}
      <div className="px-1 flex flex-col w-full ">
        <div className="md:flex md:flex-row space-y-5 md:space-y-0 justify-between items-start w-full mt-4">
          <div className="flex flex-row">
            <img
              src={userInfo?.profilePhoto}
              alt="profile image"
              className="h-24 w-24 rounded-full border border-primary"
              crossOrigin="anonymous"
            />
            <div className="flex flex-col space-y-2 justify-start items-stretch mx-2">
              <div className="flex flex-row justify-start items-center gap-x-2">
                <p className="font-bold text-black">{userInfo?.username}</p>
                <IoIosArrowDown
                  className="w-4 h-4 cursor-pointer"
                  onClick={openModal}
                />
              </div>
              <p className="text-sm text-gray-500">{userInfo?.slogn}</p>
              <div className="flex flex-row gap-x-2 text-sm">
                <p className="text-sm">{userInfo?.averageRating}</p>
                <p className="text-sm text-gray-500">{`(${userInfo?.totalRatings} Reviews)`}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:gap-x-5 gap-y-3">
            {iconsmenu.map((icon, index) => (
              <Link to={icon.to ?? ""}>
                <CircleIconText key={index} text={icon.text} icon={icon.icon} />
              </Link>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mt-2">{userInfo?.bio}</p>
        <div className="mt-5 w-full flex flex-row justify-center items-center gap-x-8 md:gap-x-16 capitalize">
          <div className="flex flex-col justify-center items-center space-y-1">
            <p>{userInfo?.followings?.length}</p>
            <p className="text-gray-500 text-sm">{t("followings")}</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <p>{userInfo?.followers?.length}</p>
            <p className="text-gray-500 text-sm">{t("followers")}</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <p>{userInfo?.uniqueProfileVisitors?.length}</p>
            <p className="text-gray-500 text-sm">{t("visitors")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row  font-semibold text-2xl border-t uppercase text-secondary tracking-widest md:h-16 h-8 lg:text-xs mt-10 w-full">
          {tabs.map(({ tab, label }) => (
            <div
              key={tab}
              className={`${
                activeTab === tab
                  ? "text-primary border-t-2 border-primary pt-2 md:pt-0"
                  : "text-gray-400"
              } flex justify-center items-center w-full h-full md:mr-16  cursor-pointer`}
              onClick={() => handleTabClick(tab)}
            >
              <p className="text-[7px] md:text-sm ">{t(label)}</p>
            </div>
          ))}
        </div>
        <div
          className={`w-full grid ${
            activeTab === firstTab
              ? "md:grid-cols-2 grid-cols-2 "
              : activeTab === "about_us"
              ? "md:grid-cols-1  grid-cols-1"
              : "md:grid-cols-2  grid-cols-1"
          }  gap-2 lg:gap-3 my-3 md:my-5 py-1 md:py-2 px-1 md:px-2`}
        >
          <>
            {activeTab === firstTab &&
            !isLoadingVehicles &&
            !isErrorVehicles &&
            vehicleList &&
            vehicleList.length > 0
              ? [...vehicleList]
                  .reverse()
                  .map((vehicle: VehicleModel, index: number) => (
                    <div key={index}>
                      <Link key={index} to={`/vehicles/cars/${vehicle._id}`}>
                        <div className="px-2">
                          <div className="relative w-[180px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300">
                            <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                              <p className="text-sm font-semibold">
                                {vehicle.name}
                              </p>
                            </div>
                            <img
                              src={vehicle.imageUrl}
                              crossOrigin="anonymous"
                              alt={`card image`}
                              className="w-full h-full object-center rounded-lg"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
              : activeTab === firstTab &&
                !isLoadingVehicles &&
                !isErrorVehicles &&
                vehicleList && (
                  <div className="w-full">
                    <p>{t("no_data_to_show")}</p>
                  </div>
                )}
            {activeTab === firstTab && isLoadingVehicles && <p>Loading...</p>}
            {activeTab === firstTab && isErrorVehicles && (
              <p>Error loading Items</p>
            )}
          </>
          <>
            {activeTab === "about_us" && <UserInfoList userInfo={userInfo!} />}
          </>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {isLoadingUserAccounts && <LoadingComponent />}
        {isErrorUserAccounts && <div>Error!!</div>}
        <div className="bg-white p-4 justify-center items-center flex flex-col rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex flex-row gap-x-2 items-center">
            <p className="text-primary">{t("user_accounts")}</p>
            <IoClose className="w-4 h-4 cursor-pointer " onClick={closeModal} />
          </div>
          <div className="w-full mt-2 space-y-4">
            {userAccounts &&
              userAccounts.length > 0 &&
              userAccounts.map((account, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-x-2 items-center justify-start w-full cursor-pointer"
                  onClick={() => {
                    const inputParams: SignInValues = {
                      email: account.email,
                      password: account.password ?? "",
                    };
                    changeAccount(inputParams);
                  }}
                >
                  <img
                    src={account.profilePhoto}
                    alt="profile"
                    crossOrigin="anonymous"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm">{account.username}</p>
                </div>
              ))}
            <div
              className="flex flex-row gap-x-2 justify-start items-center mt-4 cursor-pointer"
              onClick={() => {
                navigate(`add-account`);
              }}
            >
              <IoMdAddCircle className="text-primary w-9 h-9" />
              <p className="text-sm">{t("add_netzoon_account")}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyVehicleCompanyProfile;
