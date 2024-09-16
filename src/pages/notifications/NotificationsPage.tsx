import { useTranslation } from "react-i18next";
import { useGetNotificationsListQuery } from "../../apis/notificataions/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { formatDate } from "../../utils";

const NotificationsPage = () => {
  const { t } = useTranslation();
  const {
    data: notificationsInfo,
    isLoading,
    isError,
  } = useGetNotificationsListQuery();

  if (isError) return <div>Error !!!</div>;

  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {t("notifications")}
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {notificationsInfo && notificationsInfo.length > 0 ? (
          notificationsInfo.map((item, index) => (
            <div
              key={index}
              className="w-full p-2 rounded-sm shadow-sm shadow-primary border border-gray-200 flex flex-row gap-x-2 justify-start items-center cursor-pointer hover:scale-105 ease-out duration-300"
            >
              <img
                src={item.userProfileImage}
                crossOrigin="anonymous"
                alt=""
                className="rounded-full w-12 h-12 border border-primary"
              />
              <div className="justify-start items-start space-y-2">
                <p className="text-primary text-xs">
                  {item.category === "account"
                    ? `${item.username} ${t("created_an_account_as")} ${
                        item.text
                      }`
                    : `${item.username} ${t("added_a")} ${item.text} ${t(
                        "to"
                      )} ${item.category}`}
                </p>
                <p className="line-clamp-3 text-xs text-gray-400">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">
            <p>{t("no_data_to_show")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
