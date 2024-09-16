import { useTranslation } from "react-i18next";
import {
  useGetUserFollowingsListQuery,
  useToggleFollowMutation,
} from "../../../apis/user/queries";
import { useEffect, useState } from "react";

interface FollowButtonProps {
  otherUserId: string;
}
const FollowButton = ({ otherUserId }: FollowButtonProps) => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { data: followingsListInfo } = useGetUserFollowingsListQuery(
    userId ?? ""
  );
  const [isFollow, setIsFollow] = useState(false);
  const { mutate: toggleFollow } = useToggleFollowMutation();

  useEffect(() => {
    if (followingsListInfo) {
      const userIds = followingsListInfo.map(item => item._id);
      if (userIds.includes(otherUserId)) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    }
  }, [followingsListInfo, otherUserId]);

  return (
    <button
      className="py-1 w-24 h-fit bg-primary text-white rounded-full justify-center items-center"
      onClick={() => {
        toggleFollow({ currentUserId: userId ?? "", otherUserId: otherUserId });
      }}
    >
      {isFollow ? `${t("following")}` : `${t("follow")}`}
    </button>
  );
};

export default FollowButton;
