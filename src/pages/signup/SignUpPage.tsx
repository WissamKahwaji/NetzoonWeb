import { useTranslation } from "react-i18next";
import logo from "../../assets/netzoon-logo.png";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { UserModel } from "../../apis/user/type";

import * as Yup from "yup";
import { USER_TYPE } from "../../constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { FaEye, FaEyeLowVision } from "react-icons/fa6";
import { useGetAramexCitiesQuery } from "../../apis/aramex/queries";
import { useGetFactoriesCategoriesQuery } from "../../apis/departments/queries";
import { useSignUpMutation } from "../../apis/user/queries";
import { useCountry } from "../../context/CountryContext";

const SignUpPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const [userType, setUserType] = useState<string>(USER_TYPE.LOCAL_COMPANY);
  const { mutate: signUp } = useSignUpMutation();
  const {
    data: citiesInfo,
    isError,
    isLoading,
  } = useGetAramexCitiesQuery(country);
  const {
    data: factoriesCategories,
    isError: isErrorFactoriesCat,
    isLoading: isLoadingFactoriesCat,
  } = useGetFactoriesCategoriesQuery(userType === USER_TYPE.FACTORY);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFactoryCat, setSelectedFactoryCat] = useState("");

  useEffect(() => {
    if (citiesInfo && citiesInfo.Cities.length > 0) {
      const firstCity = citiesInfo.Cities[0];
      setSelectedCity(firstCity);
      // Set the default city in Formik
    }
  }, [citiesInfo]);
  useEffect(() => {
    if (factoriesCategories) {
      setSelectedFactoryCat(factoriesCategories[0].title);
    }
  }, [factoriesCategories]);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm your password"),
    firstMobile: Yup.string()
      .required("Please enter a mobile number")
      .matches(/^\+?\d+$/, "Invalid mobile number")
      .min(9, "Mobile number must be at least 9 characters long"),

    locationType: Yup.string().required("Please choose location Type"),
    city: Yup.string().required("Please choose city"),
    address: Yup.string().required("Please enter address"),
    addressDetails: Yup.string().required("Please enter address Details"),
    profilePhoto: Yup.mixed()
      .required("Profile photo is required")
      .test("fileSize", "File is too large", value => {
        return value && value instanceof File && value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file format", value => {
        return (
          value &&
          value instanceof File &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }),
  });
  const initialValues: UserModel = {
    username: "",
    email: "",
    userType: userType,
    password: "",
    firstMobile: "",
    isFreeZoon: false,
    isService: false,
    isSelectable: false,
    freezoneCity: "",
    deliverable: false,
    subcategory: "",
    country: country,
    address: "",
    netzoonBalance: 0,
    businessLicense: "",
    companyProductsNumber: 0,
    sellType: "",
    toCountry: "",
    profilePhoto: "",
    coverPhoto: "",
    banerPhoto: "",
    frontIdPhoto: "",
    backIdPhoto: "",
    bio: "",
    description: "",
    website: "",
    slogn: "",
    link: "",
    deliveryPermitPhoto: "",
    tradeLicensePhoto: "",
    isThereWarehouse: false,
    isThereFoodsDelivery: false,
    deliveryType: "",
    deliveryCarsNum: 0,
    deliveryMotorsNum: 0,
    vehicles: [],
    products: [],
    city: "Abadilah",
    addressDetails: "",
    contactName: "",
    floorNum: 0,
    locationType: "home",
    // ...(title && {
    //   title: title,
    // }),
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = (
    values: UserModel,
    { setSubmitting }: FormikHelpers<UserModel>
  ) => {
    signUp(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2 font-body">
      <div className="flex flex-col justify-center items-center w-full h-fit pb-3 pt-12 bg-primary/10">
        <img src={logo} alt="" className="w-1/2 h-auto" />
        <p className="mt-12 font-semibold text-black">{userType}</p>
      </div>
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
            className="mt-12 w-full md:w-1/2 lg:w-1/3 px-8 font-header space-y-3 py-2"
          >
            <div className="relative">
              <p className="text-sm">{t("user_type")} :</p>
              <select
                id="userType"
                name="userType"
                className="block mt-2 appearance-none w-full pr-8 text-xs  font-header mb-2 px-4 py-3 border border-primary rounded-lg focus:outline-none   "
                onBlur={handleBlur}
                onChange={e => {
                  // setAccountType(e.currentTarget.value);
                  setFieldValue("userType", e.currentTarget.value);
                  setUserType(e.target.value);
                }}
                value={userType}
              >
                <option value={USER_TYPE.USER} className="text-xs">
                  {t(USER_TYPE.USER)}
                </option>
                <option value={USER_TYPE.LOCAL_COMPANY} className="text-xs">
                  {t(USER_TYPE.LOCAL_COMPANY)}
                </option>
                <option value={USER_TYPE.CAR} className="text-xs">
                  {t(USER_TYPE.CAR)}
                </option>
                <option value={USER_TYPE.PLANES} className="text-xs">
                  {USER_TYPE.PLANES}
                </option>
                <option value={USER_TYPE.SEA_COMPANIES} className="text-xs">
                  {t(USER_TYPE.SEA_COMPANIES)}
                </option>
                <option value={USER_TYPE.FACTORY} className="text-xs">
                  {t(USER_TYPE.FACTORY)}
                </option>
                <option value={USER_TYPE.FREEZONE} className="text-xs">
                  {t(USER_TYPE.FREEZONE)}
                </option>
                <option value={USER_TYPE.TRADER} className="text-xs">
                  {t(USER_TYPE.TRADER)}
                </option>
                <option value={USER_TYPE.REAL_ESTATE} className="text-xs">
                  {t(USER_TYPE.REAL_ESTATE)}
                </option>
                <option value={USER_TYPE.DELIVERY_COMPANY} className="text-xs">
                  {t(USER_TYPE.DELIVERY_COMPANY)}
                </option>
                <option value={USER_TYPE.NEWS_AGENCY} className="text-xs">
                  {t(USER_TYPE.NEWS_AGENCY)}
                </option>
              </select>
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
            {userType === USER_TYPE.FACTORY && (
              <div className="relative">
                <label htmlFor="factory_type">{t("factory_type")}</label>
                {isErrorFactoriesCat || isLoadingFactoriesCat ? (
                  <p>Loading</p>
                ) : (
                  <select
                    id="title"
                    name="title"
                    className="block mt-2 appearance-none w-full pr-8 text-xs  font-header mb-2 px-4 py-3 border border-primary rounded-lg focus:outline-none   "
                    onBlur={handleBlur}
                    onChange={e => {
                      // setAccountType(e.currentTarget.value);
                      setFieldValue("title", e.currentTarget.value);
                      setSelectedFactoryCat(e.target.value);
                    }}
                    value={selectedFactoryCat}
                  >
                    {factoriesCategories?.map((item, index) => (
                      <>
                        <option
                          key={index}
                          value={item.title}
                          className="text-xs"
                        >
                          {item.title}
                        </option>
                        ,
                      </>
                    ))}
                  </select>
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 top-4 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            )}
            <div>
              <input
                type="text"
                name="username"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={
                  userType !== USER_TYPE.USER
                    ? t("business_name")
                    : t("user_name")
                }
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                style={{ direction: "ltr" }}
              />
              {errors.username && touched.username && (
                <div className="text-red-500 text-xs">{errors.username}</div>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("your_email")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                style={{ direction: "ltr" }}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="contactName"
                className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                placeholder={t("contact_name")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactName}
                style={{ direction: "ltr" }}
              />
              {errors.contactName && touched.contactName && (
                <div className="text-red-500 text-xs">{errors.contactName}</div>
              )}
            </div>
            <>
              <PhoneInput
                containerStyle={{ direction: "ltr" }}
                country={"ae"}
                value={values.firstMobile}
                onBlur={handleBlur}
                onChange={value => setFieldValue("firstMobile", value)}
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
              {errors.firstMobile && touched.firstMobile && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.firstMobile}
                </div>
              )}
            </>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute bottom-2 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <FaEyeLowVision /> : <FaEye />}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("confirm_password")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute bottom-2 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? <FaEyeLowVision /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            {userType === USER_TYPE.LOCAL_COMPANY && (
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="isService"
                  className="mr-2"
                  checked={values.isService}
                />
                <label htmlFor="isService" className="text-xs font-header">
                  {t("are_your_products_shareable_by_the_customer")}
                </label>
              </div>
            )}
            {userType === USER_TYPE.LOCAL_COMPANY && (
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="isSelectable"
                  className="mr-2"
                  checked={values.isSelectable}
                />
                <label htmlFor="isSelectable" className="text-xs font-header">
                  {t("do_you_offer_services_rather_than_products")}
                </label>
              </div>
            )}
            {userType === USER_TYPE.DELIVERY_COMPANY && (
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="isThereWarehouse"
                  className="mr-2"
                  checked={values.isThereWarehouse}
                />
                <label
                  htmlFor="isThereWarehouse"
                  className="text-xs font-header"
                >
                  {t("is_there_a_warehouse")}
                </label>
              </div>
            )}
            {userType === USER_TYPE.DELIVERY_COMPANY && (
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="isThereFoodsDelivery"
                  className="mr-2"
                  checked={values.isThereFoodsDelivery}
                />
                <label
                  htmlFor="isThereFoodsDelivery"
                  className="text-xs font-header"
                >
                  {t("is_there_food_delivery")}
                </label>
              </div>
            )}
            {userType === USER_TYPE.DELIVERY_COMPANY && (
              <div>
                <label className="text-xs font-header">
                  {t("delivery_type")}
                </label>
                <div className="flex flex-row justify-start items-center gap-x-5 w-full mt-3">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="deliveryType"
                      value="Inside country"
                      className="mr-2"
                      checked={values.deliveryType === "Inside country"}
                    />
                    <label
                      htmlFor="Inside country"
                      className="text-xs font-header"
                    >
                      {t("Inside country")}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="deliveryType"
                      value="Outside country"
                      className="mr-2"
                      checked={values.deliveryType === "Outside country"}
                    />
                    <label
                      htmlFor="Outside country"
                      className="text-xs font-header"
                    >
                      {t("Outside country")}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="deliveryType"
                      value="Inside and outside country"
                      className="mr-2"
                      checked={
                        values.deliveryType === "Inside and outside country"
                      }
                    />
                    <label
                      htmlFor="Inside and outside country"
                      className="text-xs font-header"
                    >
                      {t("Inside and outside country")}
                    </label>
                  </div>
                </div>
              </div>
            )}
            {userType === USER_TYPE.DELIVERY_COMPANY && (
              <div>
                <label className="text-xs font-header">
                  {t("deliveryCarsNum")}
                </label>
                <input
                  type="number"
                  name="deliveryCarsNum"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("deliveryCarsNum")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.deliveryCarsNum}
                  style={{ direction: "ltr" }}
                />
                {errors.deliveryCarsNum && touched.deliveryCarsNum && (
                  <div className="text-red-500 text-xs">
                    {errors.deliveryCarsNum}
                  </div>
                )}
              </div>
            )}
            {userType === USER_TYPE.DELIVERY_COMPANY && (
              <div>
                <label className="text-xs font-header">
                  {t("deliveryMotorsNum")}
                </label>
                <input
                  type="number"
                  name="deliveryMotorsNum"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("deliveryMotorsNum")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.deliveryMotorsNum}
                  style={{ direction: "ltr" }}
                />
                {errors.deliveryMotorsNum && touched.deliveryMotorsNum && (
                  <div className="text-red-500 text-xs">
                    {errors.deliveryMotorsNum}
                  </div>
                )}
              </div>
            )}
            <hr className="w-full" />
            <div className="flex flex-col space-y-2 w-full">
              <p className="font-semibold">{t("location_info")} :</p>
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
                      setFieldValue("city", e.target.value);
                      setSelectedCity(e.target.value);
                    }}
                    value={selectedCity}
                  >
                    {citiesInfo?.Cities.map((city, index) => (
                      <>
                        <option key={index} value={city} className="text-xs">
                          {city}
                        </option>
                        ,
                      </>
                    ))}
                  </select>
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 top-4 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col w-full flex-wrap">
                <label className="text-xs font-header">{t("address")}</label>
                <p className="text-xs text-gray-500 mb-1 w-full break-all">
                  {t(
                    "please_enter_your_address_in_english_language_according_to_delivery_policy"
                  )}
                </p>
                <input
                  type="text"
                  name="address"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("address")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  style={{ direction: "ltr" }}
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-xs">{errors.address}</div>
                )}
              </div>
              <div>
                <label className="text-xs font-header">
                  {t("address_details")}
                </label>
                <p className="text-xs text-gray-500 mb-1 w-full break-all">
                  {t(
                    "please_enter_your_address_details_in_english_language_according_to_delivery_policy"
                  )}
                </p>
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
              <div>
                <label className="text-xs font-header">
                  {t("floor_number")}
                </label>
                <input
                  type="number"
                  name="floorNum"
                  className="text-xs w-full font-header mb-2 rounded border bg-white border-primary px-2 py-2 focus:outline-none focus:border-gray-400"
                  placeholder={t("floor_number")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.floorNum}
                  style={{ direction: "ltr" }}
                />
                {errors.floorNum && touched.floorNum && (
                  <div className="text-red-500 text-xs">{errors.floorNum}</div>
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
            </div>
            {userType !== USER_TYPE.USER && (
              <div className="flex flex-col w-full">
                <p className="text-sm">{t("copy_of_trade_license")}</p>
                <input
                  type="file"
                  accept="image/*"
                  className="  w-full h-full   cursor-pointer"
                  onChange={event => {
                    if (event.target.files && event.target.files.length > 0) {
                      setFieldValue("tradeLicensePhoto", event.target.files[0]);
                    }
                  }}
                />
              </div>
            )}
            <div className="flex flex-col w-full">
              <p className="text-sm">{t("profile_photo")}</p>
              <input
                type="file"
                accept="image/*"
                className="  w-full h-full   cursor-pointer"
                onChange={event => {
                  if (event.target.files && event.target.files.length > 0) {
                    setFieldValue("profilePhoto", event.target.files[0]);
                  }
                }}
              />
              {errors.profilePhoto && touched.profilePhoto && (
                <div className="text-red-500 text-xs">
                  {errors.profilePhoto}
                </div>
              )}
            </div>
            {userType !== USER_TYPE.USER && (
              <>
                <div className="flex flex-col w-full">
                  <p className="text-sm">{t("cover_photo")}</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="  w-full h-full cursor-pointer"
                    onChange={event => {
                      if (event.target.files && event.target.files.length > 0) {
                        setFieldValue("coverPhoto", event.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm">{t("front_id_photo")}</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="  w-full h-full   cursor-pointer"
                    onChange={event => {
                      if (event.target.files && event.target.files.length > 0) {
                        setFieldValue("frontIdPhoto", event.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm">{t("back_id_photo")}</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="  w-full h-full   cursor-pointer"
                    onChange={event => {
                      if (event.target.files && event.target.files.length > 0) {
                        setFieldValue("backIdPhoto", event.target.files[0]);
                      }
                    }}
                  />
                </div>
              </>
            )}
            {userType === USER_TYPE.DELIVERY_COMPANY && (
              <div className="flex flex-col w-full">
                <p className="text-sm">{t("delivery_permit_photo")}</p>
                <input
                  type="file"
                  accept="image/*"
                  className="  w-full h-full   cursor-pointer"
                  onChange={event => {
                    if (event.target.files && event.target.files.length > 0) {
                      setFieldValue(
                        "deliveryPermitPhoto",
                        event.target.files[0]
                      );
                    }
                  }}
                />
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/50 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? t("Saving") : t("create_new_account")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
