/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteDealMutation,
  useGetDealByIdQuery,
  useSavePurchDealMutation,
} from "../../apis/deals/queries";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import {
  calculateRemainingDays,
  formatDateWithoutTime,
  getCurrencyFromCountry,
} from "../../utils";
import { useCountry } from "../../context/CountryContext";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-modal";
import { useGetPaymentConfigQuery } from "../../apis/product/queries";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createIntent } from "../../apis/product";
import { toast } from "react-toastify";
import { DealsItemModel, SavePurchDealInputModel } from "../../apis/deals/type";

const DealsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { country } = useCountry();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { data: dealInfo, isError, isLoading } = useGetDealByIdQuery(id ?? "");
  const { mutate: deleteDealInfo } = useDeleteDealMutation();
  const { data: paymentConfig } = useGetPaymentConfigQuery();

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const openModalTwo = () => {
    // setSelectedProduct(product);
    setIsModalOpenTwo(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const closeModalTwo = () => {
    setIsModalOpenTwo(false);
  };
  const handleDeleteDeal = () => {
    deleteDealInfo(dealInfo?._id ?? "");
  };

  useEffect(() => {
    (async () => {
      if (paymentConfig) {
        const stripePromise = await loadStripe(paymentConfig.publicKey);
        setStripePromise(stripePromise);
      }
    })();
  }, [paymentConfig]);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 200,
    currency: "aed",
    appearance: {},
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full px-2 py-4  font-header space-y-4 md:justify-center md:items-center">
      <div className="w-full h-[350px]">
        <img
          src={dealInfo?.imgUrl}
          alt=""
          crossOrigin="anonymous"
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="flex flex-col space-y-3 w-full capitalize">
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_title")}</p>
          <p>{dealInfo?.name}</p>
        </div>
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("vendor_name")}</p>
          <p>{dealInfo?.companyName}</p>
        </div>
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_description")}</p>
          <p>{dealInfo?.description}</p>
        </div>
        {dealInfo?.startDate && (
          <div className="w-full grid grid-cols-2  border-b  border-primary/30">
            <p>{t("deal_start_date")}</p>
            <p>{formatDateWithoutTime(dealInfo?.startDate)}</p>
          </div>
        )}
        {dealInfo?.endDate && (
          <div className="w-full grid grid-cols-2  border-b  border-primary/30">
            <p>{t("deal_end_date")}</p>
            <p>{formatDateWithoutTime(dealInfo?.endDate)}</p>
          </div>
        )}
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_price_before")}</p>
          <p>
            {dealInfo?.prevPrice} {getCurrencyFromCountry(country)}
          </p>
        </div>
        <div className="w-full grid grid-cols-2  border-b  border-primary/30">
          <p>{t("deal_current_price")}</p>
          <p>
            {dealInfo?.currentPrice} {getCurrencyFromCountry(country)}
          </p>
        </div>

        <div className="w-full flex flex-row">
          {userId && userId !== dealInfo?.owner?._id ? (
            calculateRemainingDays(dealInfo?.endDate ?? "") > 0 ? (
              <button
                className="w-full flex justify-center items-center rounded-md shadow-md bg-primary py-3 mt-3 capitalize text-white font-semibold "
                onClick={openModalTwo}
              >
                {t("buy_now")}
              </button>
            ) : (
              <button className="w-full flex justify-center items-center rounded-md shadow-md bg-primary py-3 mt-3 capitalize text-white font-semibold ">
                {t("deal_finished")}
              </button>
            )
          ) : (
            userId && (
              <div className="flex flex-row justify-center items-center gap-x-12 w-full">
                <MdEdit
                  className="text-primary w-6 h-6 cursor-pointer"
                  onClick={() => {
                    navigate("edit");
                  }}
                />

                <MdDelete
                  className="text-red-500 w-6 h-6 cursor-pointer"
                  onClick={openModal}
                />
              </div>
            )
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">{t("delete_deal")}</h2>
          <p className="mb-4">{t("delete_deal_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteDeal();
                closeModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpenTwo}
        onRequestClose={closeModalTwo}
        contentLabel="Confirm Payment"
        className="fixed inset-0 flex items-center justify-center z-50 md:mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-sm w-full max-h-[450px] md:max-h-[500px] overflow-y-auto">
          {stripePromise ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                dealInfo={dealInfo}
                amount={dealInfo?.currentPrice ?? 0}
              />
            </Elements>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

interface CheckoutFormProps {
  amount: number;
  dealInfo: DealsItemModel | undefined;
}
const CheckoutForm = ({ amount, dealInfo }: CheckoutFormProps) => {
  const userId = localStorage.getItem("userId");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();
  const { mutate: savePurchDeal } = useSavePurchDealMutation();
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
      const { clientSecret } = await createIntent({
        amount: amount,
      });

      toast.success("Successfully processed payment for the deal");
      const variable: SavePurchDealInputModel = {
        userId: dealInfo?.owner?._id ?? "",
        buyerId: userId ?? "",
        deal: dealInfo?._id ?? "",
        grandTotal: amount,
      };
      savePurchDeal(variable);
      const stripeRes = await stripe?.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}`,
        },
      });

      if (stripeRes?.error) {
        setErrorMessage(stripeRes?.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

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

export default DealsDetailsPage;
