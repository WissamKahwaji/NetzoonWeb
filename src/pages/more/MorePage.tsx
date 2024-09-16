import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const MorePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      </div>
    </div>
  );
};

export default MorePage;
