import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useGetNewsListQuery } from "../../apis/news/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { formatDateWithoutTime } from "../../utils";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewsListPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    data: newsListInfo,
    isError,
    isLoading,
  } = useGetNewsListQuery(country);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center capitalize">
      {newsListInfo && newsListInfo.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-1 md:gap-4 md:w-1/3  ">
          {newsListInfo &&
            newsListInfo.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-full h-[400px] md:h-[500px] space-y-2"
              >
                <div className="w-full flex flex-row justify-start items-center gap-x-3">
                  <img
                    src={item.creator?.profilePhoto}
                    alt=""
                    className="rounded-full w-8 h-8 "
                  />
                  <p className="text-sm text-primary font-semibold">
                    {item.creator?.username}
                  </p>
                </div>
                <div
                  className="relative rounded-lg"
                  onClick={() => {
                    navigate(`${item._id}`);
                  }}
                >
                  <div className="absolute bottom-0 w-full h-1/3 bg-primary/80 rounded-lg flex flex-col justify-start items-center text-white text-xs py-0.5 space-y-2">
                    {item.updatedAt && (
                      <p>{formatDateWithoutTime(item.updatedAt)}</p>
                    )}
                    <p>{item.title}</p>
                    <p className="text-center line-clamp-1 ">
                      {item.description}
                    </p>
                  </div>
                  <img
                    src={item.imgUrl}
                    alt=""
                    className="w-full h-auto object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                </div>
                {isAuthenticated && (
                  <div className="flex flex-row items-center justify-start gap-x-3">
                    <MdOutlineFavoriteBorder className="md:w-5 md:h-5" />
                    <BiComment className="md:w-5 md:h-5" />
                    <IoMdShare className="md:w-5 md:h-5" />
                  </div>
                )}
                <p className="text-xs text-gray-400">{`${
                  item.likes?.length
                } ${t("people_like_this")}`}</p>
                <p className="text-xs text-gray-400">
                  {item.comments?.length !== undefined &&
                  item.comments?.length > 0
                    ? item.comments.length
                    : t("no_comments")}
                </p>
                <p className="capitalize text-sm text-gray-400">
                  {t("view_all_comments")}
                </p>
                {item.updatedAt && (
                  <p className="text-gray-400 text-xs">
                    {formatDateWithoutTime(item.updatedAt)}
                  </p>
                )}
              </div>
            ))}
        </div>
      ) : (
        <p className="text-primary font-semibold w-full flex justify-center items-center">
          {t("no_data_to_show")}
        </p>
      )}
    </div>
  );
};

export default NewsListPage;
