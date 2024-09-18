import { useTranslation } from "react-i18next";
import {
  useCompleteUserMutation,
  useGetUserByIdQuery,
} from "../../apis/user/queries";
import { useGetAramexCitiesQuery } from "../../apis/aramex/queries";
import { useCountry } from "../../context/CountryContext";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { Field, Formik, FormikHelpers } from "formik";
import { UserModel } from "../../apis/user/type";
import { USER_TYPE } from "../../constants";
import * as Yup from "yup";

const CompleteProfilePage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { country } = useCountry();
  const {
    data: userInfo,
    isError,
    isLoading,
  } = useGetUserByIdQuery(userId ?? "");
  const {
    data: citiesInfo,
    isError: isErrorCities,
    isLoading: isLoadingCities,
  } = useGetAramexCitiesQuery(country);
  const { mutate: editUser } = useCompleteUserMutation();
  const [selectedCity, setSelectedCity] = useState(
    userInfo?.city ?? citiesInfo?.Cities[0]
  );
  const [userType, setUserType] = useState<string>(
    userInfo?.userType ?? USER_TYPE.LOCAL_COMPANY
  );

  useEffect(() => {
    if (userInfo) {
      setUserType(userInfo.userType ?? USER_TYPE.LOCAL_COMPANY);
    }
  }, [userInfo]);

  useEffect(() => {
    if (citiesInfo) {
      setSelectedCity(userInfo?.city ?? citiesInfo?.Cities[0]);
    }
  }, [citiesInfo, userInfo?.city]);

  const initialValues: UserModel = {
    _id: userId ?? "",
    username: userInfo?.username ?? "",
    email: userInfo?.email ?? "",
    userType: userInfo?.userType ?? "",

    firstMobile: userInfo?.firstMobile ?? "",
    isFreeZoon: userInfo?.isFreeZoon,
    isService: userInfo?.isService,
    isSelectable: userInfo?.isSelectable,
    freezoneCity: userInfo?.freezoneCity,
    deliverable: userInfo?.deliverable,
    subcategory: userInfo?.subcategory,
    country: userInfo?.country ?? "AE",
    address: userInfo?.address,

    sellType: userInfo?.sellType,

    bio: userInfo?.bio,
    description: userInfo?.description,
    website: userInfo?.website,
    slogn: userInfo?.slogn,
    link: userInfo?.link,

    isThereWarehouse: userInfo?.isThereWarehouse,
    isThereFoodsDelivery: userInfo?.isThereFoodsDelivery,
    deliveryType: userInfo?.deliveryType,
    deliveryCarsNum: userInfo?.deliveryCarsNum,
    deliveryMotorsNum: userInfo?.deliveryMotorsNum,
    netzoonBalance: userInfo?.netzoonBalance,
    city: userInfo?.city ?? "Abadilah",
    addressDetails: userInfo?.addressDetails,
    contactName: userInfo?.contactName,
    floorNum: userInfo?.floorNum,
    locationType: userInfo?.locationType,
  };

  const handleSubmit = (
    values: UserModel,
    { setSubmitting }: FormikHelpers<UserModel>
  ) => {
    editUser(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  const validationSchema = Yup.object().shape({
    firstMobile: Yup.string()
      .required("please enter a mobile number")
      .matches(/^\+?\d+$/, "Invalid mobile number")
      .min(9, "Mobile number must be at least 9 characters long"),
    address: Yup.string().required("Please enter your address"),
    addressDetails: Yup.string().required("Please enter your address details"),
    floorNum: Yup.string().required("Please enter your floor Num"),
    locationType: Yup.string().required("Please choose location Type"),
    city: Yup.string().required("Please choose city"),
  });

  if (isError || isErrorCities) return <div>Error !!!</div>;
  if (isLoading || isLoadingCities) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center  py-2 font-header w-full md:w-[60%] md:mx-auto md:py-5">
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
          <form onSubmit={handleSubmit} className="space-y-4 w-full px-2">
            <div className="flex flex-col space-y-2">
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
                  <option
                    value={USER_TYPE.DELIVERY_COMPANY}
                    className="text-xs"
                  >
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
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="firstMobile"
                >
                  {t("first_mobile")}
                </label>
                <input
                  id="firstMobile"
                  name="firstMobile"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstMobile}
                  style={{ direction: "ltr" }}
                />
                {errors.firstMobile && touched.firstMobile && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.firstMobile}
                  </div>
                )}
              </div>
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
                      setFieldValue("city", e.currentTarget.value);
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
              <div>
                <label className="text-xs font-header">{t("address")}</label>
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
            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? t("Saving") : t("save")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CompleteProfilePage;
