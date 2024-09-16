import { useTranslation } from "react-i18next";

interface CircleIconTextProps {
  text: string;
  icon: React.ReactNode;
}

const CircleIconText = ({ text, icon }: CircleIconTextProps) => {
  const { t } = useTranslation();
  return (
    <div className=" flex-col flex justify-center items-center">
      <div className=" p-3 rounded-full bg-primary justify-center items-center">
        {icon}
      </div>
      <p className="text-[10px] md:text-xs text-center text-primary font-body">
        {t(`${text}`)}
      </p>
    </div>
  );
};

export default CircleIconText;
