import { App as SendbirdApp } from "@sendbird/uikit-react";

import "@sendbird/uikit-react/dist/index.css";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useTranslation } from "react-i18next";

const ChatPage = () => {
  const userId = localStorage.getItem("userId");
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: userInfo, isError, isLoading } = useGetUserByIdQuery(userId);

  const [userChatId, setUserChatId] = useState<string>();

  useEffect(() => {
    if (userInfo) {
      setUserChatId(userInfo.username);
    }
  }, [userInfo]);

  const APP_ID = "D27C6110-9DB9-4EBE-AA85-CF39E2AF562E";

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="w-full h-full">
      <div className="flex  md:w-full flex-col overflow-x-scroll py-6 h-[600px]">
        <SendbirdApp
          appId={APP_ID}
          userId={userChatId ?? ""}
          breakpoint={"1200px"}
          htmlTextDirection={selectedLang === "en" ? "ltr" : "rtl"}
        />
      </div>
    </div>
  );
};

export default ChatPage;
