import { MdDelete } from "react-icons/md";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import emptyCartImage from "../../../assets/empty-cart.png";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  decreaseCount,
  deleteFromCart,
  increaseCount,
  selectCartValues,
  selectOrderTotal,
  selectTotalQuantity,
  selectTotalWeight,
} from "../../../features/cart/slice";
import { useCountry } from "../../../context/CountryContext";
import { Link, useNavigate } from "react-router-dom";
import { getCurrencyFromCountry } from "../../../utils";

interface CartMobileViewProps {
  serviceFee: number;
}

const CartMobileView = ({ serviceFee }: CartMobileViewProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartValues = useAppSelector(selectCartValues);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalWeight = useAppSelector(selectTotalWeight);
  const orderTotal = useAppSelector(selectOrderTotal);
  const totalAmount = serviceFee + orderTotal;
  const dispatch = useAppDispatch();
  const { country } = useCountry();
  const handleIncrease = (itemId: string) => {
    dispatch(increaseCount(itemId));
  };

  const handleDecrease = (itemId: string) => {
    dispatch(decreaseCount(itemId));
  };

  const handleDelete = (itemId: string) => {
    dispatch(deleteFromCart(itemId));
  };
  return (
    <div className="container mx-auto p-4 w-full md:w-1/2 md:mx-auto">
      {cartValues.length !== 0 && (
        <h2 className="text-2xl font-semibold mb-10">{t("your_cart")}</h2>
      )}
      {cartValues.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center mt-24">
          <img src={emptyCartImage} alt="" className="" />
          <p className="text-primary/60 text-base font-header font-bold mt-4">
            {t("your_shopping_cart_is_empty")}
          </p>
          <Link to={`/`}>
            <p className="text-primary/60 text-lg font-header font-bold mt-4">
              {`${t("start_shopping")}!`}
            </p>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartValues.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-md shadow-lg p-4 flex flex-row md:flex-row items-start md:items-start gap-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
                crossOrigin="anonymous"
              />
              <div className="flex flex-1 flex-col justify-between space-y-2">
                <div>
                  <p className="text-primary font-bold text-sm">{item.name}</p>
                  <p className="text-gray-500 line-clamp-3 text-xs">
                    {item.description}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {item.price} {getCurrencyFromCountry(country)}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end space-y-5">
                <button
                  onClick={() => handleDelete(item._id ?? "")}
                  className="text-red-500"
                >
                  <MdDelete className="text-lg" />
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(item._id ?? "")}
                    className="text-primary"
                  >
                    <IoIosRemoveCircleOutline className="text-lg" />
                  </button>
                  <p className="text-sm font-bold">{item.count}</p>
                  <button
                    onClick={() => handleIncrease(item._id ?? "")}
                    className="text-primary"
                  >
                    <IoIosAddCircleOutline className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartValues.length !== 0 && (
        <div className="fixed md:hidden md:mx-auto bottom-16 right-0 left-0 w-full flex flex-col space-y-5 justify-center items-center px-4 py-5 bg-primary rounded-tr-lg rounded-tl-lg">
          <div className="flex flex-row w-full justify-between items-center text-lg text-white font-semibold">
            <p>{t("order_total")}</p>
            <p>
              {orderTotal.toFixed(2)} {getCurrencyFromCountry(country)}
            </p>
          </div>
          {serviceFee && (
            <div className="flex flex-row w-full justify-between items-center text-lg text-white font-semibold">
              <p>{t("service_fee")}</p>
              <p>
                {serviceFee.toFixed(2)} {getCurrencyFromCountry(country)}
              </p>
            </div>
          )}
          <hr className="w-full bg-slate-200" />
          <div className="flex flex-row w-full justify-between items-center text-lg text-white font-semibold">
            <p>{t("total_amount")}</p>
            <p>
              {totalAmount.toFixed(2)} {getCurrencyFromCountry(country)}
            </p>
          </div>
          <div className="flex flex-row w-full justify-between items-center text-lg text-white font-semibold">
            <p>{t("total_quantity")}</p>
            <p>{totalQuantity}</p>
          </div>
          <div className="flex flex-row w-full justify-between items-center text-lg text-white font-semibold">
            <p>{t("total_weight")}</p>
            <p>
              {totalWeight.toFixed(2)} {t("kg")}
            </p>
          </div>
          <button
            className="w-full flex justify-center items-center py-3 font-bold text-white rounded-xl bg-transparent border border-white "
            onClick={() => {
              navigate(`/delivery-details`);
            }}
          >
            <p>{t("confirm")}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartMobileView;
