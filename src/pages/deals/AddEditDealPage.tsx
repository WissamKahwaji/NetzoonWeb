/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useCountry } from "../../context/CountryContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddDealMutation,
  useEditDealMutation,
  useGetDealByIdQuery,
  useGetDealsCategoriesQuery,
} from "../../apis/deals/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useEffect, useState } from "react";
import { DealsItemInputModel } from "../../apis/deals/type";
import { Formik, FormikHelpers } from "formik";

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "";
  return typeof date === "string"
    ? date.split("T")[0]
    : date.toISOString().split("T")[0];
};

const AddEditDealPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { country } = useCountry();

  const userId = localStorage.getItem("userId");

  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();

  const {
    data: dealsCategories,
    isError,
    isLoading,
  } = useGetDealsCategoriesQuery();
  const { data: dealInfo } = useGetDealByIdQuery(id ?? "");
  const { mutate: addDeal } = useAddDealMutation();
  const { mutate: editDeal } = useEditDealMutation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dealImg, setDealImg] = useState("");
  const [initialValues, setInitialValues] = useState<DealsItemInputModel>({
    ...(id && { _id: id }),
    country: country ?? "AE",
    description: "",
    category: "",
    companyName: "",
    currentPrice: 0,
    name: "",
    owner: userId ?? "",
    imgUrl: "",
    location: "",
    prevPrice: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id && dealInfo) {
      if (userId !== dealInfo.owner?._id) {
        navigate("/", { replace: true });
      }
    }
  }, [dealInfo, id, navigate, userId]);
  useEffect(() => {
    if (id && dealInfo) {
      setInitialValues({
        _id: id,
        country: dealInfo.country ?? country,
        description: dealInfo?.description ?? "",
        category: selectedCategory ?? "",
        companyName: dealInfo?.companyName ?? "",
        currentPrice: dealInfo?.currentPrice ?? 0,
        name: dealInfo?.name ?? "",
        owner: dealInfo?.owner?._id ?? userId ?? "",
        imgUrl: dealInfo?.imgUrl ?? "",
        location: dealInfo?.location ?? "",
        prevPrice: dealInfo?.prevPrice ?? 0,
        startDate: formatDate(dealInfo?.startDate),
        endDate: formatDate(dealInfo?.endDate),
      });
    } else {
      setInitialValues({
        country: country ?? "AE",
        description: "",
        category: selectedCategory ?? "",
        companyName: "",
        currentPrice: 0,
        name: "",
        owner: userId ?? "",
        imgUrl: "",
        location: "",
        prevPrice: 0,
        startDate: "",
        endDate: "",
      });
    }
  }, [country, dealInfo, id, selectedCategory, userId]);

  useEffect(() => {
    if (dealsCategories) {
      setSelectedCategory(dealsCategories[0]._id ?? "");
    }
    if (dealInfo) {
      setDealImg(dealInfo.imgUrl ?? "");
    }
  }, [dealInfo, dealsCategories]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter deal name"),

    description: Yup.string().required("Please enter deal description"),
    companyName: Yup.string().required("Please enter deal seller"),
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

  const handleSubmit = (
    values: DealsItemInputModel,
    { setSubmitting }: FormikHelpers<DealsItemInputModel>
  ) => {
    id
      ? editDeal(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addDeal(values, {
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
        {id ? `${t("edit_deal")}` : `${t("add_deal")}`}
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
                          const selectedCat = dealsCategories?.find(
                            dept => dept._id === selectedCategoryId
                          );

                          if (selectedCat) {
                            // Set both the department ID and name
                            setSelectedCategory(selectedCategoryId);

                            // Update form values if using Formik or another form handler
                            setFieldValue("category", selectedCategoryId);
                          }
                        }}
                        value={selectedCategory}
                      >
                        {dealsCategories &&
                          dealsCategories.map(item => (
                            <option
                              key={item._id}
                              value={item._id}
                              className="text-xs bg-primary focus:bg-secondary"
                            >
                              {selectedLang === "en"
                                ? item.name
                                : item.nameAr ?? item.name}
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
                    htmlFor="name"
                  >
                    {t("deal_title")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    style={{ direction: "ltr" }}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.name}
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
                    htmlFor="companyName"
                  >
                    {t("seller_name")}
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.companyName}
                    style={{ direction: "ltr" }}
                  />
                  {errors.companyName && touched.companyName && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.companyName}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="prevPrice"
                  >
                    {t("previous_price")}
                  </label>
                  <input
                    id="prevPrice"
                    name="prevPrice"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prevPrice}
                    style={{ direction: "ltr" }}
                  />
                  {errors.prevPrice && touched.prevPrice && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.prevPrice}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="currentPrice"
                  >
                    {t("current_price")}
                  </label>
                  <input
                    id="currentPrice"
                    name="currentPrice"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentPrice}
                    style={{ direction: "ltr" }}
                  />
                  {errors.currentPrice && touched.currentPrice && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.currentPrice}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="startDate"
                  >
                    {t("start_date")}
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.startDate}
                    style={{ direction: "ltr" }}
                  />
                  {errors.startDate && touched.startDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.startDate}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="endDate"
                  >
                    {t("end_date")}
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endDate}
                    style={{ direction: "ltr" }}
                  />
                  {errors.endDate && touched.endDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.endDate}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="location"
                  >
                    {t("location")}
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    style={{ direction: "ltr" }}
                  />
                  {errors.location && touched.location && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_deal_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={dealImg}
                      alt="deal_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("deal_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="deal_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(
                          e,
                          setFieldValue,
                          "dealImage",
                          setDealImg
                        );
                      }}
                      className="hidden"
                    />
                  </div>
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

export default AddEditDealPage;
