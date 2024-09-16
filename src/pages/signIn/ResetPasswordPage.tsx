import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { ResetPasswordParams } from "../../apis/user/type";
import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../apis/user/queries";
import { useState } from "react";
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const ResetPasswordPage = () => {
  const { token } = useParams<string>();

  const { t } = useTranslation();
  const { mutate: resetPassword } = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: ResetPasswordParams = {
    token: token ?? "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (
    values: ResetPasswordParams,
    { setSubmitting }: FormikHelpers<ResetPasswordParams>
  ) => {
    resetPassword(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("reset_password")}
        </h2>
        <Formik
          initialValues={initialValues}
          //   validationSchema={validationSchema}
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
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="relative" style={{ direction: "ltr" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
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

              <div className="relative" style={{ direction: "ltr" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="text-xs w-full font-header mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black transform ease-in-out duration-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? `${t("loading")}...` : t("submit")}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
