import { useTranslation } from "react-i18next";
import callImg from "../../assets/vedio call2.png";
import { useNavigate } from "react-router-dom";

const ChatContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="w-full md:w-3/4 px-2 py-5 cursor-pointer hover:scale-105 duration-300 ease-in-out"
      onClick={() => {
        navigate("/chat");
      }}
    >
      <div className="w-full h-32 flex flex-row justify-start items-center border-2 border-primary rounded-lg shadow-sm shadow-primary">
        <div className="w-[90%] px-3  h-full flex justify-center items-center">
          <p className="text-primary text-sm text-center md:text-lg font-body">
            {t("chat_hint")}
          </p>
        </div>
        <div className="bg-primary w-[30%] md:w-[10%] h-full rounded-lg px-1 justify-center items-center flex">
          <img src={callImg} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
