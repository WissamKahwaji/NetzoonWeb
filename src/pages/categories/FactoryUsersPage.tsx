import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFactoryUsersQuery } from "../../apis/departments/queries";
import { useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import ImageWithTextCard from "../../components/const/ImageWithTextCard/ImageWithTextCard";

const FactoryUsersPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: factoryUsers,
    isError,
    isLoading,
  } = useGetFactoryUsersQuery(id ?? "");
  const [searchTerm, setSearchTerm] = useState("");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = factoryUsers?.factory.filter(user =>
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

export default FactoryUsersPage;
