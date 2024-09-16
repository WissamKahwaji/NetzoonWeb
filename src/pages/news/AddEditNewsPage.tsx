/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useAddNewsMutation,
  useEditNewsMutation,
  useGetNewsByIdQuery,
} from "../../apis/news/queries";
import { useEffect, useState } from "react";
import { NewsInputModel } from "../../apis/news/type";
import { Formik, FormikHelpers } from "formik";

const AddEditNewsPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();

  const userId = localStorage.getItem("userId");

  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { data: newsInfo } = useGetNewsByIdQuery(id!);
  const { mutate: addNews } = useAddNewsMutation();
  const { mutate: editNews } = useEditNewsMutation();
  const [newsImg, setNewsImg] = useState("");
  const [initialValues, setInitialValues] = useState<NewsInputModel>({
    ...(id && { _id: id }),
    creator: userId ?? "",
    title: "",
    description: "",
    country: country,
  });

  useEffect(() => {
    if (id && newsInfo) {
      if (userId !== newsInfo.creator?._id) {
        navigate("/", { replace: true });
      }
    }
  }, [id, navigate, newsInfo, userId]);

  useEffect(() => {
    if (id && newsInfo) {
      setInitialValues({
        _id: id,
        creator: newsInfo.creator?._id ?? userId ?? "",
        title: newsInfo.title ?? "",
        description: newsInfo.description ?? "",
        country: newsInfo?.country ?? country,
      });
    } else {
      setInitialValues({
        creator: userId ?? "",
        title: "",
        description: "",
        country: country,
      });
    }
  }, [country, id, newsInfo, userId]);

  useEffect(() => {
    if (newsInfo) {
      setNewsImg(newsInfo.imgUrl ?? "");
    }
  }, [newsInfo]);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter news Title"),
    description: Yup.string().required("Please enter news description"),
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
    values: NewsInputModel,
    { setSubmitting }: FormikHelpers<NewsInputModel>
  ) => {
    id
      ? editNews(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addNews(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {id ? `${t("edit_news")}` : `${t("add_news")}`}
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
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-6">
              <div className="grid md:grid-cols-1 grid-cols-1 gap-4  w-full">
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="title"
                  >
                    {t("news_title")}
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t("add_news_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={newsImg}
                      alt="news_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("news_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="news_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(
                          e,
                          setFieldValue,
                          "image",
                          setNewsImg
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
                  className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default AddEditNewsPage;
