import { ServiceModel } from "../../../apis/services/type";
interface ServiceCardProps {
  service: ServiceModel;
}
const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center shadow-md rounded-lg space-y-4 h-52 min-h-fit md:h-60 hover:scale-105 transform ease-in-out duration-300 ">
      <img
        src={service.imageUrl}
        alt="service image"
        className="w-full h-3/5 rounded-md object-contain"
        crossOrigin="anonymous"
      />
      <p className="px-2 text-xs text-primary font-semibold text-center">
        {service.title}
      </p>
    </div>
  );
};

export default ServiceCard;
