import { useTranslation } from "react-i18next";
import { UserModel } from "../../../apis/user/type";
import { useCallback, useState } from "react";
import { useGetCompanyDeliveryServicesQuery } from "../../../apis/delivery_service/queries";
import { useGetUserAdsQuery } from "../../../apis/ads/queries";
import { DeliverServiceModel } from "../../../apis/delivery_service/type";
import { AdsModel } from "../../../apis/ads/type";
import AdsCard from "../advertising/AdsCard";
import UserInfoList from "./UserInfoList";
import { getCurrencyFromCountry } from "../../../utils";
import { useCountry } from "../../../context/CountryContext";

interface DeliveryCompanyProfileProps {
  userInfo: UserModel;
  id: string | undefined;
}
const DeliveryCompanyProfile = ({
  id,
  userInfo,
}: DeliveryCompanyProfileProps) => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const [activeTab, ActiveTab] = useState("services");
  const tabs = [
    { tab: "services", label: "services" },
    { tab: "my_ads", label: "my_ads" },
    { tab: "about_us", label: "about_us" },
  ];
  const handleTabClick = useCallback((tab: string) => {
    ActiveTab(tab);
  }, []);

  const {
    data: servicesList,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = useGetCompanyDeliveryServicesQuery(id ?? "", activeTab === "services");
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
            activeTab === "real_estate"
              ? "md:grid-cols-3 grid-cols-2 "
              : activeTab === "about_us"
              ? "md:grid-cols-1  grid-cols-1"
              : "md:grid-cols-2  grid-cols-1"
          }  gap-2 lg:gap-3 my-3 md:my-5 py-1 md:py-2 px-1 md:px-2`}
        >
          <>
            {activeTab === "services" &&
            !isLoadingServices &&
            !isErrorServices &&
            servicesList &&
            servicesList.length > 0
              ? [...servicesList]
                  .reverse()
                  .map((item: DeliverServiceModel, index: number) => (
                    <div
                      key={index}
                      className="w-full shadow-md rounded-lg px-4 py-2 flex flex-col justify-start items-start space-y-2 cursor-pointer hover:scale-105 transform ease-in-out duration-300"
                    >
                      <p className="text-primary font-bold">{item.title}</p>
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center w-full">
                        <p>{`from ${item.from}`}</p>
                        <p>{`To ${item.to}`}</p>
                      </div>
                      <p className="font-bold text-primary">
                        {item.price}
                        {getCurrencyFromCountry(country)}
                      </p>
                    </div>
                  ))
              : activeTab === "services" &&
                !isLoadingServices &&
                !isErrorServices &&
                servicesList && (
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
    </div>
  );
};

export default DeliveryCompanyProfile;
