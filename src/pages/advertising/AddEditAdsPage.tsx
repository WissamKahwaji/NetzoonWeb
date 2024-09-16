/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddAdsMutation,
  useEditAdsMutation,
  useGetAdsByIdQuery,
} from "../../apis/ads/queries";
import { useEffect, useState } from "react";
import { AdsInputModel, advertisingType } from "../../apis/ads/type";
import { useGetFeesInfoQuery } from "../../apis/fees/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { calculateAddFees, getCurrencyFromCountry } from "../../utils";
import Modal from "react-modal";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useGetPaymentConfigQuery } from "../../apis/product/queries";
import { createIntent } from "../../apis/product";
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

const AddEditAdsPage = () => {
  const { t } = useTranslation();

  const { country } = useCountry();

  const userId = localStorage.getItem("userId");

  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { data: advInfo } = useGetAdsByIdQuery(id ?? "");
  const { data: feesInfo, isError, isLoading } = useGetFeesInfoQuery();
  const { mutate: editAdvInfo } = useEditAdsMutation();
  const [selectedAdvType, setSelectedAdvType] = useState<string>(
    advertisingType.PRODUCT
  );
  const [advImg, setAdvImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const { data: paymentConfig } = useGetPaymentConfigQuery();
  const [amount, setAmount] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [adsObj, setAdsObj] = useState<AdsInputModel>();
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

  useEffect(() => {
    if (id && advInfo) {
      if (userId !== advInfo.owner?._id) {
        navigate("/", { replace: true });
      }
    }
  }, [advInfo, id, navigate, userId]);

  const [initialValues, setInitialValues] = useState<AdsInputModel>({
    ...(id && { _id: id }),
    owner: userId ?? "",
    advertisingTitle: "",
    advertisingStartDate: "",
    advertisingEndDate: "",
    advertisingDescription: "",
    advertisingYear: "",
    advertisingLocation: "",
    advertisingPrice: 0,
    advertisingType: selectedAdvType,
    country: country,
    forPurchase: false,
    purchasable: false,
    guarantee: false,
  });

  useEffect(() => {
    if (id && advInfo) {
      setInitialValues({
        _id: id,
        owner: advInfo.owner?._id ?? userId ?? "",
        advertisingTitle: advInfo.advertisingTitle ?? "",
        advertisingStartDate: advInfo.advertisingStartDate,
        advertisingEndDate: advInfo.advertisingEndDate,
        advertisingDescription: advInfo.advertisingDescription,
        advertisingYear: advInfo.advertisingYear,
        advertisingLocation: advInfo.advertisingLocation,
        advertisingPrice: advInfo.advertisingPrice,
        advertisingType: advInfo.advertisingType,
        category: advInfo.category,
        color: advInfo.color,
        contactNumber: advInfo.contactNumber,
        country: advInfo.country,
        forPurchase: advInfo.forPurchase ?? false,
        guarantee: advInfo.guarantee ?? false,
        purchasable: advInfo.purchasable ?? false,
        type: advInfo.type,
      });
    } else {
      setInitialValues({
        ...(id && { _id: id }),
        owner: userId ?? "",
        advertisingTitle: "",
        advertisingStartDate: "",
        advertisingEndDate: "",
        advertisingDescription: "",
        advertisingYear: "",
        advertisingLocation: "",
        advertisingPrice: 0,
        advertisingType: selectedAdvType,
        country: country,
        forPurchase: false,
        purchasable: false,
        guarantee: false,
      });
    }
  }, [advInfo, country, id, selectedAdvType, userId]);

  useEffect(() => {
    if (endDate && startDate) {
      const amm = calculateAddFees(startDate, endDate, feesInfo?.adsFees ?? 0);

      setAmount(amm);
    }
  }, [endDate, feesInfo?.adsFees, startDate]);

  const validationSchema = Yup.object().shape({
    advertisingTitle: Yup.string().required("Please enter title"),
    advertisingStartDate: Yup.string().required(
      "Please enter advertising Start Date"
    ),
    advertisingEndDate: Yup.string().required(
      "Please enter advertising End Date"
    ),
    advertisingYear: Yup.string().required("Please enter advertising Year"),

    advertisingDescription: Yup.string().required("Please enter description"),
    advertisingPrice: Yup.number().required("Please enter price"),

    advertisingLocation: Yup.string().required("Please enter location"),
  });
  const handleSubmit = (
    values: AdsInputModel,
    { setSubmitting }: FormikHelpers<AdsInputModel>
  ) => {
    if (id) {
      editAdvInfo(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
    } else {
      setAdsObj(values);
      openModal();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    name: string,
    setfunction: (s: string) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFieldValue(name, file);
      const uploadedImageUrl = URL.createObjectURL(file);
      setfunction(uploadedImageUrl);
    }
  };
  const handleChoosenAdvImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files) {
      if (event.target.files.length > 6) {
        toast.info("you_can't select more than 6 files");
      } else {
        const filesArray = Array.from(event.target.files).slice(0, 6);

        setFieldValue("advertisingImageList", filesArray);
      }
    }
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {id ? `${t("edit_ads")}` : `${t("add_ads")}`}
      </p>
      <div className="w-full flex flex-col justify-start items-center space-y-3 p-3 rounded shadow bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4  w-full">
                {!id && (
                  <div>
                    <label
                      className="text-sm font-medium text-gray-700 text-start"
                      htmlFor="advertisingType"
                    >
                      {t("advertising_type")}
                    </label>
                    <div className="relative">
                      <select
                        id="advertisingType"
                        name="advertisingType"
                        className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={event => {
                          const advertisingType = event.target.value as string;
                          setSelectedAdvType(advertisingType);

                          setFieldValue("advertisingType", advertisingType);
                        }}
                        value={selectedAdvType}
                      >
                        {[
                          advertisingType.PRODUCT,
                          advertisingType.SERVICE,
                          advertisingType.CAR,
                          advertisingType.PLANES,
                          advertisingType.SEA_COMPANIES,
                          advertisingType.COMPANY,
                          advertisingType.REAL_ESTATE,
                          advertisingType.DELIVERY_SERVICE,
                          advertisingType.USER,
                        ].map((item, index) => (
                          <option
                            key={index}
                            value={item}
                            className="text-xs bg-primary focus:bg-secondary"
                          >
                            {t(item)}
                          </option>
                        ))}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 bottom-2 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingTitle"
                  >
                    {t("title")}
                  </label>
                  <input
                    id="advertisingTitle"
                    name="advertisingTitle"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.advertisingTitle}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingTitle && touched.advertisingTitle && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.advertisingTitle}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingDescription"
                  >
                    {t("description")}
                  </label>
                  <textarea
                    id="advertisingDescription"
                    name="advertisingDescription"
                    className="min-h-[100px] px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.advertisingDescription ?? ""}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingDescription &&
                    touched.advertisingDescription && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.advertisingDescription}
                      </div>
                    )}
                </div>
                {!id && (
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
                )}
                {!id && (
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
                    {errors.advertisingEndDate &&
                      touched.advertisingEndDate && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.advertisingEndDate}
                        </div>
                      )}
                    {values.advertisingStartDate &&
                      values.advertisingEndDate && (
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
                )}
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
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="advertisingPrice"
                  >
                    {t("price")}
                  </label>
                  <input
                    id="advertisingPrice"
                    name="advertisingPrice"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.advertisingPrice}
                    style={{ direction: "ltr" }}
                  />
                  {errors.advertisingPrice && touched.advertisingPrice && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.advertisingPrice}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="contactNumber"
                  >
                    {t("contact_number")}
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactNumber}
                    style={{ direction: "ltr" }}
                  />
                  {errors.contactNumber && touched.contactNumber && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.contactNumber}
                    </div>
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
                <div className="w-full flex justify-start items-center gap-x-7">
                  <p>{t("is_purchasable")} ? </p>
                  <input
                    type="checkbox"
                    name="purchasable"
                    id="purchasable"
                    className="w-4 h-4 cursor-pointer"
                    onChange={e => {
                      setFieldValue("purchasable", e.target.checked);
                    }}
                    checked={values.purchasable}
                  />
                </div>
                <div className="w-full flex justify-between items-center">
                  <p>{t("is_there_a_guarantee")} ? </p>
                  <input
                    type="checkbox"
                    name="guarantee"
                    id="guarantee"
                    className="w-4 h-4 cursor-pointer"
                    onChange={e => {
                      setFieldValue("guarantee", e.target.checked);
                    }}
                    checked={values.guarantee}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("adv_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={advImg}
                      alt="adv_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("adv_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="adv_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(e, setFieldValue, "image", setAdvImg);
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_adv_images")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChoosenAdvImages(event, setFieldValue);
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("pick_video")}
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files && event.target.files[0]) {
                        setFieldValue("video", event.target.files[0]);
                      }
                    }}
                  />
                </div>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
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

export default AddEditAdsPage;
