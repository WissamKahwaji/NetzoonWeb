import { useTranslation } from "react-i18next";
import { AdsModel } from "../../../apis/ads/type";
import { useNavigate } from "react-router-dom";

interface AdsCardProps {
  adsInfo: AdsModel;
}

const AdsCard = ({ adsInfo }: AdsCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[380px] md:w-full md:h-[400px] lg:w-full lg:h-[420px] xl:w-full xl:h-[440px] rounded-lg shadow-lg shadow-slate-500 border border-primary flex flex-col justify-start items-start bg-white">
      <img
        src={adsInfo?.advertisingImage}
        crossOrigin="anonymous"
        alt={`card image`}
        className="w-full h-3/5 object-cover rounded-t-lg"
      />
      <div className="p-2 w-full h-2/5 flex flex-col justify-start">
        <p className="text-sm font-semibold font-body text-center overflow-hidden overflow-ellipsis whitespace-pre-wrap line-clamp-2">
          {adsInfo?.advertisingTitle}
        </p>
        <p className="text-xs overflow-hidden overflow-ellipsis whitespace-pre-wrap line-clamp-2 text-start">
          {adsInfo?.advertisingDescription}
        </p>
      </div>
      <div className="flex justify-center items-center w-full mb-1">
        <button
          className="text-white  bg-primary/80 px-2 py-1 border-2 border-white shadow-md rounded-md hover:underline capitalize"
          onClick={() => {
            navigate(`/ads/${adsInfo._id}`);
          }}
        >
          {t("show_details")}
        </button>
      </div>
    </div>
  );
};

export default AdsCard;
