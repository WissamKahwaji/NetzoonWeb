import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import {
  useAddAccountMutation,
  useGetUserByIdQuery,
} from "../../apis/user/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { AddAccountInputModel } from "../../apis/user/type";

const AddAccountPage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  const {
    data: userInfo,
    isError,
    isLoading,
  } = useGetUserByIdQuery(userId ?? "");
  const { mutate: addAccount } = useAddAccountMutation();

  const initialValues: AddAccountInputModel = {
    email: userInfo?.email ?? "",
    username: "",
    password: "",
  };

  const handleSubmit = (
    values: AddAccountInputModel,
    { setSubmitting }: FormikHelpers<AddAccountInputModel>
  ) => {
    addAccount(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className=" font-bold font-serif text-primary mb-4 capitalize">
        {t("please_enter_the_username_and_password_of_the_account_to_be_added")}
      </p>
      <div className="w-full flex flex-col justify-start items-center space-y-3 p-3 rounded shadow bg-white">
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
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
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="username"
                  >
                    {t("username")}
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    style={{ direction: "ltr" }}
                  />
                  {errors.username && touched.username && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    {t("password")}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    style={{ direction: "ltr" }}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.password}
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
                  {isSubmitting ? `${t("loading")}...` : t("add_account")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAccountPage;
