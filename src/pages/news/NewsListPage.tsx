import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import {
  useAddCommentMutation,
  useGetNewsCommentsQuery,
  useGetNewsListQuery,
} from "../../apis/news/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import NewsCard from "../../components/pages/news/NewsCard";
import Modal from "react-modal";
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { AddCommentInputModel } from "../../apis/news/type";
import { IoIosSend, IoMdClose } from "react-icons/io";

const NewsListPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const userId = localStorage.getItem("userId");
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (newsId: string) => {
    setSelectedNews(newsId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };
  const {
    data: newsListInfo,
    isError,
    isLoading,
  } = useGetNewsListQuery(country);
  const {
    data: commentsInfo,
    isError: isErrorComments,
    isLoading: isLoadingComments,
  } = useGetNewsCommentsQuery(selectedNews ?? "", isModalOpen);
  const { mutate: addComment } = useAddCommentMutation();

  const initialValues: AddCommentInputModel = {
    newsId: selectedNews ?? "",
    text: "",
    userId: userId ?? "",
  };

  const handleSubmit = (
    values: AddCommentInputModel,
    { setSubmitting, resetForm }: FormikHelpers<AddCommentInputModel>
  ) => {
    addComment(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
    resetForm();
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center capitalize">
      {newsListInfo && newsListInfo.length > 0 ? (
        <div className="w-full grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-1 md:gap-4 md:w-1/3  ">
          {newsListInfo &&
            newsListInfo.map((item, index) => (
              <NewsCard
                key={index}
                news={item}
                onCommentClick={() => {
                  openModal(item._id!);
                }}
              />
            ))}
        </div>
      ) : (
        <p className="text-primary font-semibold w-full flex justify-center items-center">
          {t("no_data_to_show")}
        </p>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Comments"
        className="fixed inset-0  flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className=" bg-white md:min-w-[600px] p-6 rounded-lg shadow-lg max-w-sm w-full mt-16 md:mt-0 max-h-[400px] md:max-h-full ">
          <div className="flex  flex-row w-full justify-center items-center mb-5 gap-x-3">
            <p className=" text-center ">{t("comments")}</p>
            <IoMdClose
              className="w-5 h-5 cursor-pointer"
              onClick={closeModal}
            />
          </div>

          <div className="flex flex-col w-full space-y-5 max-h-[400px] md:max-h-full">
            {isLoadingComments && <LoadingComponent />}
            {isErrorComments && <div>Error !!</div>}
            {commentsInfo && commentsInfo.length > 0 ? (
              <div className="max-h-[250px] md:max-h-full overflow-y-auto md:overflow-auto">
                {commentsInfo.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-x-2 justify-start items-start border-b border-gray-200"
                  >
                    <img
                      src={comment.user.profilePhoto}
                      crossOrigin="anonymous"
                      alt=""
                      className="w-10 h-10 rounded-full border border-gray-500"
                    />
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">
                        {comment.user.username}
                      </p>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full">
                <p>{t("no_data_to_show")}</p>
              </div>
            )}
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
                <form
                  onSubmit={handleSubmit}
                  className="w-full justify-center items-center"
                >
                  <div className="flex flex-row gap-x-2 w-full justify-start items-center">
                    <div className="flex-1">
                      <input
                        id="text"
                        name="text"
                        type="text"
                        placeholder="your comment"
                        className="px-4 py-2 w-full border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-navBackground"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.text}
                        style={{ direction: "ltr" }}
                      />
                      {errors.text && touched.text && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.text}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="p-2 bg-primary rounded-md"
                    >
                      <IoIosSend className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsListPage;
