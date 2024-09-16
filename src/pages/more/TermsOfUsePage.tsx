import { useTranslation } from "react-i18next";
import { useGetPrivacyInfoQuery } from "../../apis/privacy-policy/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

const TermsOfUsePage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: dataInfo, isError, isLoading } = useGetPrivacyInfoQuery();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="w-full flex flex-col md:p-10 p-4  font-header ">
      <p className="text-center text-primary text-lg font-bold capitalize">
        {t("terms_of_use")}
      </p>
      {dataInfo && (
        <p className="whitespace-pre-wrap mt-5">
          {selectedLang === "en"
            ? `${dataInfo[0].termofUseEn}`
            : `${dataInfo[0].termofUse}`}
        </p>
      )}
    </div>
  );
};

export default TermsOfUsePage;
