import SliderComponent from "../../components/pages/home/slider/SliderComponent";

import CategorySlider from "../../components/pages/home/category_slider/CategorySlider";
import { useGetAllDepartmentsQuery } from "../../apis/departments/queries";
import LoadingComponent from "../../components/pages/loading/LoadingComponent";
import DepartmentContainer from "../../components/pages/home/department_container/DepartmentContainer";
import ServiceContainer from "../../components/pages/home/service_container/ServiceContainer";
import AdsContainer from "../../components/pages/home/ads_container/AdsContainer";
import NewsContainer from "../../components/pages/home/news_container/NewsContainer";
import CarContainer from "../../components/pages/home/car_container/CarContainer";
import DealsContainer from "../../components/pages/home/deal_container/DealsContainer";
import PlanesContainer from "../../components/pages/home/planes_container/PlanesContainer";
import RealEstateContainer from "../../components/pages/home/real_estate_container/RealEstateContainer";
import SecondSliderComponent from "../../components/pages/home/slider/SecondSliderComponent";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../chat/ChatContainer";

const HomePage = () => {
  const {
    data: departmentsInfo,
    isError,
    isLoading,
  } = useGetAllDepartmentsQuery();
  const navigate = useNavigate();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="container flex flex-col items-center w-full min-w-full">
      <SliderComponent />
      <CategorySlider />
      <div className="flex flex-col max-w-full  justify-start items-start">
        {departmentsInfo &&
          departmentsInfo.length > 0 &&
          departmentsInfo.map((item, index) => (
            <div key={index} className="w-full">
              <DepartmentContainer
                id={item._id}
                name={item.name}
                onClick={() => {
                  navigate(`/departments/${item._id}`);
                }}
              />
            </div>
          ))}
      </div>
      <SecondSliderComponent />
      <ServiceContainer />
      <CarContainer />
      <RealEstateContainer />
      <PlanesContainer />
      <DealsContainer />
      <AdsContainer />
      <NewsContainer />
      <ChatContainer />
    </div>
  );
};

export default HomePage;
