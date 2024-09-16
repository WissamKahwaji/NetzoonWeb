/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useParams } from "react-router-dom";
import {
  useAddServiceMutation,
  useEditServiceMutation,
  useGetServiceByIdQuery,
  useGetServicesCategoriesQuery,
} from "../../apis/services/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { ServiceInputModel } from "../../apis/services/type";
import { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddEditServicePage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { country } = useCountry();

  const userId = localStorage.getItem("userId");

  const { id } = useParams<{
    id: string;
  }>();

  const {
    data: servicesCategories,
    isError,
    isLoading,
  } = useGetServicesCategoriesQuery();
  const { data: serviceInfo } = useGetServiceByIdQuery(id ?? "");
  const { mutate: addService } = useAddServiceMutation();
  const { mutate: editService } = useEditServiceMutation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [serviceImg, setServiceImg] = useState("");
  const [initialValues, setInitialValues] = useState<ServiceInputModel>({
    title: "",
    description: "",
    owner: userId ?? "",
    imageUrl: "",
    whatsAppNumber: "",
    country: country,
    bio: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (id && serviceInfo) {
      setInitialValues({
        _id: id,
        title: serviceInfo?.title ?? "",
        description: serviceInfo?.description ?? "",
        owner: userId ?? "",
        imageUrl: serviceInfo.imageUrl ?? "",
        whatsAppNumber: serviceInfo?.whatsAppNumber ?? "",
        country: serviceInfo?.country ?? country,
        bio: serviceInfo?.bio ?? "",
        price: serviceInfo?.price ?? 0,
        category: selectedCategory ?? "",
      });
    } else {
      setInitialValues({
        title: "",
        description: "",
        owner: userId ?? "",
        whatsAppNumber: "",
        country: "AE",
        bio: "",
        price: 0,
        category: selectedCategory ?? "",
      });
    }
  }, [country, id, selectedCategory, serviceInfo, userId]);

  useEffect(() => {
    if (servicesCategories) {
      setSelectedCategory(servicesCategories[0]._id ?? "");
    }
    if (serviceInfo) {
      setServiceImg(serviceInfo.imageUrl ?? "");
    }
  }, [serviceInfo, servicesCategories]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter service title"),

    description: Yup.string().required("Please enter service description"),
    price: Yup.number().required("Please enter service price"),
  });

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

  const handleChoosenServiceImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files) {
      if (event.target.files.length > 6) {
        toast.info("you_can't select more than 6 files");
      } else {
        const filesArray = Array.from(event.target.files).slice(0, 6);

        setFieldValue("serviceImageList", filesArray);
      }
    }
  };

  const handleSubmit = (
    values: ServiceInputModel,
    { setSubmitting }: FormikHelpers<ServiceInputModel>
  ) => {
    id
      ? editService(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addService(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {id ? `${t("edit_service")}` : `${t("add_service")}`}
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
                      htmlFor="category"
                    >
                      {t("category")}
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={e => {
                          const selectedCategoryId = e.currentTarget.value;

                          // Find the selected department object by ID
                          const selectedDepartment = servicesCategories?.find(
                            dept => dept._id === selectedCategoryId
                          );

                          if (selectedDepartment) {
                            // Set both the department ID and name
                            setSelectedCategory(selectedCategoryId);

                            // Update form values if using Formik or another form handler
                            setFieldValue("category", selectedCategoryId);
                          }
                        }}
                        value={selectedCategory}
                      >
                        {servicesCategories &&
                          servicesCategories.map(item => (
                            <option
                              key={item._id}
                              value={item._id}
                              className="text-xs bg-primary focus:bg-secondary"
                            >
                              {selectedLang === "en"
                                ? item.title
                                : item.titleAr ?? item.title}
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
                    htmlFor="title"
                  >
                    {t("service_name")}
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    style={{ direction: "ltr" }}
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.title}
                    </div>
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
                    htmlFor="price"
                  >
                    {t("price")}
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    style={{ direction: "ltr" }}
                  />
                  {errors.price && touched.price && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.price}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="whatsAppNumber"
                  >
                    {t("whats_app_number")}
                  </label>
                  <input
                    id="whatsAppNumber"
                    name="whatsAppNumber"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.whatsAppNumber}
                    style={{ direction: "ltr" }}
                  />
                  {errors.whatsAppNumber && touched.whatsAppNumber && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.whatsAppNumber}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="bio"
                  >
                    {t("bio")}
                  </label>
                  <input
                    id="bio"
                    name="bio"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bio}
                    style={{ direction: "ltr" }}
                  />
                  {errors.bio && touched.bio && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.bio}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_service_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={serviceImg}
                      alt="service_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("service_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="service_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(
                          e,
                          setFieldValue,
                          "image",
                          setServiceImg
                        );
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_service_images")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChoosenServiceImages(event, setFieldValue);
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
    </div>
  );
};

export default AddEditServicePage;
