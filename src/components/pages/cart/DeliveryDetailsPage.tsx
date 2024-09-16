import { Field, Form, Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../../context/CountryContext";
import {
  useCalculateDeliveryRateMutation,
  useGetAramexCitiesQuery,
} from "../../../apis/aramex/queries";
import { useState } from "react";
import { useGetUserByIdQuery } from "../../../apis/user/queries";
import { DeliveryDetailsInfoModel } from "../../../apis/cart/type";
import * as Yup from "yup";
import LoadingComponent from "../loading/LoadingComponent";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CalculateDeliveryRateInput } from "../../../apis/aramex/type";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectCartValues,
  selectTotalQuantity,
  selectTotalWeight,
  setDeliveryDetails,
} from "../../../features/cart/slice";

const DeliveryDetailsPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalWeight = useAppSelector(selectTotalWeight);
  const cartValues = useAppSelector(selectCartValues);
  const sellerInfo = {
    line1: cartValues[0].owner.addressDetails,
    city: cartValues[0].owner.city,
    country: cartValues[0].owner.country,
  };
  const {
    data: userInfo,
    isError: isErrorUser,
    isLoading: isLoadingUser,
  } = useGetUserByIdQuery(userId);
  const { mutate: calculateRate } = useCalculateDeliveryRateMutation();
  const handleSubmit = (
    values: DeliveryDetailsInfoModel,
    { setSubmitting }: FormikHelpers<DeliveryDetailsInfoModel>
  ) => {
    dispatch(
      setDeliveryDetails({
        shippingAddress: `${values.city} - ${values.addressDetails} - ${values.floorNumber}`,
        mobile: values.mobile,
        city: values.city,
        country: userInfo?.country ?? "AE",
      })
    );
    const finalValues: CalculateDeliveryRateInput = {
      originAddress: {
        line1: sellerInfo.line1 || "",
        city: sellerInfo.city || "dubai",
        longitude: 0,
        latitude: 0,
        countryCode: sellerInfo.country || "AE",
      },
      destinationAddress: {
        line1: values.addressDetails,
        city: values.city,
        longitude: 0,
        latitude: 0,
        countryCode: country || "AE",
      },
      actualWeightValue: totalWeight,
      numberOfPieces: totalQuantity,
      preferredCurrencyCode: "aed",
    };
    calculateRate(finalValues, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  const {
    data: citiesInfo,
    isError,
    isLoading,
  } = useGetAramexCitiesQuery(country);
  const [selectedCity, setSelectedCity] = useState(
    userInfo?.city || citiesInfo?.Cities[0] || ""
  );
  console.log(userInfo?.username);
  const initialValues: DeliveryDetailsInfoModel = {
    name: userInfo?.username || "",
    email: userInfo?.email || "",
    phone: userInfo?.firstMobile || "",
    mobile: userInfo?.firstMobile || "",
    city: userInfo?.city || selectedCity,
    addressDetails: userInfo?.addressDetails || "",
    locationType: userInfo?.locationType || "",
    floorNumber: userInfo?.floorNum || 0,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter your email"),
    phone: Yup.string()
      .matches(/^\+?\d+$/, "Invalid mobile number")
      .min(9, "Mobile number must be at least 9 characters long"),
    mobile: Yup.string()
      .matches(/^\+?\d+$/, "Invalid mobile number")
      .min(9, "Mobile number must be at least 9 characters long"),
    locationType: Yup.string().required("Please choose location Type"),
    city: Yup.string().required("Please choose city"),
    addressDetails: Yup.string().required("Please enter address Details"),
    floorNumber: Yup.number().required("Please enter floor number"),
  });

  if (isError || isErrorUser) return <div>Error !!!</div>;
  if (isLoading || isLoadingUser) return <LoadingComponent />;
  return (
    <div className="flex flex-col justify-start items-center gap-y-2 mt-20 font-header px-2 w-full">
      <p className="text-lg font-bold text-primary ">{t("delivery_details")}</p>
      <p className="text-sm text-gray-500">
        {t("please_input_your_location_for_delivery_service")}
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className=" mt-2 w-full md:w-1/2 lg:w-1/3 px-3 font-header space-y-3 py-2"
          >
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs">
                {t("your_name")}
              </label>
              <input
                type="text"
                name="name"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("your_name")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                style={{ direction: "ltr" }}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-xs">{errors.name}</div>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs">
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("email")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                style={{ direction: "ltr" }}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="mobile" className="text-xs">
                {t("mobile")}
              </label>
              <PhoneInput
                containerStyle={{ direction: "ltr" }}
                country={userInfo?.country || "ae"}
                value={values.mobile}
                onBlur={handleBlur}
                onChange={value => setFieldValue("mobile", value)}
                placeholder={t("first_mobile")}
                inputStyle={{
                  width: "100%",
                  height: "36px",
                  border: "1px solid #2072B7",
                  borderRadius: "0.375rem",
                  fontSize: "15px",
                  outline: "none",

                  direction: "ltr",
                }}
                buttonStyle={{
                  margin: 3,
                  direction: "ltr",
                }}
              />
              {errors.mobile && touched.mobile && (
                <div className="text-red-500 text-xs">{errors.mobile}</div>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="text-xs">
                {t("phone_number")}
              </label>
              <PhoneInput
                containerStyle={{ direction: "ltr" }}
                country={userInfo?.country || "ae"}
                value={values.phone}
                onBlur={handleBlur}
                onChange={value => setFieldValue("phone", value)}
                placeholder={t("phone_number")}
                inputStyle={{
                  width: "100%",
                  height: "36px",
                  border: "1px solid #2072B7",
                  borderRadius: "0.375rem",
                  fontSize: "15px",
                  outline: "none",

                  direction: "ltr",
                }}
                buttonStyle={{
                  margin: 3,
                  direction: "ltr",
                }}
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-xs">{errors.phone}</div>
              )}
            </div>
            <div className="relative">
              <label htmlFor="city">{t("city")}</label>
              {isError || isLoading ? (
                <p>Loading</p>
              ) : (
                <select
                  id="city"
                  name="city"
                  className="block mt-2 appearance-none w-full pr-8 text-xs  font-header mb-2 px-4 py-3 border border-primary rounded-lg focus:outline-none   "
                  onBlur={handleBlur}
                  onChange={e => {
                    // setAccountType(e.currentTarget.value);
                    setFieldValue("city", e.currentTarget.value);
                    setSelectedCity(e.target.value);
                  }}
                  value={selectedCity}
                >
                  {citiesInfo?.Cities.map((city, index) => (
                    <option key={index} value={city} className="text-xs">
                      {city}
                    </option>
                  ))}
                </select>
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="addressDetails" className="text-xs">
                {t("address_details")}
              </label>
              <input
                type="text"
                name="addressDetails"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("address_details")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressDetails}
                style={{ direction: "ltr" }}
              />
              {errors.addressDetails && touched.addressDetails && (
                <div className="text-red-500 text-xs">
                  {errors.addressDetails}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="floorNumber" className="text-xs">
                {t("floor_number")}
              </label>
              <input
                type="number"
                name="floorNumber"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("floor_number")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.floorNumber}
                style={{ direction: "ltr" }}
              />
              {errors.floorNumber && touched.floorNumber && (
                <div className="text-red-500 text-xs">{errors.floorNumber}</div>
              )}
            </div>
            <div>
              <label className="text-xs font-header">
                {t("location_type")}
              </label>
              <div className="flex flex-row justify-start items-center gap-x-5 w-full mt-3">
                <div className="flex items-center">
                  <Field
                    type="radio"
                    name="locationType"
                    value="home"
                    className="mr-2"
                    checked={values.locationType === "home"}
                  />
                  <label htmlFor="home" className="text-xs font-header">
                    {t("home")}
                  </label>
                </div>
                <div className="flex items-center">
                  <Field
                    type="radio"
                    name="locationType"
                    value="work"
                    className="mr-2"
                    checked={values.locationType === "work"}
                  />
                  <label htmlFor="work" className="text-xs font-header">
                    {t("work")}
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/50 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? t("loading....") : t("place_order")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryDetailsPage;
