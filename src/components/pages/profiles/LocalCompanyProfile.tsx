import { useTranslation } from "react-i18next";
import { UserModel } from "../../../apis/user/type";

import { MdLink } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";

import { ProductModel } from "../../../apis/product/type";
import ProductCard from "../product/ProductCard";
import { useGetUserProductsQuery } from "../../../apis/product/queries";
import { useGetUserAdsQuery } from "../../../apis/ads/queries";
import { AdsModel } from "../../../apis/ads/type";
import AdsCard from "../advertising/AdsCard";

import UserInfoList from "./UserInfoList";
import { useGetUserServicesQuery } from "../../../apis/services/queries";
import { ServiceModel } from "../../../apis/services/type";
import ServiceCard from "../services/ServiceCard";
import { Link } from "react-router-dom";
import FollowButton from "../../const/follow-btn/FollowButton";
import { Rate } from "antd";
import "./star.css";
import { roundToHalf } from "../../../utils";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import RatingDialog from "../../const/rating-dialog/RatingDialog";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import Modal from "react-modal";

import "@sendbird/uikit-react/dist/index.css";
import ChatButton from "../../const/chat-btn/ChatButton";
import { IoClose } from "react-icons/io5";

interface LocalCompanyProfileProps {
  userInfo: UserModel;
  id: string | undefined;
}

const LocalCompanyProfile = ({ userInfo, id }: LocalCompanyProfileProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("userId");
  const [firstTab, setFirstTab] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isRatingDialogVisible, setRatingDialogVisible] =
    useState<boolean>(false);
  useEffect(() => {
    if (userInfo.isService === true) {
      setFirstTab("services");
      setActiveTab("services");
    } else {
      setFirstTab("products");
      setActiveTab("products");
    }
  }, [userInfo.isService]);
  const tabs = [
    { tab: firstTab, label: firstTab },
    { tab: "my_ads", label: "my_ads" },
    { tab: "about_us", label: "about_us" },
  ];
  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  const {
    data: userProductsInfo,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetUserProductsQuery(
    id ?? "",
    firstTab === "products" && activeTab === firstTab
  );
  const {
    data: userServicesInfo,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = useGetUserServicesQuery(
    id ?? "",
    firstTab === "services" && activeTab === firstTab
  );
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
          crossOrigin="anonymous"
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
            <div className="flex flex-col space-y-2 justify-start items-stretch mx-2">
              <p className="font-bold text-black">{userInfo?.username}</p>
              <p className="text-sm text-gray-500">{userInfo?.slogn}</p>
              <div
                className="flex flex-row gap-x-2 text-sm cursor-pointer"
                onClick={showRatingDialog}
              >
                {/* <p className="text-sm">{userInfo?.averageRating}</p> */}
                <Rate
                  allowHalf
                  value={roundToHalf(userInfo?.averageRating ?? 0)}
                  disabled
                  className="custom-rate"
                  // style={{ fontSize: 36 }}
                />
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
          {/* <button className="py-1 w-24 h-fit bg-primary text-white rounded-full justify-center items-center">
            {t("follow")}
          </button> */}
          <FollowButton otherUserId={userInfo._id ?? ""} />
        </div>
        <p className="text-gray-600 mt-2">{userInfo?.bio}</p>
        {userInfo.link && (
          <div
            className="flex gap-x-2 items-center cursor-pointer"
            onClick={() => {
              window.open(`https://${userInfo.link}`, "_blank");
            }}
          >
            <MdLink />
            <p className="text-blue-500 underline">{userInfo.link}</p>
          </div>
        )}
        <div className="mt-5 w-full flex flex-row justify-center items-center gap-x-8 md:gap-x-16 capitalize">
          <div className="flex flex-col justify-center items-center space-y-1">
            <p>{userInfo.followings?.length}</p>
            <p className="text-gray-500 text-sm">{t("followings")}</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <p>{userInfo.followers?.length}</p>
            <p className="text-gray-500 text-sm">{t("followers")}</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <p>{userInfo.uniqueProfileVisitors?.length}</p>
            <p className="text-gray-500 text-sm">{t("visitors")}</p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3 md:gap-x-10 mt-4">
          {/* <button className="py-2 w-32 h-fit bg-primary text-white rounded-full justify-center items-center">
              {t("chat")}
            </button> */}
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
            firstTab === "products" &&
            !isLoadingProducts &&
            !isErrorProducts &&
            userProductsInfo &&
            userProductsInfo.length > 0
              ? [...userProductsInfo]
                  .reverse()
                  .map((product: ProductModel, index: number) => (
                    <div key={index}>
                      <ProductCard product={product} />
                    </div>
                  ))
              : activeTab === firstTab &&
                firstTab === "products" &&
                !isLoadingProducts &&
                !isErrorProducts &&
                userProductsInfo && (
                  <div className="w-full">
                    <p>{t("no_data_to_show")}</p>
                  </div>
                )}
            {activeTab === firstTab &&
            firstTab === "services" &&
            !isLoadingServices &&
            !isErrorServices &&
            userServicesInfo &&
            userServicesInfo.length > 0
              ? [...userServicesInfo]
                  .reverse()
                  .map((service: ServiceModel, index: number) => (
                    <Link key={index} to={`services/${service._id}`}>
                      <ServiceCard service={service} />
                    </Link>
                  ))
              : activeTab === firstTab &&
                firstTab === "services" &&
                !isLoadingServices &&
                !isErrorServices &&
                userServicesInfo && (
                  <div className="w-full">
                    <p>{t("no_data_to_show")}</p>
                  </div>
                )}
            {activeTab === firstTab &&
              (isLoadingProducts || isLoadingServices) && <p>Loading...</p>}
            {activeTab === firstTab && (isErrorProducts || isErrorServices) && (
              <p>Error loading Items</p>
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

export default LocalCompanyProfile;
