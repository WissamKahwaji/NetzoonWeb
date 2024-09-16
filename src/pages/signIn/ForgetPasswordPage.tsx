import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useForgetPasswordMutation } from "../../apis/user/queries";
import { ForgetPasswordParams } from "../../apis/user/type";
import { Formik, FormikHelpers } from "formik";

const ForgetPasswordPage = () => {
  const { t } = useTranslation();
  const { mutate: fotgetPassword } = useForgetPasswordMutation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email"),
  });

  const handleSubmit = (
    values: ForgetPasswordParams,
    { setSubmitting }: FormikHelpers<ForgetPasswordParams>
  ) => {
    fotgetPassword(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const initialValues: ForgetPasswordParams = {
    email: "",
  };

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {t("forget_password")}
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
              <div className="grid md:grid-cols-1 grid-cols-1 gap-4  w-full">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    {t("email")}
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="text-sm w-full rounded border bg-gray-100 border-gray-300 px-3 py-2 focus:outline-none focus:border-gray-400"
                    placeholder={t("your_email")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    style={{ direction: "ltr" }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {t(errors.email)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? `${t("loading")}...` : t("submit")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
