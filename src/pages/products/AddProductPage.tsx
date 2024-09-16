/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import {
  useGetAllCategoriesByDepartmentQuery,
  useGetAllDepartmentsQuery,
} from "../../apis/departments/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AddEditProductInputModel } from "../../apis/product/type";
import { useParams } from "react-router-dom";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductByIdQuery,
} from "../../apis/product/queries";
import { useCountry } from "../../context/CountryContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { productId } = useParams<{ productId: string }>();
  const { country } = useCountry();
  const userId = localStorage.getItem("userId");

  const {
    data: departmentsInfo,
    isError,
    isLoading,
  } = useGetAllDepartmentsQuery();
  const { data: productInfo } = useGetProductByIdQuery(productId ?? "");

  const { mutate: addProduct } = useAddProductMutation();
  const { mutate: editProduct } = useEditProductMutation();

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [conditionType, setConditionType] = useState("");
  const [productImg, setProductImg] = useState("");

  const {
    data: categoriesInfo,
    // isError: isErrorCategory,
    // isLoading: isLoadingCategory,
    refetch,
  } = useGetAllCategoriesByDepartmentQuery(selectedDepartmentId);
  useEffect(() => {
    if (departmentsInfo) {
      setSelectedDepartment(departmentsInfo[0].name);
      setSelectedDepartmentId(departmentsInfo[0]._id);
    }
    if (productInfo) {
      setProductImg(productInfo.imageUrl ?? "");
      setConditionType(productInfo.condition ?? "new");
    }
  }, [departmentsInfo, productInfo]);

  useEffect(() => {
    if (selectedDepartmentId) {
      refetch();
    }
    if (categoriesInfo) {
      setSelectedCategory(categoriesInfo[0].name);
    }
  }, [selectedDepartmentId, refetch, categoriesInfo]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter product name"),
    condition: Yup.string().required("Please enter product condition"),
    description: Yup.string().required("Please enter product description"),
    price: Yup.number().required("Please enter product price"),
    weight: Yup.number().required("Please enter product weight"),
  });
  const initialValues: AddEditProductInputModel = {
    ...(productId && { _id: productId }),
    owner: productInfo?.owner._id ?? userId ?? "",
    name: productInfo?.name ?? "",
    departmentName: selectedDepartment,
    categoryName: selectedCategory,
    condition: productInfo?.condition ?? "new",
    description: productInfo?.description ?? "",
    price: productInfo?.price ?? 0,
    quantity: productInfo?.quantity ?? 0,
    weight: productInfo?.weight ?? 0,
    guarantee: productInfo?.guarantee ?? false,
    address: productInfo?.address ?? "",
    color: productInfo?.color ?? "",
    discountPercentage: productInfo?.discountPercentage ?? 0,
    country: country ?? "AE",
  };

  const handleSubmit = (
    values: AddEditProductInputModel,
    { setSubmitting, resetForm }: FormikHelpers<AddEditProductInputModel>
  ) => {
    if (productId) {
      editProduct(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
      resetForm();
    } else {
      addProduct(values, {
        onSettled() {
          setSubmitting(false);
        },
      });
      resetForm();
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
  const handleChoosenProductImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files) {
      if (event.target.files.length > 6) {
        toast.info("you_can't select more than 6 files");
      } else {
        const filesArray = Array.from(event.target.files).slice(0, 6);

        setFieldValue("productimages", filesArray);
      }
    }
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {productId ? `${t("edit_product")}` : `${t("add_product")}`}
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
                {!productId && (
                  <div>
                    <label
                      className="text-sm font-medium text-gray-700 text-start"
                      htmlFor="department"
                    >
                      {t("department")}
                    </label>
                    <div className="relative">
                      <select
                        id="department"
                        name="department"
                        className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={e => {
                          const selectedDepartmentId = e.currentTarget.value;

                          // Find the selected department object by ID
                          const selectedDepartment = departmentsInfo?.find(
                            dept => dept._id === selectedDepartmentId
                          );

                          if (selectedDepartment) {
                            // Set both the department ID and name
                            setSelectedDepartmentId(selectedDepartmentId);
                            setSelectedDepartment(selectedDepartment.name);

                            // Update form values if using Formik or another form handler
                            setFieldValue("departmentId", selectedDepartmentId);
                            setFieldValue(
                              "departmentName",
                              selectedDepartment.name
                            );

                            // Trigger refetch to load categories related to the selected department
                            refetch();
                          }
                        }}
                        value={selectedDepartmentId}
                      >
                        {departmentsInfo &&
                          departmentsInfo.map(item => (
                            <option
                              key={item._id}
                              value={item._id}
                              className="text-xs bg-primary focus:bg-secondary"
                            >
                              {t(item.name)}
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

                {!productId && (
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
                        className="block h-[40px] appearance-none w-full  px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={e => {
                          const selectedCat = categoriesInfo?.find(
                            cat => cat.name === e.currentTarget.value
                          );
                          if (selectedCat) {
                            setSelectedCategory(selectedCat.name);
                            setFieldValue("categoryName", selectedCat.name);
                          }
                        }}
                        value={selectedCategory}
                      >
                        {categoriesInfo &&
                          categoriesInfo.map(item => (
                            <option
                              key={item._id}
                              value={item.name}
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
                          <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
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
                    {t("product_name")}
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
                    htmlFor="weight"
                  >
                    {t("weightKg")}
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.weight}
                    style={{ direction: "ltr" }}
                  />
                  {errors.weight && touched.weight && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.weight}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="quantity"
                  >
                    {t("quantity")}
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantity}
                    style={{ direction: "ltr" }}
                  />
                  {errors.quantity && touched.quantity && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.quantity}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="color"
                  >
                    {t("color")}
                  </label>
                  <input
                    id="color"
                    name="color"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.color}
                    style={{ direction: "ltr" }}
                  />
                  {errors.color && touched.color && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.color}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="discountPercentage"
                  >
                    {t("discount_percentage")}
                  </label>
                  <input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discountPercentage}
                    style={{ direction: "ltr" }}
                  />
                  {errors.discountPercentage && touched.discountPercentage && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.discountPercentage}
                    </div>
                  )}
                </div>
                <div className="flex flex-row justify-start items-center gap-x-7">
                  <p>{t("condition")} : </p>
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="conditionType"
                      value="new"
                      checked={conditionType === "new"}
                      onChange={() => {
                        setConditionType("new");
                        setFieldValue("condition", "new");
                      }}
                      // className="form-radio h-4 w-4 text-blue-600 "
                      className="hidden"
                    />
                    <span
                      className={`inline-block w-4 h-4 border-2 rounded-md cursor-pointer relative ${
                        conditionType === "new"
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-gray-400"
                      }`}
                    ></span>
                    <span className="text-gray-700 font-medium">
                      {t("new")}
                    </span>
                  </label>
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="conditionType"
                      value="used"
                      checked={conditionType === "used"}
                      onChange={() => {
                        setConditionType("used");
                        setFieldValue("condition", "used");
                      }}
                      // className="form-radio h-4 w-4 text-blue-600 "
                      className="hidden"
                    />
                    <span
                      className={`inline-block w-4 h-4 border-2 rounded-md cursor-pointer relative ${
                        conditionType === "used"
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-gray-400"
                      }`}
                    ></span>
                    <span className="text-gray-700 font-medium">
                      {t("used")}
                    </span>
                  </label>
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
                    htmlFor="madeIn"
                  >
                    {t("made_in")}
                  </label>
                  <input
                    id="madeIn"
                    name="madeIn"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.madeIn}
                    style={{ direction: "ltr" }}
                  />
                  {errors.madeIn && touched.madeIn && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.madeIn}
                    </div>
                  )}
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
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("product_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={productImg}
                      alt="product_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("product_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="product_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(
                          e,
                          setFieldValue,
                          "image",
                          setProductImg
                        );
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_product_images")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChoosenProductImages(event, setFieldValue);
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

export default AddProductPage;
