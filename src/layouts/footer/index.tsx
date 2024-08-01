import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaApplePay,
} from "react-icons/fa";
import { DepartmentModel } from "../../apis/departments/type";
import { SiGooglepay } from "react-icons/si";

import FooterLinkComponent from "./FooterLinkComponent";
import MasterCard from "../../components/const/icons/MasterCard";
import VisaCard from "../../components/const/icons/VisaCard";
import AndroidIcon from "../../components/const/icons/AndroidIcon";
import AppleIcon from "../../components/const/icons/AppleIcon";
import { useTranslation } from "react-i18next";

interface FooterProps {
  departmentsInfo?: DepartmentModel[] | undefined;
}
const Footer = ({ departmentsInfo }: FooterProps) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-seconBackground py-10 border-t border-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold capitalize">
            {t("stay_connected_stay_satisfied_with_netzoon")}
          </h2>
          <p className="text-gray-600 capitalize">
            {t("we_will_be_happy_to_resolve_your_issue")}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-10">
          {departmentsInfo &&
            departmentsInfo.map((department, index) => (
              <FooterLinkComponent
                key={index}
                name={department.name}
                id={department._id}
              />
            ))}
        </div>
        <div className="flex justify-between items-center mb-10">
          <div className="space-y-5">
            <p className="text-gray-600">{t("customer_happiness_center")}</p>
            <a href="mailto:help@netzoon.com" className="text-primary">
              help@netzoon.com
            </a>
            <br />
            <a href="mailto:support@netzoon.com" className="text-primary">
              support@netzoon.com
            </a>
            <div className="flex items-center gap-x-4  ">
              <a href="#" className="text-gray-600 hover:text-primary">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3
              className={`text-[#5776a5] text-2xl font-bold text-center md:text-left mb-1`}
            >
              {t("netzoon_every_where")}
            </h3>
            <div className="flex gap-x-4 mb-4 md:mb-0">
              <a
                href="https://play.google.com/store/apps/details?id=com.netzoon.netzoon_app"
                className="flex items-center"
              >
                <AndroidIcon />
              </a>
              <a
                href="https://apps.apple.com/ae/app/netzoon/id6467718964"
                className="flex items-center"
              >
                <AppleIcon />
              </a>
            </div>
          </div>
          <div className="flex gap-x-4 text-gray-600 items-center">
            <MasterCard />
            <VisaCard />
            <FaApplePay className={`w-12 h-12`} />
            <SiGooglepay className={`w-12 h-12`} />
          </div>
        </div>
        <div className="text-center text-gray-600 mt-10">
          <p>© 2024 netzoon. All Rights Reserved</p>
          <div className="flex justify-center gap-x-4 mt-2">
            <Link to="/terms-of-use" className="hover:text-primary capitalize">
              {t("terms_of_use")}
            </Link>

            <Link to="/privacy-policy" className="hover:text-primary">
              {t("privacy_policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
