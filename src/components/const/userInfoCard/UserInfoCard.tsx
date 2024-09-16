import React from "react";
interface UserInfoCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}
const UserInfoCard = ({ title, text, icon }: UserInfoCardProps) => {
  return (
    <div className="flex gap-x-7 justify-start items-center px-3 py-1 border border-gray-400 shadow-md shadow-primary rounded-md">
      {icon}
      <div className="flex flex-col space-y-3 justify-start items-start text-sm">
        <p className="text-primary font-semibold capitalize">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
