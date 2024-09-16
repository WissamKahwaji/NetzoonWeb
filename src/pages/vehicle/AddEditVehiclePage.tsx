/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddVehicleMutation,
  useEditVehicleMutation,
  useGetVehicleByIdQuery,
} from "../../apis/vehicle/queries";
import * as Yup from "yup";
import { VehicleInputModel, VehicleType } from "../../apis/vehicle/type";
import { useEffect, useState } from "react";
import { useCountry } from "../../context/CountryContext";
import { CAR_TYPES, SHIP_TYPES } from "../../constants";
import { Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";

const AddEditVehiclePage = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const { country } = useCountry();
  const { id, category } = useParams<{
    id: string;
    category: string;
  }>();
  const navigate = useNavigate();
  const { data: vehicleInfo } = useGetVehicleByIdQuery(id ?? "");
  const { mutate: addVehicle } = useAddVehicleMutation();
  const { mutate: editVehicle } = useEditVehicleMutation();
  const [vehicleType, setVehicleType] = useState<string>("");
  const [selectedCarName, setSelectedCarName] = useState<string>("");
  const [selectedCarCategory, setSelectedCarCategory] = useState<string>();
  const [carCategories, setCarCategories] = useState<string[]>();
  const [regionalSpecs, setRegionalSpecs] = useState("");
  const [conditionType, setConditionType] = useState("");
  const [vehicleImg, setVehicleImg] = useState("");
  const [initialValues, setInitialValues] = useState<VehicleInputModel>({
    ...(id && { _id: id }),
    ...(userId && { creator: userId }),
    name: "",
    description: "",
    price: 0,
    kilometers: 0,
    year: vehicleInfo?.year,
    location: "",
    type: "",
    category: VehicleType.CARS,
    contactNumber: "",
    exteriorColor: "",
    interiorColor: "",
    ...(vehicleInfo?.doors && {
      doors: 0,
    }),
    bodyCondition: "",
    bodyType: "",
    mechanicalCondition: "",
    seatingCapacity: 0,
    ...(vehicleInfo?.numofCylinders && {
      numofCylinders: 0,
    }),
    transmissionType: "",
    horsepower: "",
    fuelType: "",
    extras: "",
    technicalFeatures: "",
    steeringSide: "",
    guarantee: false,
    forWhat: "",
    regionalSpecs: "",
    aircraftType: "",
    manufacturer: "",
    vehicleModel: "",
    maxSpeed: "",
    maxDistance: "",
    shipType: "",
    shipLength: "",
    country: country ?? "AE",
  });

  useEffect(() => {
    if (id && vehicleInfo) {
      if (userId !== vehicleInfo.creator?._id) {
        navigate("/", { replace: true });
      }
    }
    if (category) {
      setVehicleType(category);
    } else {
      setVehicleType(vehicleInfo?.category ?? VehicleType.CARS);
    }
  }, [category, id, navigate, userId, vehicleInfo]);

  useEffect(() => {
    if (id && vehicleInfo) {
      setInitialValues({
        _id: id,
        ...(userId && { creator: userId }),
        name: vehicleInfo?.name ?? "",
        description: vehicleInfo?.description ?? "",
        price: vehicleInfo?.price ?? 0,
        kilometers: vehicleInfo?.kilometers ?? 0,
        year: vehicleInfo?.year,
        location: vehicleInfo?.location ?? "",
        type: vehicleInfo?.type ?? "",
        category: vehicleInfo?.category ?? VehicleType.CARS,
        contactNumber: vehicleInfo?.contactNumber ?? "",
        exteriorColor: vehicleInfo?.exteriorColor,
        interiorColor: vehicleInfo?.interiorColor,
        ...(vehicleInfo?.doors && {
          doors: vehicleInfo?.doors,
        }),
        bodyCondition: vehicleInfo?.bodyCondition,
        bodyType: vehicleInfo?.bodyType,
        mechanicalCondition: vehicleInfo?.mechanicalCondition,
        seatingCapacity: vehicleInfo?.seatingCapacity,
        ...(vehicleInfo?.numofCylinders && {
          numofCylinders: vehicleInfo?.numofCylinders,
        }),
        transmissionType: vehicleInfo?.transmissionType,
        horsepower: vehicleInfo?.horsepower,
        fuelType: vehicleInfo?.fuelType,
        extras: vehicleInfo?.extras,
        technicalFeatures: vehicleInfo?.technicalFeatures,
        steeringSide: vehicleInfo?.steeringSide,
        guarantee: vehicleInfo?.guarantee ?? false,
        forWhat: vehicleInfo?.forWhat ?? "",
        regionalSpecs: vehicleInfo?.regionalSpecs ?? "",
        aircraftType: vehicleInfo?.aircraftType,
        manufacturer: vehicleInfo?.manufacturer,
        vehicleModel: vehicleInfo?.vehicleModel,
        maxSpeed: vehicleInfo?.maxSpeed,
        maxDistance: vehicleInfo?.maxDistance,
        shipType: vehicleInfo?.shipType ?? "",
        shipLength: vehicleInfo?.shipLength ?? "",
        country: country ?? "AE",
      });
    } else {
      setInitialValues({
        ...(id && { _id: id }),
        ...(userId && { creator: userId }),
        name: "",
        description: "",
        price: 0,
        kilometers: 0,
        year: vehicleInfo?.year,
        location: "",
        type: "",
        category: VehicleType.CARS,
        contactNumber: "",
        exteriorColor: "",
        interiorColor: "",
        ...(vehicleInfo?.doors && {
          doors: 0,
        }),
        bodyCondition: "",
        bodyType: "",
        mechanicalCondition: "",
        seatingCapacity: 0,
        ...(vehicleInfo?.numofCylinders && {
          numofCylinders: 0,
        }),
        transmissionType: "",
        horsepower: "",
        fuelType: "",
        extras: "",
        technicalFeatures: "",
        steeringSide: "",
        guarantee: false,
        forWhat: "",
        regionalSpecs: "",
        aircraftType: "",
        manufacturer: "",
        vehicleModel: "",
        maxSpeed: "",
        maxDistance: "",
        shipType: "",
        shipLength: "",
        country: country ?? "AE",
      });
    }
  }, [country, id, userId, vehicleInfo]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),

    description: Yup.string().required("Please enter description"),
    price: Yup.number().required("Please enter price"),
    location: Yup.string().required("Please enter location"),
  });

  useEffect(() => {
    const carCat =
      CAR_TYPES.find(car => car.name === selectedCarName)?.categories || [];
    setCarCategories(carCat);
  }, [selectedCarName]);

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

  const handleChoosenVehicleImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files) {
      if (event.target.files.length > 6) {
        toast.info("you_can't select more than 6 files");
      } else {
        const filesArray = Array.from(event.target.files).slice(0, 6);

        setFieldValue("carimages", filesArray);
      }
    }
  };

  const handleSubmit = (
    values: VehicleInputModel,
    { setSubmitting }: FormikHelpers<VehicleInputModel>
  ) => {
    id
      ? editVehicle(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addVehicle(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };

  return (
    <div className="flex flex-col justify-start items-center px-4 py-6 font-header w-full md:w-[60%] md:mx-auto md:py-10">
      <p className="text-lg font-bold font-serif text-primary mb-4 capitalize">
        {id
          ? vehicleType === VehicleType.CARS
            ? `${t("edit_car")}`
            : vehicleType === VehicleType.PLANES
            ? `${t("edit_planes")}`
            : `${t("edit_ship")}`
          : vehicleType === VehicleType.CARS
          ? `${t("add_car")}`
          : vehicleType === VehicleType.PLANES
          ? `${t("add_planes")}`
          : `${t("add_ship")}`}
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
                {vehicleType === VehicleType.CARS && (
                  <div>
                    <label
                      className="text-sm font-medium text-gray-700 text-start"
                      htmlFor="carName"
                    >
                      {t("department")}
                    </label>
                    <div className="relative">
                      <select
                        id="carName"
                        name="carName"
                        className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={event => {
                          const carName = event.target.value as string;
                          setSelectedCarName(carName);
                          setSelectedCarCategory(""); // Reset category when car name changes

                          setFieldValue(
                            "name",
                            `${carName} ${selectedCarCategory}`
                          );
                        }}
                        value={selectedCarName}
                      >
                        {CAR_TYPES.map((item, index) => (
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
                )}
                {vehicleType === VehicleType.CARS && (
                  <div>
                    <label
                      className="text-sm font-medium text-gray-700 text-start"
                      htmlFor="car_category"
                    >
                      {t("car_category")}
                    </label>
                    <div className="relative">
                      <select
                        id="car_category"
                        name="car_category"
                        className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={event => {
                          const carCategory = event.target.value as string;
                          setSelectedCarCategory(carCategory);
                          setFieldValue(
                            "name",
                            `${selectedCarName} ${carCategory}`
                          );
                        }}
                        value={selectedCarCategory}
                      >
                        {carCategories &&
                          carCategories.map((item, index) => (
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
                )}
                {vehicleType !== VehicleType.CARS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="name"
                    >
                      {t("name")}
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
                )}
                {vehicleType === VehicleType.SHIPS && (
                  <div>
                    <label
                      className="text-sm font-medium text-gray-700 text-start"
                      htmlFor="shipType"
                    >
                      {t("ship_type")}
                    </label>
                    <div className="relative">
                      <select
                        id="shipType"
                        name="shipType"
                        className="block h-[40px] appearance-none w-full px-2 py-2 pr-8 text-xs font-header mb-2 rounded-lg border bg-gray-100 border-primary focus:outline-none focus:border-gray-400"
                        onBlur={handleBlur}
                        onChange={event => {
                          const shipType = event.target.value as string;

                          setFieldValue("shipType", shipType);
                        }}
                        value={values.shipType}
                      >
                        {SHIP_TYPES.map((item, index) => (
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
                )}
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
                    htmlFor="contactNumber"
                  >
                    {t("contact_number")}
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactNumber}
                    style={{ direction: "ltr" }}
                  />
                  {errors.contactNumber && touched.contactNumber && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.contactNumber}
                    </div>
                  )}
                </div>
                {vehicleType === VehicleType.CARS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="kilometers"
                    >
                      {t("kilometers")}
                    </label>
                    <input
                      id="kilometers"
                      name="kilometers"
                      type="number"
                      min={0}
                      className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.kilometers}
                      style={{ direction: "ltr" }}
                    />
                    {errors.kilometers && touched.kilometers && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.kilometers}
                      </div>
                    )}
                  </div>
                )}
                {vehicleType === VehicleType.SHIPS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="shipLength"
                    >
                      {t("ship_length")}
                    </label>
                    <input
                      id="shipLength"
                      name="shipLength"
                      type="text"
                      className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.shipLength}
                      style={{ direction: "ltr" }}
                    />
                    {errors.shipLength && touched.shipLength && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.shipLength}
                      </div>
                    )}
                  </div>
                )}
                {vehicleType !== VehicleType.CARS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="vehicleModel"
                    >
                      {t("vehicle_model")}
                    </label>
                    <input
                      id="vehicleModel"
                      name="vehicleModel"
                      type="text"
                      className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.vehicleModel}
                      style={{ direction: "ltr" }}
                    />
                    {errors.vehicleModel && touched.vehicleModel && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.vehicleModel}
                      </div>
                    )}
                  </div>
                )}
                {vehicleType !== VehicleType.CARS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="manufacturer"
                    >
                      {t("manufacturer")}
                    </label>
                    <input
                      id="manufacturer"
                      name="manufacturer"
                      type="text"
                      className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.manufacturer}
                      style={{ direction: "ltr" }}
                    />
                    {errors.manufacturer && touched.manufacturer && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.manufacturer}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="year"
                  >
                    {t("year")}
                  </label>
                  <input
                    id="year"
                    name="year"
                    type="date"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.year?.toString()}
                    style={{ direction: "ltr" }}
                  />
                  {errors.year && touched.year && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.year}
                    </div>
                  )}
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
                    htmlFor="maxSpeed"
                  >
                    {t("max_speed")}
                  </label>
                  <input
                    id="maxSpeed"
                    name="maxSpeed"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maxSpeed}
                    style={{ direction: "ltr" }}
                  />
                  {errors.maxSpeed && touched.maxSpeed && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.maxSpeed}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="exteriorColor"
                  >
                    {t("exterior_color")}
                  </label>
                  <input
                    id="exteriorColor"
                    name="exteriorColor"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.exteriorColor}
                    style={{ direction: "ltr" }}
                  />
                  {errors.exteriorColor && touched.exteriorColor && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.exteriorColor}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="interiorColor"
                  >
                    {t("interior_color")}
                  </label>
                  <input
                    id="interiorColor"
                    name="interiorColor"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.interiorColor}
                    style={{ direction: "ltr" }}
                  />
                  {errors.interiorColor && touched.interiorColor && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.interiorColor}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="doors"
                  >
                    {t("doors")}
                  </label>
                  <input
                    id="doors"
                    name="doors"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.doors}
                    style={{ direction: "ltr" }}
                  />
                  {errors.doors && touched.doors && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.doors}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="bodyCondition"
                  >
                    {t("body_condition")}
                  </label>
                  <input
                    id="bodyCondition"
                    name="bodyCondition"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bodyCondition}
                    style={{ direction: "ltr" }}
                  />
                  {errors.bodyCondition && touched.bodyCondition && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.bodyCondition}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="bodyType"
                  >
                    {t("body_type")}
                  </label>
                  <input
                    id="bodyType"
                    name="bodyType"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bodyType}
                    style={{ direction: "ltr" }}
                  />
                  {errors.bodyType && touched.bodyType && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.bodyType}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="mechanicalCondition"
                  >
                    {t("mechanical_condition")}
                  </label>
                  <input
                    id="mechanicalCondition"
                    name="mechanicalCondition"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mechanicalCondition}
                    style={{ direction: "ltr" }}
                  />
                  {errors.mechanicalCondition &&
                    touched.mechanicalCondition && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.mechanicalCondition}
                      </div>
                    )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="seatingCapacity"
                  >
                    {t("seating_capacity")}
                  </label>
                  <input
                    id="seatingCapacity"
                    name="seatingCapacity"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.seatingCapacity}
                    style={{ direction: "ltr" }}
                  />
                  {errors.seatingCapacity && touched.seatingCapacity && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.seatingCapacity}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="numofCylinders"
                  >
                    {t("numofCylinders")}
                  </label>
                  <input
                    id="numofCylinders"
                    name="numofCylinders"
                    type="number"
                    min={0}
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numofCylinders}
                    style={{ direction: "ltr" }}
                  />
                  {errors.numofCylinders && touched.numofCylinders && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.numofCylinders}
                    </div>
                  )}
                </div>
                {vehicleType === VehicleType.CARS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="transmissionType"
                    >
                      {t("transmission_type")}
                    </label>
                    <input
                      id="transmissionType"
                      name="transmissionType"
                      type="text"
                      className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.transmissionType}
                      style={{ direction: "ltr" }}
                    />
                    {errors.transmissionType && touched.transmissionType && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.transmissionType}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="horsepower"
                  >
                    {t("horse_power")}
                  </label>
                  <input
                    id="horsepower"
                    name="horsepower"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.horsepower}
                    style={{ direction: "ltr" }}
                  />
                  {errors.horsepower && touched.horsepower && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.horsepower}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="fuelType"
                  >
                    {t("fuel_type")}
                  </label>
                  <input
                    id="fuelType"
                    name="fuelType"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fuelType}
                    style={{ direction: "ltr" }}
                  />
                  {errors.fuelType && touched.fuelType && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.fuelType}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="extras"
                  >
                    {t("extras")}
                  </label>
                  <input
                    id="extras"
                    name="extras"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.extras}
                    style={{ direction: "ltr" }}
                  />
                  {errors.extras && touched.extras && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.extras}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-sm font-medium text-gray-700"
                    htmlFor="technicalFeatures"
                  >
                    {t("technicalFeatures")}
                  </label>
                  <input
                    id="technicalFeatures"
                    name="technicalFeatures"
                    type="text"
                    className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.technicalFeatures}
                    style={{ direction: "ltr" }}
                  />
                  {errors.technicalFeatures && touched.technicalFeatures && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.technicalFeatures}
                    </div>
                  )}
                </div>
                {vehicleType === VehicleType.CARS && (
                  <div className="flex flex-col">
                    <label
                      className=" text-sm font-medium text-gray-700"
                      htmlFor="steeringSide"
                    >
                      {t("steering_side")}
                    </label>
                    <input
                      id="steeringSide"
                      name="steeringSide"
                      type="text"
                      className="px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extras}
                      style={{ direction: "ltr" }}
                    />
                    {errors.steeringSide && touched.steeringSide && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.steeringSide}
                      </div>
                    )}
                  </div>
                )}
                {vehicleType === VehicleType.CARS && (
                  <div className="flex flex-row justify-start items-center gap-x-7">
                    <p>{t("regional_specs")} : </p>
                    <label className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="regionalSpecs"
                        value="gcc"
                        checked={regionalSpecs === "gcc"}
                        onChange={() => {
                          setRegionalSpecs("gcc");
                          setFieldValue("regionalSpecs", "gcc");
                        }}
                        // className="form-radio h-4 w-4 text-blue-600 "
                        className="hidden"
                      />
                      <span
                        className={`inline-block w-4 h-4 border-2 rounded-md cursor-pointer relative ${
                          regionalSpecs === "gcc"
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-400"
                        }`}
                      ></span>
                      <span className="text-gray-700 font-medium">
                        {t("gcc")}
                      </span>
                    </label>
                    <label className="flex items-center gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="regionalSpecs"
                        value="used"
                        checked={regionalSpecs === "Incoming"}
                        onChange={() => {
                          setRegionalSpecs("Incoming");
                          setFieldValue("regionalSpecs", "Incoming");
                        }}
                        // className="form-radio h-4 w-4 text-blue-600 "
                        className="hidden"
                      />
                      <span
                        className={`inline-block w-4 h-4 border-2 rounded-md cursor-pointer relative ${
                          regionalSpecs === "Incoming"
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-400"
                        }`}
                      ></span>
                      <span className="text-gray-700 font-medium">
                        {t("Incoming")}
                      </span>
                    </label>
                  </div>
                )}
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
                    {t("vehicle_image")}
                  </label>
                  <div className="flex flex-row w-full items-center gap-x-2">
                    <img
                      crossOrigin="anonymous"
                      src={vehicleImg}
                      alt="vehicle_image"
                      className="rounded-sm border border-primary shadow-sm shadow-secondary w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputElement =
                          document.getElementById("vehicle_image");
                        if (inputElement) {
                          (inputElement as HTMLInputElement).click();
                        }
                      }}
                      className="text-xs px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/70 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("change_picture")}
                    </button>
                    <input
                      id="vehicle_image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleImageChange(
                          e,
                          setFieldValue,
                          "image",
                          setVehicleImg
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
                      handleChoosenVehicleImages(event, setFieldValue);
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

export default AddEditVehiclePage;
