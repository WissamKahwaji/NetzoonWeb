import { ProductModel } from "../../../apis/product/type";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { addToCart } from "../../../features/cart/slice";
import { toast } from "react-toastify";
import ShareButton from "../../const/share-btn/ShareButton";
interface ProductCardProps {
  product: ProductModel;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const handleAddToCart = (product: ProductModel) => {
    // const t: string = `${product.owner}`;
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

  return (
    <div
      className="bg-white shadow-md rounded-md flex flex-col justify-start items-start hover:scale-105 transform ease-in-out duration-300 cursor-pointer"
      onClick={() => {
        console.log(product.category?.department);
        // navigate(`${product._id}`);
        navigate(
          `/departments/${product.category?.department}/${product.category?._id}/products/${product._id}`
        );
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-52 "
        crossOrigin="anonymous"
      />
      <div className="flex flex-col space-y-2 px-2 py-2">
        <p className="text-sm font-bold font-body text-black line-clamp-2 min-h-8">
          {product.name}
        </p>
        <p className="text-xs line-clamp-2 text-gray-400 min-h-8">
          {product.description}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center w-full px-2 py-2">
        <p className="text-sm text-primary font-semibold ">
          {product.price} <span>AED</span>
        </p>
        <div className="flex flex-row justify-start gap-x-2 items-center">
          <MdOutlineAddShoppingCart
            className="w-5 h-5 text-primary cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          />
          <ShareButton link={`${window.location.href}/${product._id}`} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
