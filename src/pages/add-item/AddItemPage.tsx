import { useTranslation } from "react-i18next";
import { useGetUserByIdQuery } from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

import AddItemContainer from "../../components/pages/add-item/AddItemContainer";
import { USER_TYPE } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

const AddItemPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const {
    data: userInfo,
    isLoading: isLoading,
    isError: isError,
  } = useGetUserByIdQuery(userId ?? "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {t("add_item")}
      </p>
      <p className="text-sm text-gray-600">
        {t("choose_the_category_you_want_to_add_to_it")}
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {userInfo?.userType === USER_TYPE.USER && (
          <AddItemContainer
            title={t("select_from_our_products")}
            text={t("select_product_desc")}
            onClick={() => {
              navigate("all-products");
            }}
          />
        )}
        {(userInfo?.userType === USER_TYPE.FACTORY ||
          userInfo?.userType === USER_TYPE.FREEZONE ||
          userInfo?.userType === USER_TYPE.TRADER ||
          (userInfo?.userType === USER_TYPE.LOCAL_COMPANY &&
            userInfo.isService === false)) && (
          <Link to={"product"} reloadDocument>
            <AddItemContainer
              title={t("add_product")}
              text={t("add_product_desc")}
            />
          </Link>
        )}
        {(userInfo?.userType === USER_TYPE.FACTORY ||
          (userInfo?.userType === USER_TYPE.LOCAL_COMPANY &&
            userInfo.isService === true)) && (
          <AddItemContainer
            title={t("add_service")}
            text={t("add_service_desc")}
            onClick={() => {
              navigate("service");
            }}
          />
        )}
        <AddItemContainer
          title={t("add_ads")}
          text={t("add_ads_desc")}
          // onClick={() => {
          //   navigate("adv");
          // }}
          onClick={openModal}
        />
        <AddItemContainer
          title={t("add_deals")}
          text={t("add_deals_desc")}
          onClick={() => {
            navigate("deal");
          }}
        />
        {userInfo?.userType === USER_TYPE.CAR && (
          <AddItemContainer
            title={t("add_car")}
            text={t("add_car_desc")}
            onClick={() => {
              navigate("vehicle/cars");
            }}
          />
        )}
        {userInfo?.userType === USER_TYPE.PLANES && (
          <AddItemContainer
            title={t("add_airplane")}
            text={t("add_airplane_desc")}
          />
        )}
        {userInfo?.userType === USER_TYPE.SEA_COMPANIES && (
          <AddItemContainer
            title={t("add_ship")}
            text={t("add_ship_desc")}
            onClick={() => {
              navigate("vehicle/sea_companies");
            }}
          />
        )}
        {userInfo?.userType === USER_TYPE.REAL_ESTATE && (
          <AddItemContainer
            title={t("add_real_estate")}
            text={t("add_real_estate_desc")}
            onClick={() => {
              navigate("real-estate");
            }}
          />
        )}
        {userInfo?.userType === USER_TYPE.NEWS_AGENCY && (
          <AddItemContainer
            title={t("add_news")}
            text={t("add_news_desc")}
            onClick={() => {
              navigate("news");
            }}
          />
        )}
        {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
          <AddItemContainer
            title={t("add_delivery_service")}
            text={t("add_delivery_service_desc")}
            onClick={() => {
              navigate("delivery-service");
            }}
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col space-y-4">
          <p className="text-xs text-primary">{t("add_ads_hint")}</p>
          <div
            className="w-full rounded-md border border-primary shadow shadow-primary mx-1 py-1 px-2 bg-white cursor-pointer"
            onClick={() => {
              navigate("adv/profile");
            }}
          >
            <p>{t("select_from_your_profile")}</p>
          </div>
          <p className="text-center">{t("or")}</p>
          <div
            className="w-full rounded-md border border-primary shadow shadow-primary mx-1 py-1 px-2 cursor-pointer"
            onClick={() => {
              navigate("adv");
            }}
          >
            <p>{t("add_something_new")}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddItemPage;
