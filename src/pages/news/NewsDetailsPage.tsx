import {
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
} from "../../apis/news/queries";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import { useState } from "react";
import Modal from "react-modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

const NewsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { data: newsInfo, isError, isLoading } = useGetNewsByIdQuery(id ?? "");
  const { mutate: deleteNewsInfo } = useDeleteNewsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteNews = () => {
    deleteNewsInfo(newsInfo?._id ?? "");
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <div className=" grid grid-cols-1 md:grid-cols-1 gap-x-4 w-full px-2 py-4  font-header space-y-4 md:justify-center md:items-center md:mx-auto md:w-1/2">
      <div className="w-full h-[350px]">
        <img
          src={newsInfo?.imgUrl}
          alt=""
          crossOrigin="anonymous"
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-lg font-bold capitalize">{newsInfo?.title}</p>
        {userId === newsInfo?.creator?._id && (
          <div className="flex flex-row justify-end items-center gap-x-12">
            <MdEdit
              className="text-primary w-6 h-6 cursor-pointer"
              onClick={() => {
                navigate("edit");
              }}
            />

            <MdDelete
              className="text-red-500 w-6 h-6 cursor-pointer"
              onClick={openModal}
            />
          </div>
        )}
      </div>

      <p className="text-sm text-gray-700 text-justify">
        {newsInfo?.description}
      </p>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">{t("delete_news")}</h2>
          <p className="mb-4">{t("delete_news_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteNews();
                closeModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsDetailsPage;
