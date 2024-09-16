import { ProductModel } from "../../../apis/product/type";
import { MdDelete, MdEdit, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from "../../../app/hooks";
import { toast } from "react-toastify";
import { addToCart } from "../../../features/cart/slice";
import { useEffect, useState } from "react";
import {
  useAddProductToFavoritesMutation,
  useGetUserFavoritesListQuery,
  useRemoveProductFromFavoritesMutation,
} from "../../../apis/user/queries";
import { useDeleteProductMutation } from "../../../apis/product/queries";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ShareButton from "../../const/share-btn/ShareButton";
import { useAuth } from "../../../context/AuthContext";
import { Rate } from "antd";
import { roundToHalf } from "../../../utils";
import RatingProductDialog from "../../const/rating-product-dialog/RatingProductDialog";

interface ProductDetailsMobileProps {
  productInfo?: ProductModel | undefined;
}
const ProductDetailsMobile = ({ productInfo }: ProductDetailsMobileProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const { data: favoritesListInfo } = useGetUserFavoritesListQuery(
    userId ?? ""
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const { mutate: addItem } = useAddProductToFavoritesMutation();
  const { mutate: removeItem } = useRemoveProductFromFavoritesMutation();
  const { mutate: deleteProductInfo } = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { isAuthenticated } = useAuth();
  const [isRatingDialogVisible, setRatingDialogVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (favoritesListInfo) {
      const productIds = favoritesListInfo.map(item => item.productId);
      if (productIds.includes(productInfo?._id ?? "")) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [favoritesListInfo, productInfo?._id]);

  const handleDeleteProduct = () => {
    deleteProductInfo(productInfo?._id ?? "");
  };

  const handleAddToCart = (product: ProductModel) => {
    if (userId) {
      if (userId === product.owner._id) {
        toast.error("you can't buy your product");
      } else {
        dispatch(addToCart({ ...product, count: 1 }));
      }
    } else {
      toast.error("please login first");
    }
  };
  const showRatingDialog = () => {
    if (!isAuthenticated) {
      toast.error("you must be authenticated, login first");
    } else {
      setRatingDialogVisible(true);
    }
  };
  const hideRatingDialog = () => {
    setRatingDialogVisible(false);
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      productInfo?.images && productInfo?.images.length < 2.5
        ? productInfo?.images.length
        : 2.5,

    slidesToScroll: 2.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            productInfo?.images && productInfo?.images.length < 2.5
              ? productInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            productInfo?.images && productInfo?.images.length < 2.5
              ? productInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            productInfo?.images && productInfo?.images.length < 2.5
              ? productInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            productInfo?.images && productInfo?.images.length < 2.5
              ? productInfo?.images.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
    ],
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 w-full px-2 pt-4 pb-36  font-header space-y-4 md:justify-center md:items-center">
      <div className="fixed  bottom-16  z-[1001]  w-full flex justify-center items-center py-3 bg-slate-100">
        {/* {productInfo && (
          <button
            className="px-2 py-2 text-white rounded-xl bg-primary w-1/2"
            onClick={e => {
              e.stopPropagation();
              handleAddToCart(productInfo);
            }}
          >
            {t("add_to_cart")}
          </button>
        )} */}
        {productInfo &&
          (productInfo.owner._id !== userId ? (
            <div className="w-1/2 justify-center items-center mx-auto cursor-pointer hover:scale-105 transform ease-in-out duration-300">
              <button
                className="w-full mx-auto bg-primary text-white py-2 rounded-full shadow-sm  "
                onClick={e => {
                  e.stopPropagation();
                  handleAddToCart(productInfo);
                }}
              >
                {t("add_to_cart")}
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-around items-center gap-x-7 w-full">
              <Link to={`edit`}>
                <MdEdit className="text-primary w-6 h-6 cursor-pointer" />
              </Link>
              <MdDelete
                className="text-red-500 w-6 h-6 cursor-pointer"
                onClick={openModal}
              />
            </div>
          ))}
      </div>
      <div className="w-full h-[350px]">
        <img
          src={productInfo?.imageUrl}
          alt=""
          crossOrigin="anonymous"
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-lg text-primary font-semibold">
          <span className="text-red-950 ">{t("price")} : </span>{" "}
          {productInfo?.price.toFixed(2)}AED
        </p>
        <div className="flex flex-row justify-start items-center gap-x-4">
          <ShareButton />
          {isFavorite === false ? (
            <MdFavoriteBorder
              className="w-5 h-5 text-primary cursor-pointer"
              onClick={() => {
                addItem({
                  userId: userId ?? "",
                  productId: productInfo?._id ?? "",
                });
              }}
            />
          ) : (
            <MdFavorite
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => {
                removeItem({
                  userId: userId ?? "",
                  productId: productInfo?._id ?? "",
                });
              }}
            />
          )}
        </div>
      </div>
      <p className="text-lg font-body">{productInfo?.name}</p>
      <div
        className="flex flex-row justify-start items-center gap-x-2 cursor-pointer"
        onClick={showRatingDialog}
      >
        {/* <p>{productInfo?.averageRating}</p> */}
        <Rate
          allowHalf
          value={roundToHalf(productInfo?.averageRating ?? 0)}
          disabled
          className="custom-rate"
          // style={{ fontSize: 36 }}
        />
        <p>{`(${productInfo?.totalRatings} Review)`}</p>
      </div>
      <RatingProductDialog
        id={productInfo?._id ?? ""}
        userId={userId ?? ""}
        visible={isRatingDialogVisible}
        onClose={hideRatingDialog}
        // onRatingSubmit={handleRatingSubmit}
      />
      <hr className=" bg-slate-400 h-0.5 w-full" />
      <div className="flex flex-col space-y-3 w-full capitalize">
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("category")}</p>
          <p>{productInfo?.category?.name}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("owner")}</p>
          <p>{productInfo?.owner.username}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("quantity")}</p>
          <p>{productInfo?.quantity}</p>
        </div>
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("weight_in_kg")}</p>
          <p>{productInfo?.weight}</p>
        </div>
        {productInfo?.color && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("color")}</p>
            <p>{productInfo?.color}</p>
          </div>
        )}
        {productInfo?.year && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("year")}</p>
            <p>{productInfo?.year.toISOString()}</p>
          </div>
        )}
        {productInfo?.condition && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("condition")}</p>
            <p>{productInfo?.condition}</p>
          </div>
        )}
        <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
          <p>{t("guarantee")}</p>
          <p>{productInfo?.guarantee ? "applies" : "not applies"}</p>
        </div>
        {productInfo?.address && (
          <div className="flex flex-row  justify-between items-center w-full   border-b  border-primary/30">
            <p>{t("address")}</p>
            <p>{productInfo?.address}</p>
          </div>
        )}
        {productInfo?.madeIn && (
          <div className="flex flex-row  justify-between items-center w-full  ">
            <p>{t("made_in")}</p>
            <p>{productInfo?.madeIn}</p>
          </div>
        )}
      </div>
      <hr className=" bg-slate-400 h-0.5 w-full" />
      <div className="flex flex-col space-y-3 w-full">
        <p className="font-semibold">{t("description")}</p>
        <p>{productInfo?.description}</p>
      </div>
      <hr className=" bg-slate-400 h-0.5 w-full" />
      <div className="flex flex-col space-y-3">
        <p className="font-semibold">{t("product_images")} : </p>
        {productInfo?.images && productInfo?.images.length > 0 ? (
          <Slider {...settings}>
            {productInfo?.images.map((item, index) => (
              <div key={index} className="px-2">
                <div className="relative w-full h-[140px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={item}
                    crossOrigin="anonymous"
                    alt={`card image`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>no images</p>
        )}
      </div>
      <hr className=" bg-slate-400 h-0.5 w-full" />
      {productInfo?.vedioUrl && (
        <div className="flex flex-col space-y-3 w-full">
          <p className="font-semibold">{t("product_video")}</p>
          <video
            crossOrigin="anonymous"
            playsInline
            muted
            controls
            autoPlay
            className="object-cover bg-transparent w-full max-h-[250px] "
          >
            <source src={productInfo?.vedioUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">{t("delete_product")}</h2>
          <p className="mb-4">{t("delete_product_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteProduct();
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

export default ProductDetailsMobile;
