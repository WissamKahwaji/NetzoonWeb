import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { DeliverServiceInputModel } from "../../apis/delivery_service/type";
import { useAddDeliveryServiceMutation } from "../../apis/delivery_service/queries";
import * as Yup from "yup";

const AddEditDeliveryServicePage = () => {
  const { t } = useTranslation();
  //   const { country } = useCountry();
  const { mutate: addDeliveryService } = useAddDeliveryServiceMutation();

  const userId = localStorage.getItem("userId");
  const initialValues: DeliverServiceInputModel = {
    owner: userId ?? "",
    title: "",
    description: "",
    from: "",
    to: "",
    price: 0,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter service Title"),
    description: Yup.string().required("Please enter service description"),
    from: Yup.string().required("Please enter service location from "),
    to: Yup.string().required("Please enter service location to"),
    price: Yup.number().required("Please enter service price"),
  });
  const handleSubmit = (
    values: DeliverServiceInputModel,
    { setSubmitting }: FormikHelpers<DeliverServiceInputModel>
  ) => {
    addDeliveryService(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {t("add_delivey_service")}
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
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4  w-full">
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="title"
                  >
                    {t("service_name")}
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
                    className="text-sm font-medium text-gray-700"
                    htmlFor="description"
                  >
                    {t("description")}
                  </label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
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
                    htmlFor="from"
                  >
                    {t("from")}
                  </label>
                  <input
                    id="from"
                    name="from"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.from}
                    style={{ direction: "ltr" }}
                  />
                  {errors.from && touched.from && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.from}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="to"
                  >
                    {t("to")}
                  </label>
                  <input
                    id="to"
                    name="to"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.to}
                    style={{ direction: "ltr" }}
                  />
                  {errors.to && touched.to && (
                    <div className="text-red-500 text-xs mt-1">{errors.to}</div>
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

export default AddEditDeliveryServicePage;
