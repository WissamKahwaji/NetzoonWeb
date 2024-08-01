interface TextWithButtonProps {
  text: string;
  btnText: string;
  onClick: () => void;
}

const TextWithButton = ({ text, btnText, onClick }: TextWithButtonProps) => {
  return (
    <div className="w-full px-3 md:px-6 flex flex-row justify-between items-center capitalize">
      <p className="text-black font-semibold font-header text-sm md:text-lg">
        {text}
      </p>
      <button
        onClick={onClick}
        className="text-white text-xs md:text-base bg-primary px-2 py-1 border-2 border-white shadow-md rounded-md hover:underline capitalize"
      >
        {btnText}
      </button>
    </div>
  );
};

export default TextWithButton;
