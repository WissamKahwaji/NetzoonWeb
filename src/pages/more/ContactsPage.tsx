import { useTranslation } from "react-i18next";
import { MdEmail, MdPeopleAlt, MdQuestionMark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { VscRequestChanges } from "react-icons/vsc";
import { IoChatboxOutline } from "react-icons/io5";

const ContactsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        <div
          className="flex flex-row justify-start items-center gap-x-3 p-4 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
          onClick={() => {}}
        >
          <IoChatboxOutline className="text-2xl" />
          <div className="space-y-1 font-body capitalize">
            <p>{t("chat_with_netzoon")}</p>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default ContactsPage;
