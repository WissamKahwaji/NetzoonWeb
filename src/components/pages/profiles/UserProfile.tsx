import { useCallback, useState } from "react";
import { UserModel } from "../../../apis/user/type";
import { useGetUserSelectedProductsQuery } from "../../../apis/user/queries";
import { useGetUserAdsQuery } from "../../../apis/ads/queries";
import { useGetUserDealsQuery } from "../../../apis/deals/queries";
import { useTranslation } from "react-i18next";
import { ProductModel } from "../../../apis/product/type";
import ProductCard from "../product/ProductCard";
import { AdsModel } from "../../../apis/ads/type";
import AdsCard from "../advertising/AdsCard";
import { DealsItemModel } from "../../../apis/deals/type";
import DealCard from "../deals/DealCard";

interface UserProfileProps {
  userInfo: UserModel;
  id: string | undefined;
}
const UserProfile = ({ userInfo, id }: UserProfileProps) => {
  const { t } = useTranslation();
  const [activeTab, ActiveTab] = useState("companies_products");
  const tabs = [
    { tab: "companies_products", label: "companies_products" },
    { tab: "my_ads", label: "my_ads" },
    { tab: "deals", label: "deals" },
  ];
  const handleTabClick = useCallback((tab: string) => {
    ActiveTab(tab);
  }, []);

  const {
    data: userProductsInfo,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetUserSelectedProductsQuery(
    id ?? "",
    activeTab === "companies_products"
  );
  const {
    data: userAdsInfo,
    isLoading: isLoadingAds,
    isError: isErrorAds,
  } = useGetUserAdsQuery(id ?? "", activeTab === "my_ads");

  const {
    data: userDealsInfo,
    isLoading: isLoadingDeals,
    isError: isErrorDeals,
  } = useGetUserDealsQuery(id ?? "", activeTab === "deals");

  return (
    <div className="flex flex-col justify-start items-start px-1 py-2 font-header w-full md:w-[60%] md:mx-auto md:py-5">
      <div className="flex flex-row justify-between items-start w-full">
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
      <div className="w-full flex flex-row justify-center items-center gap-x-3 mt-4">
        <button className="py-2 w-32 h-fit bg-primary text-white rounded-full justify-center items-center">
          Chat
        </button>
        <button className="py-2 w-32 h-fit bg-primary text-white rounded-full justify-center items-center">
          Live Auction
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
          activeTab === "companies_products"
            ? "md:grid-cols-3 grid-cols-2 "
            : "md:grid-cols-2  grid-cols-1"
        }  gap-2 lg:gap-3 my-3 md:my-5 py-1 md:py-2 px-1 md:px-2`}
      >
        <>
          {activeTab === "companies_products" &&
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
            : activeTab === "companies_products" &&
              !isLoadingProducts &&
              !isErrorProducts &&
              userProductsInfo && (
                <div className="w-full">
                  <p>{t("no_data_to_show")}</p>
                </div>
              )}
          {activeTab === "companies_products" && isLoadingProducts && (
            <p>Loading...</p>
          )}
          {activeTab === "companies_products" && isErrorProducts && (
            <p>Error loading Items</p>
          )}
        </>
        <>
          {activeTab === "my_ads" &&
          !isLoadingAds &&
          !isErrorAds &&
          userAdsInfo &&
          userAdsInfo.length > 0
            ? [...userAdsInfo].reverse().map((ads: AdsModel, index: number) => (
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
          {activeTab === "deals" &&
          !isLoadingDeals &&
          !isErrorDeals &&
          userDealsInfo &&
          userDealsInfo.length > 0
            ? [...userDealsInfo]
                .reverse()
                .map((deal: DealsItemModel, index: number) => (
                  <div key={index}>
                    <DealCard item={deal} />
                  </div>
                ))
            : activeTab === "deals" &&
              !isLoadingDeals &&
              !isErrorDeals &&
              userDealsInfo && (
                <div className="w-full">
                  <p>{t("no_data_to_show")}</p>
                </div>
              )}
          {activeTab === "deals" && isLoadingDeals && <p>Loading...</p>}
          {activeTab === "deals" && isErrorDeals && <p>Error loading Items</p>}
        </>
      </div>
    </div>
  );
};

export default UserProfile;
