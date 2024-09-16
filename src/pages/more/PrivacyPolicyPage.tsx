import { useTranslation } from "react-i18next";
import { useGetPrivacyInfoQuery } from "../../apis/privacy-policy/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: dataInfo, isError, isLoading } = useGetPrivacyInfoQuery();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="w-full flex flex-col md:p-10 p-4  font-header ">
      <p className="text-center text-primary text-lg font-bold capitalize">
        {t("privacy_policy")}
      </p>
      {dataInfo && (
        <p className="whitespace-pre-wrap mt-5">
          {selectedLang === "en"
            ? `${dataInfo[0].textEn}`
            : `${dataInfo[0].text}`}
        </p>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;
