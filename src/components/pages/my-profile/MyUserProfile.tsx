import {
  MdFavorite,
  MdLocationCity,
  MdOutlineEmail,
  MdOutlineViewList,
  MdWallet,
} from "react-icons/md";
import { SignInValues, UserModel } from "../../../apis/user/type";
import { FaBagShopping } from "react-icons/fa6";
import CircleIconText from "../../circle-icon-text";
import { FaMobileAlt, FaUser, FaUserEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import UserInfoCard from "../../const/userInfoCard/UserInfoCard";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useChangeAccountMutation,
  useGetUserAccountsQuery,
} from "../../../apis/user/queries";
import Modal from "react-modal";
import LoadingComponent from "../loading/LoadingComponent";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoMdAddCircle } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";

interface MyUserProfileProps {
  userInfo: UserModel;
}

const MyUserProfile = ({ userInfo }: MyUserProfileProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //   const userId = localStorage.getItem("userId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: changeAccount } = useChangeAccountMutation();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const {
    data: userAccounts,
    isLoading: isLoadingUserAccounts,
    isError: isErrorUserAccounts,
  } = useGetUserAccountsQuery(userInfo.email, isModalOpen);

  const iconsmenu = [
    {
      text: "orders",
      icon: <FaBagShopping className="text-white text-lg" />,
      to: "my-orders",
    },
    {
      text: "netzoon_credits",
      icon: <MdWallet className="text-white text-lg" />,
      to: "netzoon-credits",
    },
    {
      text: "my_products",
      icon: <MdOutlineViewList className="text-white text-lg" />,
      to: "products",
    },
    {
      text: "favorites",
      icon: <MdFavorite className="text-white text-lg" />,
      to: "favorites",
    },
    {
      text: "edit_profile",
      icon: <FaUserEdit className="text-white text-lg" />,
      to: "/my-account/edit-profile",
    },
  ];
  return (
    <div className="flex flex-col justify-start items-start  py-2 font-header w-full md:w-[60%] md:mx-auto md:py-5">
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
          <div className="grid grid-cols-5 gap-x-2 md:gap-x-5 gap-y-3">
            {iconsmenu.map((icon, index) => (
              <Link to={icon.to ?? ""}>
                <CircleIconText key={index} text={icon.text} icon={icon.icon} />
              </Link>
            ))}
            <Link to={`/more`}>
              <CircleIconText
                text={t("more")}
                icon={<CgDetailsMore className="text-white text-lg" />}
              />
            </Link>
          </div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10 gap-x-10 gap-y-5">
          <UserInfoCard
            icon={<FaUser className="w-7 h-7" />}
            title={t("user_name")}
            text={userInfo.username}
          />
          <UserInfoCard
            icon={<MdOutlineEmail className="w-7 h-7" />}
            title={t("email")}
            text={userInfo.email}
          />
          <UserInfoCard
            icon={<FaMobileAlt className="w-7 h-7" />}
            title={t("mobile")}
            text={userInfo.firstMobile ?? ""}
          />
          <UserInfoCard
            icon={<MdLocationCity className="w-7 h-7" />}
            title={t("location")}
            text={userInfo.addressDetails ?? ""}
          />
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

export default MyUserProfile;
