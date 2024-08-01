import { useTranslation } from "react-i18next";
import { UserModel } from "../../../apis/user/type";
import { useCallback, useState } from "react";
import { MdLink } from "react-icons/md";
import { useGetUserAdsQuery } from "../../../apis/ads/queries";
import { useGetCompanyRealEstatesQuery } from "../../../apis/real_estate/queries";
import UserInfoList from "./UserInfoList";
import AdsCard from "../advertising/AdsCard";
import { AdsModel } from "../../../apis/ads/type";
import { RealEstateModel } from "../../../apis/real_estate/type";
import { Link } from "react-router-dom";

interface RealEstateCompanyProfileProps {
  userInfo: UserModel;
  id: string | undefined;
}
const RealEstateCompanyProfile = ({
  userInfo,
  id,
}: RealEstateCompanyProfileProps) => {
  const { t } = useTranslation();
  const [activeTab, ActiveTab] = useState("real_estate");
  const tabs = [
    { tab: "real_estate", label: "real_estate" },
    { tab: "my_ads", label: "my_ads" },
    { tab: "about_us", label: "about_us" },
  ];
  const handleTabClick = useCallback((tab: string) => {
    ActiveTab(tab);
  }, []);

  const {
    data: realEstateList,
    isLoading: isLoadingRealEstate,
    isError: isErrorRealEstate,
  } = useGetCompanyRealEstatesQuery(id ?? "", activeTab === "real_estate");
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
            {activeTab === "real_estate" &&
            !isLoadingRealEstate &&
            !isErrorRealEstate &&
            realEstateList &&
            realEstateList.length > 0
              ? [...realEstateList]
                  .reverse()
                  .map((item: RealEstateModel, index: number) => (
                    <Link key={index} to={`/real-estate/${item._id}`}>
                      <div className="px-2">
                        <div className="relative w-[180px] h-[160px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300">
                          <div className="absolute top-0 left-0 right-0 bg-primary/40 bg-opacity-50 text-white text-center py-2 rounded-t-lg">
                            <p className="text-sm font-semibold">
                              {item.title}
                            </p>
                          </div>
                          <img
                            src={item.imageUrl}
                            crossOrigin="anonymous"
                            alt={`card image`}
                            className="w-full h-full object-center rounded-lg"
                          />
                        </div>
                      </div>
                    </Link>
                  ))
              : activeTab === "real_estate" &&
                !isLoadingRealEstate &&
                !isErrorRealEstate &&
                realEstateList && (
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

export default RealEstateCompanyProfile;
