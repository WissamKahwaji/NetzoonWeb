import { useTranslation } from "react-i18next";
import { useSendEmailMutation } from "../../apis/send-email/queries";
import {
  SendEmailInputModel,
  TemplateParams,
} from "../../apis/send-email/type";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

const SendEmailPage = () => {
  const { t } = useTranslation();
  const { mutate: sendEmail } = useSendEmailMutation();
  const initialValues: TemplateParams = {
    user_email: "",
    user_message: "",
    user_name: "",
    user_subject: "",
  };
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Please enter your name"),
    user_email: Yup.string().required("Please enter your email"),
    user_subject: Yup.string().required("Please enter your subject"),
    user_message: Yup.string().required("Please enter your message"),
  });

  const handleSubmit = (
    values: TemplateParams,
    { setSubmitting }: FormikHelpers<TemplateParams>
  ) => {
    const finalVal: SendEmailInputModel = {
      service_id: "service_x67jyuw",
      template_id: "template_cmny7bu",
      user_id: "W46O5SuH3NyMtu_gW",
      template_params: values,
    };
    sendEmail(finalVal, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {t("send_email")}
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
                  htmlFor="user_name"
                >
                  {t("your_name")}
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_name}
                  style={{ direction: "ltr" }}
                />
                {errors.user_name && touched.user_name && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.user_name}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="user_email"
                >
                  {t("your_email")}
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_email}
                  style={{ direction: "ltr" }}
                />
                {errors.user_email && touched.user_email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.user_email}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="user_subject"
                >
                  {t("your_subject")}
                </label>
                <input
                  id="user_subject"
                  name="user_subject"
                  type="text"
                  className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_subject}
                  style={{ direction: "ltr" }}
                />
                {errors.user_subject && touched.user_subject && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.user_subject}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className=" text-sm font-medium text-gray-700"
                  htmlFor="user_message"
                >
                  {t("your_message")}
                </label>
                <textarea
                  id="user_message"
                  name="user_message"
                  className="min-h-[100px] px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_message ?? ""}
                  style={{ direction: "ltr" }}
                />
                {errors.user_message && touched.user_message && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.user_message}
                  </div>
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

export default SendEmailPage;
