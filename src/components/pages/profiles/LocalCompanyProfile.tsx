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

interface LocalCompanyProfileProps {
  userInfo: UserModel;
  id: string | undefined;
}

const LocalCompanyProfile = ({ userInfo, id }: LocalCompanyProfileProps) => {
  const { t } = useTranslation();
  const [firstTab, setFirstTab] = useState("");
  const [activeTab, setActiveTab] = useState("");

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
            <div className="flex flex-col space-y-2 justify-start items-stretch mx-2">
              <p className="font-bold text-black">{userInfo?.username}</p>
              <p className="text-sm text-gray-500">{userInfo?.slogn}</p>
              <div className="flex flex-row gap-x-2 text-sm">
                <p className="text-sm">{userInfo?.averageRating}</p>
                <p className="text-sm text-gray-500">{`(${userInfo?.totalRatings} Reviews)`}</p>
              </div>
            </div>
          </div>
          <button className="py-1 w-24 h-fit bg-primary text-white rounded-full justify-center items-center">
            Follow
          </button>
        </div>
        <p className="text-gray-600 mt-2">{userInfo?.bio}</p>
        {userInfo.link && (
          <div className="flex gap-x-2 items-center">
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
          <button className="py-2 w-32 h-fit bg-primary text-white rounded-full justify-center items-center">
            {t("chat")}
          </button>
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
    </div>
  );
};

export default LocalCompanyProfile;
