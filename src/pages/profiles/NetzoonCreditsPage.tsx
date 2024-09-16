import { useTranslation } from "react-i18next";
import {
  useGetUserByIdQuery,
  useSendRefundeRequestEmailMutation,
} from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { getCurrencyFromCountry } from "../../utils";
import { useCountry } from "../../context/CountryContext";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RequestBalanceInputModel, TemplateParams } from "../../apis/user/type";

const NetzoonCreditsPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const userId = localStorage.getItem("userId");
  const {
    data: userInfo,
    isLoading: isLoading,
    isError: isError,
  } = useGetUserByIdQuery(userId ?? "");
  const { mutate: sendRequest } = useSendRefundeRequestEmailMutation();
  const initialValues: TemplateParams = {
    account_name: "",
    bank_name: "",
    iban: "",
    user_balance: 0,
    user_email: "",
    user_mobile: "",
    user_name: "",
  };
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Please enter your name"),
    user_email: Yup.string().required("Please enter your email"),
    account_name: Yup.string().required("Please enter your account name"),
    bank_name: Yup.string().required("Please enter your bank name"),
    iban: Yup.string().required("Please enter your iban"),
    user_balance: Yup.number().required("Please enter your balance"),
    user_mobile: Yup.string()
      .required("Please enter your mobile number")
      .min(9, "Mobile number must be at least 9 characters long"),
  });
  const handleSubmit = (
    values: TemplateParams,
    { setSubmitting }: FormikHelpers<TemplateParams>
  ) => {
    const finalVal: RequestBalanceInputModel = {
      service_id: "service_gho7z1b",
      template_id: "template_okqyy5n",
      user_id: "2rPXOy2bcBaUIoJ",
      template_params: values,
    };
    sendRequest(finalVal, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4">
        {t("netzoon_credits")}
      </p>
      <div className="flex flex-col justify-center items-start space-y-2 px-2 py-3 bg-primary/30 md:w-1/2 w-full rounded-md">
        <p className="  font-bold text-gray-600 capitalize">
          {t("available_balance")}
        </p>
        <p className="text-black font-semibold">
          {userInfo?.netzoonBalance?.toFixed(2)}
          {t(getCurrencyFromCountry(country))}
        </p>
      </div>
      <hr className="w-full text-gray-600 my-4" />
      <div className="w-full flex flex-col justify-start items-center space-y-3">
        <p className="text-primary font-header font-semibold">
          {t("please_fill_in_the_following_form_to_refund_your_balance")}
        </p>
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
            <form onSubmit={handleSubmit} className="space-y-4 w-full px-2">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="user_name"
                  >
                    {t("full_name")}
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
                    {t("email")}
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
                    htmlFor="user_balance"
                  >
                    {t("balance")}
                  </label>
                  <input
                    id="user_balance"
                    name="user_balance"
                    type="number"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_balance}
                    style={{ direction: "ltr" }}
                  />
                  {errors.user_balance && touched.user_balance && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.user_balance}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="account_name"
                  >
                    {t("account_name")}
                  </label>
                  <input
                    id="account_name"
                    name="account_name"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.account_name}
                    style={{ direction: "ltr" }}
                  />
                  {errors.account_name && touched.account_name && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.account_name}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="bank_name"
                  >
                    {t("bank_name")}
                  </label>
                  <input
                    id="bank_name"
                    name="bank_name"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bank_name}
                    style={{ direction: "ltr" }}
                  />
                  {errors.bank_name && touched.bank_name && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.bank_name}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="iban"
                  >
                    {t("iban")}
                  </label>
                  <input
                    id="iban"
                    name="iban"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.iban}
                    style={{ direction: "ltr" }}
                  />
                  {errors.iban && touched.iban && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.iban}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="user_mobile"
                  >
                    {t("user_mobile")}
                  </label>
                  <input
                    id="user_mobile"
                    name="user_mobile"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_mobile}
                    style={{ direction: "ltr" }}
                  />
                  {errors.user_mobile && touched.user_mobile && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.user_mobile}
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
                  {isSubmitting ? `${t("loading")}...` : t("send")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NetzoonCreditsPage;
