/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import {
  useEditUserMutation,
  useGetUserByIdQuery,
} from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { UserModel } from "../../apis/user/type";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { USER_TYPE } from "../../constants";

const EditProfilePage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  const {
    data: userInfo,
    isError,
    isLoading,
  } = useGetUserByIdQuery(userId ?? "");
  const { mutate: editUser } = useEditUserMutation();

  const [profilePicture, setProfilePicture] = useState(userInfo?.profilePhoto);
  const [coverPhoto, setCoverPhoto] = useState(userInfo?.coverPhoto);

  useEffect(() => {
    if (userInfo) {
      setProfilePicture(userInfo?.profilePhoto);
      setCoverPhoto(userInfo?.coverPhoto);
    }
  }, [userInfo]);

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
    city: userInfo?.city,
    addressDetails: userInfo?.addressDetails,
    contactName: userInfo?.contactName,
    floorNum: userInfo?.floorNum,
    locationType: userInfo?.locationType,
  };

  const handleProfilePictureChange = async (
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
    email: Yup.string().required("Please enter your email"),
    firstMobile: Yup.string().min(
      9,
      "Mobile number must be at least 9 characters long"
    ),
  });

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

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
            <div className="flex flex-col  md:flex-row w-full md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {t("profile_picture")}
                </label>
                <div className="flex flex-row w-full items-center gap-x-2">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="rounded-full border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const inputElement =
                        document.getElementById("profilePhoto");
                      if (inputElement) {
                        (inputElement as HTMLInputElement).click();
                      }
                    }}
                    className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {t("change_picture")}
                  </button>
                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      handleProfilePictureChange(
                        e,
                        setFieldValue,
                        "profilePhoto",
                        setProfilePicture
                      );
                    }}
                    className="hidden"
                  />
                </div>
              </div>
              {userInfo?.userType !== USER_TYPE.USER && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("coverPhoto")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      src={coverPhoto}
                      alt="Profile"
                      crossOrigin="anonymous"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-[300px] h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("coverPhoto");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs  px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_cover_picture")}
                    </button>
                    <input
                      id="coverPhoto"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleProfilePictureChange(
                          e,
                          setFieldValue,
                          "coverPhoto",
                          setCoverPhoto
                        );
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  style={{ direction: "ltr" }}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="username"
                >
                  {t("user_name")}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  style={{ direction: "ltr" }}
                />
                {errors.username && touched.username && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="contactName"
                >
                  {t("contact_name")}
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contactName}
                  style={{ direction: "ltr" }}
                />
                {errors.contactName && touched.contactName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.contactName}
                  </div>
                )}
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
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="address"
                >
                  {t("address")}
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  style={{ direction: "ltr" }}
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.address}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="addressDetails"
                >
                  {t("address_details")}
                </label>
                <input
                  id="addressDetails"
                  name="addressDetails"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.addressDetails}
                  style={{ direction: "ltr" }}
                />
                {errors.addressDetails && touched.addressDetails && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.addressDetails}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-medium text-gray-700"
                  htmlFor="bio"
                >
                  {t("bio")}
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="min-h-[100px] px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio ?? ""}
                  style={{ direction: "ltr" }}
                />
                {errors.bio && touched.bio && (
                  <div className="text-red-500 text-xs mt-1">{errors.bio}</div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  {t("description")}
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="min-h-[100px] px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description ?? ""}
                  style={{ direction: "ltr" }}
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="website"
                >
                  {t("website")}
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.website}
                  style={{ direction: "ltr" }}
                />
                {errors.website && touched.website && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.website}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="link"
                >
                  {t("link")}
                </label>
                <input
                  id="link"
                  name="link"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.link}
                  style={{ direction: "ltr" }}
                />
                {errors.link && touched.link && (
                  <div className="text-red-500 text-xs mt-1">{errors.link}</div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="slogn"
                >
                  {t("slogn")}
                </label>
                <input
                  id="slogn"
                  name="slogn"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.slogn}
                  style={{ direction: "ltr" }}
                />
                {errors.slogn && touched.slogn && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.slogn}
                  </div>
                )}
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

export default EditProfilePage;
