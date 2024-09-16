import { useNavigate } from "react-router-dom";
import { NewsModel } from "../../../apis/news/type";
import { useTranslation } from "react-i18next";
import { formatDateWithoutTime } from "../../../utils";
import { useAuth } from "../../../context/AuthContext";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useToggleLikeMutation } from "../../../apis/news/queries";

interface NewsCardProps {
  news: NewsModel;
  onCommentClick: () => void;
}

const NewsCard = ({ news, onCommentClick }: NewsCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("userId");

  const [isLiked, setIsLiked] = useState(false);
  const { mutate: toggleLike } = useToggleLikeMutation();

  useEffect(() => {
    if (news.likes) {
      const userIds = news.likes.map(item => item);
      if (userIds.includes(userId!)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [news.likes, userId]);

  return (
    <div className="flex flex-col w-full h-[400px] md:h-[500px] space-y-2">
      <div className="w-full flex flex-row justify-start items-center gap-x-3">
        <img
          src={news.creator?.profilePhoto}
          alt=""
          className="rounded-full w-8 h-8 "
        />
        <p className="text-sm text-primary font-semibold">
          {news.creator?.username}
        </p>
      </div>
      <div
        className="relative rounded-lg cursor-pointer"
        onClick={() => {
          navigate(`${news._id}`);
        }}
      >
        <div className="absolute bottom-0 w-full h-1/3 bg-primary/80 rounded-lg flex flex-col justify-start items-center text-white text-xs py-0.5 space-y-2">
          {news.updatedAt && <p>{formatDateWithoutTime(news.updatedAt)}</p>}
          <p>{news.title}</p>
          <p className="text-center line-clamp-1 ">{news.description}</p>
        </div>
        <img
          src={news.imgUrl}
          alt=""
          className="w-full h-auto object-cover rounded-lg"
          crossOrigin="anonymous"
        />
      </div>
      {isAuthenticated && (
        <div className="flex flex-row items-center justify-start gap-x-3">
          {isLiked ? (
            <MdFavorite
              className="md:w-5 md:h-5 w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => {
                toggleLike({
                  userId: userId!,
                  newsId: news._id!,
                });
              }}
            />
          ) : (
            <MdOutlineFavoriteBorder
              className="md:w-5 md:h-5 w-5 h-5 cursor-pointer"
              onClick={() => {
                toggleLike({
                  userId: userId!,
                  newsId: news._id!,
                });
              }}
            />
          )}
          <BiComment
            className="md:w-5 md:h-5 w-5 h-5 cursor-pointer"
            onClick={onCommentClick}
          />
          <IoMdShare
            className="w-5 h-5 md:w-5 md:h-5 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard
                .writeText(`${window.location.href}/${news._id}`)
                .then(() => {
                  toast.info("copy to clipboard");
                });
            }}
          />
        </div>
      )}
      <p className="text-xs text-gray-400">{`${news.likes?.length} ${t(
        "people_like_this"
      )}`}</p>
      <p className="text-xs text-gray-400">
        {news.comments?.length !== undefined && news.comments?.length > 0
          ? `${news.comments.length} ${t("comments")}`
          : t("no_comments")}
      </p>
      <p
        className="capitalize text-sm text-gray-400 cursor-pointer"
        onClick={onCommentClick}
      >
        {t("view_all_comments")}
      </p>
      {news.updatedAt && (
        <p className="text-gray-400 text-xs">
          {formatDateWithoutTime(news.updatedAt)}
        </p>
      )}
    </div>
  );
};

export default NewsCard;
