import { OrderModel } from "../../../apis/order/type";
import { formatDateWithoutTime, getCurrencyFromCountry } from "../../../utils";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../../context/CountryContext";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  order: OrderModel;
  orderNumber?: number;
  mine?: boolean;
}

const OrderCard = ({ order, orderNumber, mine }: OrderCardProps) => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  return (
    <div className="px-2 py-1 shadow-sm shadow-primary rounded-sm border border-gray-300 text-xs space-y-1">
      <div className="w-full flex justify-between items-start">
        {orderNumber && (
          <p className="text-xs">
            {t("order")} {orderNumber}
          </p>
        )}
        <button
          className="text-xs p-1 border-b border-primary text-primary"
          onClick={() => {
            navigate(`${order._id}`);
          }}
        >
          {t("show_details")}
        </button>
      </div>
      {mine === true && (
        <p className="text-sm">
          {t("order_holder")} :{" "}
          <span className="font-semibold text-primary text-xs">
            {order.userId.username}
          </span>
        </p>
      )}
      {order.createdAt && (
        <p>
          {t("order_date")} : {formatDateWithoutTime(order.createdAt)}
        </p>
      )}
      <div className="flex flex-col space-y-3 p-1 max-h-[120px] overflow-y-auto ">
        {order.products &&
          order.products.map((item, index) => (
            <div
              key={index}
              className="flex rounded-md shadow-sm items-center "
            >
              <img
                src={item.product.imageUrl}
                alt=""
                className="w-12 h-12"
                crossOrigin="anonymous"
              />
              <p className="text-xs">{item.product.name}</p>
            </div>
          ))}
      </div>
      <p className="text-sm text-primary">
        {t("total_amount")} :{" "}
        {((order.subTotal ?? 0) - (order.percentageFromSeller ?? 0)).toFixed(2)}
        {getCurrencyFromCountry(country)}
      </p>
    </div>
  );
};

export default OrderCard;
