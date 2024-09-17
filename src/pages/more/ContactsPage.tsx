import { useTranslation } from "react-i18next";
import { MdEmail, MdPeopleAlt, MdQuestionMark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { VscRequestChanges } from "react-icons/vsc";
import Modal from "react-modal";
import { useState } from "react";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import ChatButton from "../../components/const/chat-btn/ChatButton";
import { IoClose } from "react-icons/io5";

const ContactsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [channelUrl, setChannelUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateChannel = (url: string) => {
    setChannelUrl(url);
    openModal();
  };

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-center text-primary text-lg font-bold capitalize">
        {t("contact_us")}
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full">
        <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("opinions");
          }}
        >
          <MdPeopleAlt className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("opinions")}</p>
          </div>
        </div>
        <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("complaints");
          }}
        >
          <TfiWrite className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("complaints")}</p>
          </div>
        </div>
        <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("question");
          }}
        >
          <MdQuestionMark className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("leave_your_question")}</p>
          </div>
        </div>
        <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("requests");
          }}
        >
          <VscRequestChanges className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("request")}</p>
          </div>
        </div>

        {/* <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => onStartChat}
        >
          <IoChatboxOutline className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("chat_with_netzoon")}</p>
          </div>
        </div> */}
        <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {
            navigate("send-email");
          }}
        >
          <MdEmail className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("send_email")}</p>
          </div>
        </div>
        <ChatButton
          userId={userId ?? ""}
          otherPersonId={"Netzoon"}
          onCreateChannel={handleCreateChannel}
          coverUrl={
            "https://www.netzoonback.siidevelopment.com/images/1701993570169.webp"
          }
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          text="chat_with_netzoon"
        />
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

export default ContactsPage;
