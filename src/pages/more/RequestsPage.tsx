import { useTranslation } from "react-i18next";
import { useAddRequestMutation } from "../../apis/request/queries";
import { RequestInputModel } from "../../apis/request/type";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

const RequestsPage = () => {
  const { t } = useTranslation();
  const { mutate: addRequest } = useAddRequestMutation();
  const initialValues: RequestInputModel = {
    text: "",
    address: "",
  };
  const validationSchema = Yup.object().shape({
    text: Yup.string().required("Please enter text"),
    address: Yup.string().required("Please enter title"),
  });

  const handleSubmit = (
    values: RequestInputModel,
    { setSubmitting }: FormikHelpers<RequestInputModel>
  ) => {
    addRequest(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {t("private_request")}
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
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-6">
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="address"
                >
                  {t("title")}
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
                  htmlFor="text"
                >
                  {t("special_request")}
                </label>
                <textarea
                  id="text"
                  name="text"
                  className="min-h-[100px] px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.text ?? ""}
                  style={{ direction: "ltr" }}
                />
                {errors.text && touched.text && (
                  <div className="text-red-500 text-xs mt-1">{errors.text}</div>
                )}
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

export default RequestsPage;
