import { IoShareSocialSharp } from "react-icons/io5";
import { ProductModel } from "../../../apis/product/type";
import { MdFavoriteBorder } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from "../../../app/hooks";
import { toast } from "react-toastify";
import { addToCart } from "../../../features/cart/slice";

interface ProductDetailsWeb {
  productInfo?: ProductModel | undefined;
}
const ProductDetailsWeb = ({ productInfo }: ProductDetailsWeb) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const handleAddToCart = (product: ProductModel) => {
    if (userId === product.owner._id) {
      toast.error("you can't buy your product");
    } else {
      dispatch(addToCart({ ...product, count: 1 }));
    }
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      productInfo?.images && productInfo?.images.length < 2.1
        ? productInfo?.images.length
        : 2.1,

    slidesToScroll: 2,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            productInfo?.images && productInfo?.images.length < 2.1
              ? productInfo?.images.length
              : 2.1,

          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            productInfo?.images && productInfo?.images.length < 1.2
              ? productInfo?.images.length
              : 1.2,

          slidesToScroll: 1.2,
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
    <div className="flex flex-col w-full px-2 py-4  font-header space-y-8 md:justify-center md:items-center">
      <div className="grid grid-cols-2 gap-x-3 w-3/4">
        <img
          crossOrigin="anonymous"
          src={productInfo?.imageUrl}
          alt="product Image"
          className="w-full h-[340px] shadow-md object-contain"
        />
        <div className="flex flex-col justify-start items-start space-y-5">
          <p className="text-2xl font-body">{productInfo?.name}</p>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-lg text-primary font-semibold">
              <span className="text-red-950 ">{t("price")} : </span>{" "}
              {productInfo?.price.toFixed(2)}AED
            </p>
            <div className="flex flex-row justify-start items-center gap-x-4">
              <IoShareSocialSharp className="w-5 h-5 text-primary" />
              <MdFavoriteBorder className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-x-2">
            <p>{productInfo?.averageRating}</p>
            <p>{`(${productInfo?.totalRatings} Review)`}</p>
          </div>
          <p>{productInfo?.description}</p>

          {productInfo && (
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
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 w-3/4">
        <div className="flex flex-col mt-2 w-full space-y-3 capitalize bg-primary/10 shadow-sm p-4 rounded-lg">
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
          {productInfo?.vedioUrl && (
            <div className="flex flex-col space-y-3 w-full">
              <p className="font-semibold">{t("product_video")}</p>
              <video
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsWeb;
