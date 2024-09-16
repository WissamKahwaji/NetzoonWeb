/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddRealEstateMutation,
  useEditRealEstateMutation,
  useGetRealEstateByIdQuery,
} from "../../apis/real_estate/queries";
import { useEffect, useState } from "react";
import { RealEstateInputModel } from "../../apis/real_estate/type";
import { REAL_ESTATE_TYPES } from "../../constants";
import { Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddEditRealEstatePage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { country } = useCountry();
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { data: realEstateInfo } = useGetRealEstateByIdQuery(id ?? "");
  const { mutate: addRealEstate } = useAddRealEstateMutation();
  const { mutate: editRealEstate } = useEditRealEstateMutation();
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [realEstateCategories, setRealEstateCategories] = useState<string[]>();
  const [selectedRealEstateCategory, setSelectedRealEstateCategory] =
    useState<string>();
  const [realEstateImg, setRealEstateImg] = useState("");

  const [initialValues, setInitialValues] = useState<RealEstateInputModel>({
    ...(id && { _id: id }),
    title: "",
    imageUrl: "",
    description: "",
    price: 0,
    createdBy: userId ?? "",
    country: country,
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
  });
  useEffect(() => {
    if (id && realEstateInfo) {
      if (userId !== realEstateInfo.createdBy?._id) {
        navigate("/", { replace: true });
      }
    }
  }, [id, navigate, realEstateInfo, userId]);

  useEffect(() => {
    if (id && realEstateInfo) {
      setInitialValues({
        _id: id,
        title: realEstateInfo.title,
        imageUrl: realEstateInfo.imageUrl,
        description: realEstateInfo.description,
        price: realEstateInfo.price,
        createdBy: realEstateInfo.createdBy._id ?? userId ?? "",
        amenities: realEstateInfo.amenities,
        area: realEstateInfo.area,
        bathrooms: realEstateInfo.bathrooms,
        bedrooms: realEstateInfo.bedrooms,
        category: realEstateInfo.category,
        forWhat: realEstateInfo.forWhat,
        furnishing: realEstateInfo.furnishing,
        location: realEstateInfo.location,
        images: realEstateInfo.images,
        type: realEstateInfo.type,
        country: country,
      });
    } else {
      setInitialValues({
        ...(id && { _id: id }),
        title: "",
        imageUrl: "",
        description: "",
        price: 0,
        createdBy: userId ?? "",
        country: country,
        area: 0,
        bedrooms: 0,
        bathrooms: 0,
      });
    }
  }, [country, id, realEstateInfo, userId]);
  useEffect(() => {
    const realEstateCat =
      REAL_ESTATE_TYPES.find(
        realestate => realestate.name === selectedPropertyType
      )?.categories || REAL_ESTATE_TYPES[0].categories;
    setRealEstateCategories(realEstateCat);
  }, [selectedPropertyType]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter title"),

    description: Yup.string().required("Please enter description"),
    price: Yup.number().required("Please enter price"),
    area: Yup.number().required("Please enter area"),
    bedrooms: Yup.number().required("Please enter bedrooms"),
    bathrooms: Yup.number().required("Please enter bathrooms"),
    location: Yup.string().required("Please enter location"),
  });

  const handleSubmit = (
    values: RealEstateInputModel,
    { setSubmitting }: FormikHelpers<RealEstateInputModel>
  ) => {
    id
      ? editRealEstate(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addRealEstate(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
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

  const handleChoosenRealEstateImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files) {
      if (event.target.files.length > 6) {
        toast.info("you_can't select more than 6 files");
      } else {
        const filesArray = Array.from(event.target.files).slice(0, 6);

        setFieldValue("realestateimages", filesArray);
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {id ? `${t("edit_real_estate")}` : `${t("add_real_estate")}`}
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
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="title"
                  >
                    {t("real_estate_name")}
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
                    className=" text-sm font-medium text-gray-700"
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
                    htmlFor="area"
                  >
                    {t("area")}
                  </label>
                  <input
                    id="area"
                    name="area"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.area}
                    style={{ direction: "ltr" }}
                  />
                  {errors.area && touched.area && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.area}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 text-start"
                    htmlFor="type"
                  >
                    {t("property_type")}
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                      onBlur={handleBlur}
                      onChange={event => {
                        const propertyType = event.target.value as string;
                        setSelectedPropertyType(propertyType);
                        setSelectedRealEstateCategory(""); // Reset category when car name changes

                        setFieldValue("type", propertyType);
                      }}
                      value={selectedPropertyType}
                    >
                      {REAL_ESTATE_TYPES.map((item, index) => (
                        <option
                          key={index}
                          value={item.name}
                          className="text-xs bg-primary focus:bg-secondary"
                        >
                          {item.name}
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
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 text-start"
                    htmlFor="categories"
                  >
                    {t("residential_categories")}
                  </label>
                  <div className="relative">
                    <select
                      id="categories"
                      name="categories"
                      className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                      onBlur={handleBlur}
                      onChange={event => {
                        const realEstateCategory = event.target.value as string;
                        setSelectedRealEstateCategory(realEstateCategory);
                        setFieldValue("category", realEstateCategory);
                      }}
                      value={selectedRealEstateCategory}
                    >
                      {realEstateCategories &&
                        realEstateCategories.map((item, index) => (
                          <option
                            key={index}
                            value={item}
                            className="text-xs bg-primary focus:bg-secondary"
                          >
                            {item}
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

                <div>
                  <label
                    className="text-sm font-medium text-gray-700 text-start"
                    htmlFor="forWhat"
                  >
                    {t("for_what")}
                  </label>
                  <div className="relative">
                    <select
                      id="forWhat"
                      name="forWhat"
                      className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                      onBlur={handleBlur}
                      onChange={event => {
                        const forWhat = event.target.value as string;

                        setFieldValue("forWhat", forWhat);
                      }}
                      value={values.forWhat}
                    >
                      {["buy", "rent"].map((item, index) => (
                        <option
                          key={index}
                          value={item}
                          className="text-xs bg-primary focus:bg-secondary"
                        >
                          {item}
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
                <div className="w-full flex justify-start items-center gap-x-7">
                  <p>{t("is_it_furnished")} ? </p>
                  <input
                    type="checkbox"
                    name="furnishing"
                    id="furnishing"
                    className="w-4 h-4 cursor-pointer"
                    onChange={e => {
                      setFieldValue("furnishing", e.target.checked);
                    }}
                  />
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
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="bedrooms"
                  >
                    {t("bedrooms")}
                  </label>
                  <input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bedrooms}
                    style={{ direction: "ltr" }}
                  />
                  {errors.bedrooms && touched.bedrooms && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.bedrooms}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="bathrooms"
                  >
                    {t("bathrooms")}
                  </label>
                  <input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bathrooms}
                    style={{ direction: "ltr" }}
                  />
                  {errors.bathrooms && touched.bathrooms && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.bathrooms}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("real_estate_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={realEstateImg}
                      alt="real_estate_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("real_estate_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="real_estate_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(
                          e,
                          setFieldValue,
                          "image",
                          setRealEstateImg
                        );
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_real_estate_images")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChoosenRealEstateImages(event, setFieldValue);
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

export default AddEditRealEstatePage;
