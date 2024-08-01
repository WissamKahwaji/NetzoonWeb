interface ImageWithTextCardProps {
  text: string;
  imageUrl: string;
  onClick?: () => void;
}

const ImageWithTextCard = ({
  text,
  imageUrl,
  onClick,
}: ImageWithTextCardProps) => {
  return (
    <div
      className="relative w-full h-[140px] md:h-[240px] cursor-pointer   hover:scale-105 transform ease-in-out duration-300"
      onClick={onClick}
    >
      <div className="absolute w-full h-1/3 flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2 bg-primary/60 text-center text-xs font-semibold text-white px-2 py-1 rounded-md whitespace-normal capitalize">
        {text}
      </div>
      <img
        src={imageUrl}
        alt={`card image`}
        className="w-full h-full object-cover rounded-md"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default ImageWithTextCard;
