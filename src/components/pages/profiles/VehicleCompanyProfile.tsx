import { useTranslation } from "react-i18next";
import { UserModel } from "../../../apis/user/type";
import { useCallback, useEffect, useState } from "react";
import { USER_TYPE } from "../../../constants";
import { useGetCompaniesVehiclesQuery } from "../../../apis/vehicle/queries";
import { MdLink } from "react-icons/md";
import { VehicleModel } from "../../../apis/vehicle/type";
import { useGetUserAdsQuery } from "../../../apis/ads/queries";
import { AdsModel } from "../../../apis/ads/type";
import AdsCard from "../advertising/AdsCard";
import UserInfoList from "./UserInfoList";
import { Link } from "react-router-dom";
import FollowButton from "../../const/follow-btn/FollowButton";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { roundToHalf } from "../../../utils";
import { Rate } from "antd";
import RatingDialog from "../../const/rating-dialog/RatingDialog";
import ChatButton from "../../const/chat-btn/ChatButton";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import Modal from "react-modal";

import "@sendbird/uikit-react/dist/index.css";
import { IoClose } from "react-icons/io5";

interface VehicleCompanyProfileProps {
  userInfo: UserModel;
  id: string | undefined;
}

const VehicleCompanyProfile = ({
  id,
  userInfo,
}: VehicleCompanyProfileProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("userId");
  const [isRatingDialogVisible, setRatingDialogVisible] =
    useState<boolean>(false);
  const [firstTab, setFirstTab] = useState("");
  const [activeTab, setActiveTab] = useState("");
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
    { tab: "my_ads", label: "my_ads" },
    { tab: "about_us", label: "about_us" },
  ];
  const [channelUrl, setChannelUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  const {
    data: vehicleList,
    isLoading: isLoadingVehicles,
    isError: isErrorVehicles,
  } = useGetCompaniesVehiclesQuery(id ?? "", activeTab === firstTab);
  const {
    data: userAdsInfo,
    isLoading: isLoadingAds,
    isError: isErrorAds,
  } = useGetUserAdsQuery(id ?? "", activeTab === "my_ads");

  const showRatingDialog = () => {
    if (!isAuthenticated) {
      toast.error("you must be authenticated, login first");
    } else {
      if (userId !== userInfo._id) {
        setRatingDialogVisible(true);
      }
    }
  };
  const hideRatingDialog = () => {
    setRatingDialogVisible(false);
  };
  const handleCreateChannel = (url: string) => {
    setChannelUrl(url);
    openModal();
  };

  return (
    <div className="flex flex-col justify-start items-start  py-2 font-header w-full md:w-[60%] md:mx-auto md:py-5">
      {userInfo.coverPhoto && (
        <img
          src={userInfo.coverPhoto}
          alt="cover image"
          className="w-full h-[200px] shadow-md"
        />
      )}
      <div className="px-1 flex flex-col w-full ">
        <div className="flex flex-row justify-between items-start w-full mt-4">
          <div className="flex flex-row">
            <img
              src={userInfo?.profilePhoto}
              alt="profile image"
              className="h-24 w-24 rounded-full border border-primary"
              crossOrigin="anonymous"
            />
            <div
              className="flex flex-col space-y-2 justify-start items-stretch mx-2 cursor-pointer"
              onClick={showRatingDialog}
            >
              <p className="font-bold text-black">{userInfo?.username}</p>
              <p className="text-sm text-gray-500">{userInfo?.slogn}</p>
              <div className="flex flex-row gap-x-2 text-sm">
                <Rate
                  allowHalf
                  value={roundToHalf(userInfo?.averageRating ?? 0)}
                  disabled
                  className="custom-rate"
                  // style={{ fontSize: 36 }}
                />
                {/* <p className="text-sm">{userInfo?.averageRating}</p> */}
                <p className="text-sm text-gray-500">{`(${userInfo?.totalRatings} Reviews)`}</p>
              </div>
            </div>
          </div>
          <RatingDialog
            id={userInfo._id ?? ""}
            userId={userId ?? ""}
            visible={isRatingDialogVisible}
            onClose={hideRatingDialog}
            // onRatingSubmit={handleRatingSubmit}
          />
          <FollowButton otherUserId={userInfo._id ?? ""} />
        </div>
        <p className="text-gray-600 mt-2">{userInfo?.bio}</p>
        {userInfo.link && (
          <div
            className="flex gap-x-2 items-center"
            onClick={() => {
              window.open(`https://${userInfo.link}`, "_blank");
            }}
          >
            <MdLink />
            <p className="text-blue-500 underline">{userInfo.link}</p>
          </div>
        )}
        <div className="w-full flex flex-row justify-center items-center gap-x-3 md:gap-x-10 mt-4">
          <ChatButton
            userId={userId ?? ""}
            otherPersonId={userInfo.username}
            onCreateChannel={handleCreateChannel}
            coverUrl={userInfo.profilePhoto ?? ""}
          />
          <button className="py-2 w-32 h-fit bg-primary text-white rounded-full justify-center items-center">
            {t("live_auction")}
          </button>
        </div>
        <div className="grid grid-cols-3 grid-flow-row  font-semibold text-2xl border-t uppercase text-secondary tracking-widest md:h-16 h-8 lg:text-xs my-10 w-full">
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
              ? "md:grid-cols-3 grid-cols-2 "
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
          </>
          <>
            {activeTab === "my_ads" &&
            !isLoadingAds &&
            !isErrorAds &&
            userAdsInfo &&
            userAdsInfo.length > 0
              ? [...userAdsInfo]
                  .reverse()
                  .map((ads: AdsModel, index: number) => (
                    <div key={index}>
                      <AdsCard adsInfo={ads} />
                    </div>
                  ))
              : activeTab === "my_ads" &&
                !isLoadingAds &&
                !isErrorAds &&
                userAdsInfo && (
                  <div className="w-full">
                    <p>{t("no_data_to_show")}</p>
                  </div>
                )}
            {activeTab === "my_ads" && isLoadingAds && <p>Loading...</p>}
            {activeTab === "my_ads" && isErrorAds && <p>Error loading Items</p>}
          </>
          <>
            {activeTab === "about_us" && <UserInfoList userInfo={userInfo} />}
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
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-[96%] min-w-[90%] md:max-w-2xl md:min-w-[50%] h-[70%]  md:h-[500px] mt-20 flex flex-col">
          <div className="w-full flex justify-end items-center mb-2">
            <IoClose className="w-6 h-6 cursor-pointer " onClick={closeModal} />
          </div>
          <GroupChannel channelUrl={channelUrl} />
        </div>
      </Modal>
    </div>
  );
};

export default VehicleCompanyProfile;
