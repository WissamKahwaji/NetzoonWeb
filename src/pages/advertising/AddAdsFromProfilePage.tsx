/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import {
  useGetPaymentConfigQuery,
  useGetUserProductsQuery,
} from "../../apis/product/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useAddAdsMutation } from "../../apis/ads/queries";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { AdsInputModel, advertisingType } from "../../apis/ads/type";
import { Formik } from "formik";
import { useCountry } from "../../context/CountryContext";
import { calculateAddFees, getCurrencyFromCountry } from "../../utils";
import { useGetFeesInfoQuery } from "../../apis/fees/queries";
import { ProductModel } from "../../apis/product/type";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createIntent } from "../../apis/product";
import { toast } from "react-toastify";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";

interface CheckoutFormProps {
  amount: number;
  adsInfo: AdsInputModel | undefined;
}
const CheckoutForm = ({ amount, adsInfo }: CheckoutFormProps) => {
  const { mutate: addAdvInfo } = useAddAdsMutation();

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();

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

      toast.success("Successfully processed payment for the ads");
      addAdvInfo(adsInfo!);
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

const AddAdsFromProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const { country } = useCountry();
  const {
    data: userProductsInfo,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetUserProductsQuery(userId ?? "", true);
  const { data: feesInfo, isError, isLoading } = useGetFeesInfoQuery();
  const { data: paymentConfig } = useGetPaymentConfigQuery();

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [amount, setAmount] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [adsObj, setAdsObj] = useState<AdsInputModel>();
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null
  );

  const openModal = (product: ProductModel) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const openModalTwo = () => {
    // setSelectedProduct(product);
    setIsModalOpenTwo(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const closeModalTwo = () => {
    setIsModalOpenTwo(false);
    setSelectedProduct(null);
  };

  const handleSubmit = (values: AdsInputModel) => {
    // addAdvInfo(values, {
    //   onSettled() {
    //     setSubmitting(false);
    //     closeModal();
    //   },
    // });
    closeModal();
    setAdsObj(values);
    openModalTwo();
  };
  useEffect(() => {
    (async () => {
      if (paymentConfig) {
        const stripePromise = await loadStripe(paymentConfig.publicKey);
        setStripePromise(stripePromise);
      }
    })();
  }, [paymentConfig]);

  useEffect(() => {
    if (endDate && startDate) {
      const amm = calculateAddFees(startDate, endDate, feesInfo?.adsFees ?? 0);

      setAmount(amm);
    }
  }, [endDate, feesInfo?.adsFees, startDate]);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 200,
    currency: "aed",
    appearance: {},
  };
  const initialValues: AdsInputModel = {
    owner: userId ?? "",
    advertisingTitle: selectedProduct?.name || "",
    advertisingStartDate: "",
    advertisingEndDate: "",
    advertisingDescription: selectedProduct?.description || "",
    advertisingYear: "",
    advertisingLocation: "",
    advertisingPrice: selectedProduct?.price || 0,
    advertisingType: advertisingType.PRODUCT,
    country: country,
    forPurchase: false,
    purchasable: false,
    imagePath: selectedProduct?.imageUrl,
  };
  if (isErrorProducts || isError) return <div>Error !!!</div>;
  if (isLoadingProducts || isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4">
        {t("choose_from_profile")}
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {userProductsInfo && userProductsInfo.length > 0 ? (
          userProductsInfo.map((product, index) => (
            <div
              key={index}
              className="w-full p-2 rounded-sm shadow-sm shadow-primary border border-gray-200 flex flex-row gap-x-2 justify-start items-center cursor-pointer hover:scale-105 ease-out duration-300"
              onClick={() => {
                openModal(product);
              }}
            >
              <img
                src={product.imageUrl}
                crossOrigin="anonymous"
                alt=""
                className="rounded-full w-12 h-12 border border-primary"
              />
              <p className="text-primary text-xs">{product.name}</p>
            </div>
          ))
        ) : (
          <div className="w-full">
            <p>{t("no_data_to_show")}</p>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Ads"
        className="fixed inset-0  flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mt-16 md:mt-0 max-h-[400px] md:max-h-full overflow-y-auto">
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-2 md:space-y-6"
              >
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingStartDate"
                  >
                    {t("advertising_start_date")}
                  </label>
                  <input
                    id="advertisingStartDate"
                    name="advertisingStartDate"
                    type="date"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={e => {
                      const value = e.currentTarget.value;
                      setFieldValue("advertisingStartDate", value);
                      setStartDate(value);
                    }}
                    value={values.advertisingStartDate}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingStartDate &&
                    touched.advertisingStartDate && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.advertisingStartDate}
                      </div>
                    )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingEndDate"
                  >
                    {t("advertising_end_date")}
                  </label>
                  <input
                    id="advertisingEndDate"
                    name="advertisingEndDate"
                    type="date"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={e => {
                      const value = e.currentTarget.value;
                      setFieldValue("advertisingEndDate", value);
                      setEndDate(value);
                    }}
                    value={values.advertisingEndDate}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingEndDate && touched.advertisingEndDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.advertisingEndDate}
                    </div>
                  )}
                  {values.advertisingStartDate && values.advertisingEndDate && (
                    <p className="text-sm text-red-900">
                      {t("total_amount")}
                      {" : "}
                      {calculateAddFees(
                        values.advertisingStartDate!,
                        values.advertisingEndDate!,
                        feesInfo?.adsFees ?? 0
                      )}
                      {getCurrencyFromCountry(country)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingYear"
                  >
                    {t("year")}
                  </label>
                  <input
                    id="advertisingYear"
                    name="advertisingYear"
                    type="date"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.advertisingYear}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingYear && touched.advertisingYear && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.advertisingYear}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingLocation"
                  >
                    {t("address")}
                  </label>
                  <input
                    id="advertisingLocation"
                    name="advertisingLocation"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.advertisingLocation}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingLocation &&
                    touched.advertisingLocation && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.advertisingLocation}
                      </div>
                    )}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? `${t("loading")}...` : t("save")}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpenTwo}
        onRequestClose={closeModalTwo}
        contentLabel="Confirm Payment"
        className="fixed inset-0 flex items-center justify-center z-50 md:mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-sm w-full max-h-[350px] md:max-h-[500px] overflow-y-auto">
          {stripePromise ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm adsInfo={adsObj} amount={amount ?? 0} />
            </Elements>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default AddAdsFromProfilePage;
