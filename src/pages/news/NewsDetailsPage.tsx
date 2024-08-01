import { useGetNewsByIdQuery } from "../../apis/news/queries";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";

const NewsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: newsInfo, isError, isLoading } = useGetNewsByIdQuery(id ?? "");

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
      <p className="text-lg font-bold capitalize">{newsInfo?.title}</p>
      <p className="text-sm text-gray-700 text-justify">
        {newsInfo?.description}
      </p>
    </div>
  );
};

export default NewsDetailsPage;
