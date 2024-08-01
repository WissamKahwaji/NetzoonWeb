import { ProductModel } from "../../../apis/product/type";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from "../../../app/hooks";
import { toast } from "react-toastify";
import { addToCart } from "../../../features/cart/slice";

interface ProductDetailsMobileProps {
  productInfo?: ProductModel | undefined;
}
const ProductDetailsMobile = ({ productInfo }: ProductDetailsMobileProps) => {
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
        {productInfo && (
          <button
            className="px-2 py-2 text-white rounded-xl bg-primary w-1/2"
            onClick={e => {
              e.stopPropagation();
              handleAddToCart(productInfo);
            }}
          >
            {t("add_to_cart")}
          </button>
        )}
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
          <IoShareSocialSharp className="w-5 h-5 text-primary" />
          <MdFavoriteBorder className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-lg font-body">{productInfo?.name}</p>
      <div className="flex flex-row justify-start items-center gap-x-2">
        <p>{productInfo?.averageRating}</p>
        <p>{`(${productInfo?.totalRatings} Review)`}</p>
      </div>
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
  );
};

export default ProductDetailsMobile;
