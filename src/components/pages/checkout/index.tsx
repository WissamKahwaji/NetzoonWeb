/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  clearCart,
  selectCartValues,
  selectDeliveryDetails,
  selectDeliveryFee,
  selectOrderTotal,
  selectTotalQuantity,
  selectTotalWeight,
} from "../../../features/cart/slice";
import { createIntent } from "../../../apis/product";
import { toast } from "react-toastify";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useGetPaymentConfigQuery } from "../../../apis/product/queries";
import LoadingComponent from "../loading/LoadingComponent";
import { useGetFeesInfoQuery } from "../../../apis/fees/queries";
import { useSaveOrderMutation } from "../../../apis/order/queries";
import { ProductOrderModel, SaveOrderModel } from "../../../apis/order/type";
import { useCreatePickUpWithShipmentMutation } from "../../../apis/aramex/queries";
import {
  CreatePickupWithShipmentInputModel,
  ItemsModel,
} from "../../../apis/aramex/type";
import { useGetUserByIdQuery } from "../../../apis/user/queries";
import { formatMobileNumber } from "../../../utils";
const CheckoutForm = () => {
  const { mutate: saveOrder } = useSaveOrderMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const { data: dataInfo, isError, isLoading } = useGetFeesInfoQuery();
  const { mutate: createPickUpWithShipment } =
    useCreatePickUpWithShipmentMutation();
  const serviceFee = dataInfo?.feesFromBuyer ?? 0;
  const orderTotal = useAppSelector(selectOrderTotal);
  const cartValues = useAppSelector(selectCartValues);
  const totalWeight = useAppSelector(selectTotalWeight);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const deliveryFee = useAppSelector(selectDeliveryFee);
  const deliveryDetails = useAppSelector(selectDeliveryDetails);
  const userId = localStorage.getItem("userId");
  const {
    data: userInfo,
    isError: isErrorUser,
    isLoading: isLoadingUser,
  } = useGetUserByIdQuery(userId);

  const handlePaymentSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const totalAmount = orderTotal + (deliveryFee ?? 0) + serviceFee;

      // Ensure the amount is an integer
      const roundedAmount = Math.round(totalAmount);
      console.log("roundAmount: " + roundedAmount);

      const { clientSecret } = await createIntent({
        amount: roundedAmount,
      });

      dispatch(clearCart());
      toast.success("Successfully processed payment for the order");
      // const productOrder: ProductOrderModel = {
      //   product: "6572c08d7d65043dae4fa854",
      //   amount: 20,
      //   qty: 1,
      // };

      const products: ProductOrderModel[] = cartValues.map(cartItem => ({
        product: cartItem._id ?? "", // Assuming the product ID is stored in the _id field
        amount: cartItem.price, // Assuming the price is in cartItem.price
        qty: cartItem.count,
      }));

      const items: ItemsModel[] = cartValues.map(cartItem => ({
        PackageType: "item",
        Quantity: cartItem.quantity ?? 1,
        Weight: {
          Unit: "KG",
          Value: cartItem.weight ?? 0,
        },
        Comments: "comments",
        Reference: "",
        PiecesDimensions: null,
        CommodityCode: 640000,
        GoodsDescription: "goodsDescription",
        CountryOfOrigin: "AE",
        CustomsValue: {
          CurrencyCode: "AED",
          Value: 0,
        },
        ContainerNumber: null,
      }));

      const order: SaveOrderModel = {
        userId: userId ?? "",
        clientId: cartValues[0].owner._id ?? "",
        products: products,
        grandTotal: orderTotal + deliveryFee + serviceFee,
        orderStatus: "inProgress",

        shippingAddress: deliveryDetails.shippingAddress,
        mobile: deliveryDetails.mobile,
        subTotal: orderTotal + deliveryFee,
        serviceFee: serviceFee,
      };
      saveOrder(order);
      const pickUpDate = Date.now();
      const lastPickUpSeconds = 3 * 24 * 60 * 60 * 1000;
      const lastPickUp = pickUpDate + lastPickUpSeconds;
      console.log("adddddddresssssssss", cartValues[0].owner.address);
      const pickupWithShipment: CreatePickupWithShipmentInputModel = {
        pickupAddress: {
          line1:
            cartValues[0].owner.address ??
            cartValues[0].owner.addressDetails ??
            "",
          line2:
            cartValues[0].owner.addressDetails ??
            cartValues[0].owner.address ??
            "",
          city: cartValues[0].owner.city ?? "dubai",
          stateOrProvinceCode: cartValues[0].owner.city ?? "dubai",
          countryCode: "AE",
        },
        pickupContact: {
          department: "test department",
          personName:
            cartValues[0].owner.contactName ?? cartValues[0].owner.username,
          title: cartValues[0].owner.username,
          companyName: cartValues[0].owner.username,
          phoneNumber1: formatMobileNumber(cartValues[0].owner.firstMobile),
          cellPhone: formatMobileNumber(cartValues[0].owner.firstMobile),
        },
        pickupLocation:
          cartValues[0].owner.address ??
          cartValues[0].owner.addressDetails ??
          "dubai",
        pickupDate: `/Date(${pickUpDate})/`,
        readyTime: `/Date(${pickUpDate})/`,
        lastPickupTime: `/Date(${lastPickUp})/`,
        closingTime: `/Date(${pickUpDate})/`,
        pickupItems: {
          shipmentWeight: {
            value: totalWeight,
          },
          numberOfPieces: totalQuantity,
        },
        shipper: {
          partyAddress: {
            line1:
              cartValues[0].owner.address ??
              cartValues[0].owner.addressDetails ??
              "",
            line2:
              cartValues[0].owner.addressDetails ??
              cartValues[0].owner.address ??
              "",
            city: cartValues[0].owner.city ?? "dubai",
            stateOrProvinceCode: cartValues[0].owner.city ?? "dubai",
            countryCode: "AE",
          },
          contact: {
            department: "test department",
            personName:
              cartValues[0].owner.contactName ?? cartValues[0].owner.username,
            title: cartValues[0].owner.username,
            companyName: cartValues[0].owner.username,
            phoneNumber1: formatMobileNumber(cartValues[0].owner.firstMobile),
            cellPhone: formatMobileNumber(cartValues[0].owner.firstMobile),
            emailAddress: cartValues[0].owner.email,
          },
        },
        consignee: {
          partyAddress: {
            line1: deliveryDetails.shippingAddress,
            line2: "line2",
            city: deliveryDetails.city,
            stateOrProvinceCode: deliveryDetails.city,
            countryCode: deliveryDetails.country,
          },
          contact: {
            department: "Department",
            personName: userInfo?.username ?? "",
            title: userInfo?.username ?? "",
            companyName: userInfo?.username ?? "",
            phoneNumber1: formatMobileNumber(userInfo?.firstMobile),
            cellPhone: formatMobileNumber(userInfo?.firstMobile),
            emailAddress: userInfo?.email,
          },
        },
        shippingDateTime: `/Date(${pickUpDate})/`,
        dueDate: `/Date(${lastPickUp})/`,
        Items: items,
      };
      createPickUpWithShipment(pickupWithShipment);
      const stripeRes = await stripe?.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: ``,
        },
      });

      if (stripeRes?.error) {
        setErrorMessage(stripeRes?.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  if (isLoading || isErrorUser) return <LoadingComponent />;
  if (isError || isLoadingUser) return <></>;
  return (
    <div>
      <div className=" m-auto max-w-sm px-4 py-20">
        <form onSubmit={handlePaymentSubmit}>
          <PaymentElement />
          <button
            className="mt-3 bg-primary px-3 py-1 rounded text-white w-full"
            type="submit"
            disabled={!stripe || !elements}
          >
            Pay
          </button>
          {/* Show error message to your customers */}
          {errorMessage && (
            <div className="text-destructive">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};
const Checkout = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const {
    data: paymentConfig,
    isLoading,
    isError,
  } = useGetPaymentConfigQuery();

  useEffect(() => {
    (async () => {
      if (paymentConfig) {
        const stripePromise = await loadStripe(paymentConfig.publicKey);
        setStripePromise(stripePromise);
      }
    })();
  }, [paymentConfig]);

  if (isLoading) return <LoadingComponent />;
  if (isError) return <></>;
  console.log();
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 200,
    currency: "aed",
    appearance: {},
  };
  return (
    <>
      {stripePromise ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </>
  );
};

export default Checkout;
