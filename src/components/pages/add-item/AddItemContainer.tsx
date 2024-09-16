import { IoIosArrowForward } from "react-icons/io";

interface AddItemContainerProps {
  title: string;
  text: string;
  onClick?: () => void;
}
const AddItemContainer = ({ title, text, onClick }: AddItemContainerProps) => {
  return (
    <div
      className="flex flex-row justify-between items-center gap-x-3 p-2 bg-primary text-white rounded-lg w-full cursor-pointer hover:scale-105 duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="space-y-1 font-body">
        <p>{title}</p>
        <p className="text-xs text-gray-300">{text}</p>
      </div>
      <IoIosArrowForward className="text-5xl" />
    </div>
  );
};

export default AddItemContainer;
