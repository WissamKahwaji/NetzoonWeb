import { useNavigate } from "react-router-dom";
import { DealsItemModel } from "../../../apis/deals/type";
import { useTranslation } from "react-i18next";

interface DealCardProps {
  item: DealsItemModel;
}

const DealCard = ({ item }: DealCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full md:w-full md:h-[240px] xl:w-full xl:h-[250px]   rounded-lg shadow-lg shadow-slate-500 border border-primary flex flex-col justify-start items-start bg-white">
      <div className="w-full h-full grid grid-cols-2 gap-x-3 p-2">
        <div className="w-full flex flex-col justify-center items-start space-y-2 text-sm">
          <p className="  font-semibold">{item.name}</p>
          <p className="">
            Seller : <span className="text-primary">{item.companyName}</span>
          </p>
          <p>
            Previous Price :{" "}
            <span className="text-primary">{item.prevPrice}</span>
          </p>
          <p>
            Current Price :{" "}
            <span className="text-primary">{item.currentPrice}</span>
          </p>
        </div>
        <img
          src={item.imgUrl}
          alt="deal img"
          className="w-full h-[150px] md:h-[160px] xl:h-[170px] object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-center items-center w-full px-2 my-2">
        <button
          className="text-white w-full  bg-primary px-2 py-1 border-2 border-white shadow-md rounded-md hover:underline capitalize"
          onClick={() => {
            navigate(`/deals/${item.category}/${item._id}`);
          }}
        >
          {t("show_details")}
        </button>
      </div>
    </div>
  );
};

export default DealCard;
