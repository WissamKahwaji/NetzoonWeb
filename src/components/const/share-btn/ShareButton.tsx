/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoShareSocialSharp } from "react-icons/io5";
import { toast } from "react-toastify";

interface ShareButtonProps {
  link?: string;
}

const ShareButton = ({ link }: ShareButtonProps) => {
  const handleShareClick = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(link ?? window.location.href).then(() => {
      toast.info("copy to clipboard");
    });
  };
  return (
    <IoShareSocialSharp
      className="w-5 h-5 text-primary cursor-pointer"
      onClick={handleShareClick}
    />
  );
};

export default ShareButton;
