import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { FaCircleMinus } from "react-icons/fa6";
import Modal from "react-modal";
import { useState } from "react";
import { useDeleteUserAccountMutation } from "../../apis/user/queries";

const MorePage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { isAuthenticated } = useAuth();
  const { mutate: deleteUserAccount } = useDeleteUserAccountMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const handleDeleteAccount = () => {
    deleteUserAccount(userId ?? "");
  };
  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <div className="grid md:grid-cols-1 grid-cols-1 gap-4 mt-4 md:w-1/2 w-full">
        <div
          className="flex flex-row justify-between items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("/more/privacy-policy");
          }}
        >
          <div className="space-y-1 font-body capitalize">
            <p>{t("privacy_policy")}</p>
          </div>
          <IoIosArrowForward className="text-2xl" />
        </div>
        <div
          className="flex flex-row justify-between items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("/more/terms-of-use");
          }}
        >
          <div className="space-y-1 font-body capitalize">
            <p>{t("terms_of_use")}</p>
          </div>
          <IoIosArrowForward className="text-2xl" />
        </div>
        <div
          className="flex flex-row justify-between items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("/more/contacts");
          }}
        >
          <div className="space-y-1 font-body capitalize">
            <p>{t("contact_us")}</p>
          </div>
          <IoIosArrowForward className="text-2xl" />
        </div>
        {isAuthenticated && (
          <div
            className="flex flex-row justify-start items-center gap-x-3 p-4 bg-white border border-red-500 text-red-500 rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
            onClick={openModal}
          >
            <FaCircleMinus className="text-2xl" />
            <div className="space-y-1 font-body capitalize">
              <p>{t("delete_my_account")}</p>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">{t("delete_my_account")}</h2>
          <p className="mb-4">{t("delete_my_account_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteAccount();
                closeModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MorePage;
