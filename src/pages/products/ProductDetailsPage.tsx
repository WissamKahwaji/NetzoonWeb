import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../apis/product/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import ProductDetailsMobile from "../../components/pages/product/ProductDetailsMobile";
import ProductDetailsWeb from "../../components/pages/product/ProductDetailsWeb";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    data: productInfo,
    isError,
    isLoading,
  } = useGetProductByIdQuery(productId ?? "");

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <div className="flex md:hidden">
        <ProductDetailsMobile productInfo={productInfo} />
      </div>
      <div className="md:flex hidden">
        <ProductDetailsWeb productInfo={productInfo} />
      </div>
    </>
  );
};

export default ProductDetailsPage;
