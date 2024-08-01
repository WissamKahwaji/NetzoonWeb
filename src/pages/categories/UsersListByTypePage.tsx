import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useCountry } from "../../context/CountryContext";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useGetUsersByTypeQuery } from "../../apis/user/queries";
import ImageWithTextCard from "../../components/const/ImageWithTextCard/ImageWithTextCard";

const UsersListByTypePage = () => {
  const { userType } = useParams<{ userType: string }>();
  const { t } = useTranslation();
  const { country } = useCountry();
  const {
    data: usersInfo,
    isError,
    isLoading,
    refetch,
  } = useGetUsersByTypeQuery(userType ?? "", country);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [country, refetch, userType]);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = usersInfo?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder={`${t("search_users")} ...`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 mb-4 border rounded-md border-primary outline-none"
        />
      </div>
      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-4 md:w-1/2">
          {filteredUsers &&
            filteredUsers.map((user, index) => (
              <ImageWithTextCard
                key={index}
                text={t(user.username)}
                imageUrl={user.profilePhoto ?? ""}
                onClick={() => {
                  navigate(`${user._id}`);
                }}
              />
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

export default UsersListByTypePage;
