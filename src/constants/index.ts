import freezoneImg from "../assets/free_zones.png";
import factoriesImg from "../assets/factories.png";
import localCompaniesImg from "../assets/local_companies.png";
import seaCompaniesImg from "../assets/ships.png";
import carsImg from "../assets/cars_cat3.jpeg";
import civilaircraftImg from "../assets/plan.jpg";
import usersImg from "../assets/users_cat2.webp";
import realEstateImg from "../assets/real_estate.jpg";
import tradersImg from "../assets/seller.jpg";
import deliveryCompaniesImg from "../assets/delivery.jpg";

const USER_TYPE = {
  LOCAL_COMPANY: "local_company",
  USER: "user",
  FREEZONE: "freezone",
  FACTORY: "factory",
  CAR: "car",
  PLANES: "planes",
  SEA_COMPANIES: "sea_companies",
  NEWS_AGENCY: "news_agency",
  REAL_ESTATE: "real_estate",
  TRADER: "trader",
  DELIVERY_COMPANY: "delivery_company",
};

const categories = [
  { url: freezoneImg, name: "free_zone_companies", type: "freezone" },
  { url: factoriesImg, name: "factories", type: "factory" },
  { url: localCompaniesImg, name: "local_companies", type: "local_company" },
  { url: seaCompaniesImg, name: "sea_companies", type: "sea_companies" },
  { url: carsImg, name: "cars", type: "car" },
  { url: civilaircraftImg, name: "civil_aircraft", type: "planes" },
  { url: usersImg, name: "users", type: "user" },
  { url: realEstateImg, name: "real_estate", type: "real_estate" },
  { url: tradersImg, name: "traders", type: "trader" },
  {
    url: deliveryCompaniesImg,
    name: "delivery_companies",
    type: "delivery_company",
  },
];

export { categories, USER_TYPE };
