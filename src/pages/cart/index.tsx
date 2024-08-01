import { useGetFeesInfoQuery } from "../../apis/fees/queries";
import CartMobileView from "../../components/pages/cart/CartMobileView";
import CartWebView from "../../components/pages/cart/CartWebView";

const CartPage = () => {
  const { data: dataInfo } = useGetFeesInfoQuery();

  const serviceFee = dataInfo?.feesFromBuyer ?? 0;

  return (
    <>
      <div className="flex md:hidden">
        <CartMobileView serviceFee={serviceFee} />
      </div>
      <div className="md:flex hidden">
        <CartWebView serviceFee={serviceFee} />
      </div>
    </>
  );
};

export default CartPage;
