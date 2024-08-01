import { MdFormatListBulleted, MdPersonAddAlt1 } from "react-icons/md";
import logo_img from "../../assets/netzoon-logo.png";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { useCountry } from "../../context/CountryContext";
import "./index.css";
import { IoMdAddCircle, IoMdCart, IoMdHome } from "react-icons/io";
import { useAppSelector } from "../../app/hooks";
import { selectTotalQuantity } from "../../features/cart/slice";
import LanguageButton from "../../components/const/language-button/LanguageButton";
import { DepartmentModel } from "../../apis/departments/type";
import { useTranslation } from "react-i18next";

interface NavbarParams {
  profileImage?: string;
  username?: string | undefined;
  departmentsInfo?: DepartmentModel[] | undefined;
}

const Navbar = ({ profileImage, departmentsInfo, username }: NavbarParams) => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { country, setCountry } = useCountry();
  const [selected, setSelected] = useState(country);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <>
      <header className="fixed left-0 top-0 z-[1001] w-full bg-seconBackground border-b border-gray-200 shadow-sm">
        <nav className="hidden md:flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-x-4">
            <Link to="/home">
              <img
                src={logo_img}
                alt="Netzoon Logo"
                className="w-24 lg:w-32 object-cover"
              />
            </Link>
            <ReactFlagsSelect
              className="react-flags-select"
              selected={selected}
              searchable
              onSelect={code => {
                setSelected(code);
                setCountry(code);
                console.log(code);
              }}
            />
          </div>
          <div className="w-full max-w-xl mx-4">
            <input
              type="text"
              placeholder={`${t("what_are_you_looking_for")}`}
              className="border border-gray-300 bg-white text-gray-700 outline-none px-4 py-2 rounded-full w-full"
            />
          </div>
          <div className="flex items-center gap-x-4">
            <LanguageButton
              title={selectedLang === "en" ? "English" : "العربية"}
              className="relative flex items-center rounded-lg"
            />
            <div className="text-gray-700">
              {t("hala")} {username?.split(" ", 1)}
            </div>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-primary object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <Link to="/signin">
                <MdPersonAddAlt1 className="text-primary w-6 h-6" />
              </Link>
            )}
            <Link to="/your-cart" className="relative flex items-center">
              <IoMdCart className="w-6 h-6 text-primary" />
              {totalQuantity > 0 && (
                <div className="absolute -top-2 -right-2 rounded-full p-1 w-5 h-5 text-xs text-white bg-red-500 flex items-center justify-center">
                  {totalQuantity}
                </div>
              )}
            </Link>
          </div>
        </nav>
        <div className="hidden md:flex bg-seconBackground py-2 px-5">
          <div className="flex justify-between items-center text-gray-800">
            <div className="flex items-center gap-x-4">
              {departmentsInfo &&
                departmentsInfo.map((department, index) => (
                  <Link
                    key={index}
                    to={`/departments/${department._id}`}
                    className={`font-semibold capitalize ${
                      department.name === "in_account" ? "hidden" : "flex"
                    } hover:text-primary`}
                  >
                    {t(department.name)}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </header>
      {/* <header className="fixed left-0 top-0 z-[1001] w-full bg-seconBackground border-b border-gray-200 shadow-sm md:hidden">
        <nav className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-x-4">
            <Link to="/home">
              <img
                src={logo_img}
                alt="Netzoon Logo"
                className="w-20 object-cover"
              />
            </Link>
            <ReactFlagsSelect
              className="react-flags-select"
              selected={selected}
              searchable
              onSelect={code => {
                setSelected(code);
                setCountry(code);
                console.log(code);
              }}
            />
          </div>
          <Link to="/your-cart" className="relative flex items-center">
            <IoMdCart className="w-6 h-6 text-primary" />
            {totalQuantity > 0 && (
              <div className="absolute -top-2 -right-2 rounded-full p-1 w-5 h-5 text-xs text-white bg-red-500 flex items-center justify-center">
                {totalQuantity}
              </div>
            )}
          </Link>
        </nav>
        <div className="flex items-center justify-center px-5 py-2">
          <input
            type="text"
            placeholder={`${t("what_are_you_looking_for")}`}
            className="border border-gray-300 bg-white text-gray-700 outline-none px-4 py-2 rounded-full w-full"
          />
        </div>
      </header> */}

      {/* Top Navbar for Mobile */}
      <header className="fixed left-0 top-0 z-[1001] w-full bg-seconBackground border-b border-gray-200 shadow-sm md:hidden">
        <nav className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-x-4">
            <Link to="/home">
              <img
                src={logo_img}
                alt="Netzoon Logo"
                className="w-20 object-cover"
              />
            </Link>
            <ReactFlagsSelect
              className="react-flags-select"
              selected={selected}
              searchable
              showOptionLabel={false}
              showSecondaryOptionLabel={false}
              showSelectedLabel={false}
              onSelect={code => {
                setSelected(code);
                setCountry(code);
                console.log(code);
              }}
            />
          </div>
          <div className="flex flex-row gap-x-4">
            <Link to="/your-cart" className="relative flex items-center">
              <IoMdCart className="w-6 h-6 text-primary" />
              {totalQuantity > 0 && (
                <div className="absolute -top-2 -right-2 rounded-full p-1 w-5 h-5 text-xs text-white bg-red-500 flex items-center justify-center">
                  {totalQuantity}
                </div>
              )}
            </Link>
            <LanguageButton
              title={selectedLang === "en" ? "English" : "العربية"}
              className="relative flex items-center rounded-lg"
            />
          </div>
        </nav>
        <div className="flex items-center justify-center px-5 py-2">
          <input
            type="text"
            placeholder={`${t("what_are_you_looking_for")}`}
            className="border border-gray-300 bg-white text-gray-700 outline-none px-4 py-2 rounded-full w-full"
          />
        </div>
      </header>

      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 z-[1001]  left-0 w-full bg-seconBackground border-t border-gray-200 shadow-sm md:hidden">
        <div className="flex justify-around items-center py-3">
          <Link to="/" className="flex flex-col items-center">
            <IoMdHome className="w-6 h-6 text-primary" />
            <span className="text-xs">{t("home")}</span>
          </Link>
          <Link to="/your-cart" className="flex flex-col items-center relative">
            <IoMdCart className="w-6 h-6 text-primary" />
            {totalQuantity > 0 && (
              <div className="absolute -top-1 -right-2 rounded-full p-1 w-4 h-4 text-xs text-white bg-red-500 flex items-center justify-center">
                {totalQuantity}
              </div>
            )}
            <span className="text-xs">{t("cart")}</span>
          </Link>
          <Link to="/" className="flex flex-col items-center">
            <IoMdAddCircle className="w-6 h-6 text-primary" />
            <span className="text-xs">{t("add")}</span>
          </Link>
          <Link to="/" className="flex flex-col items-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-6 h-6 rounded-full border border-primary object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <Link to="/signin">
                <MdPersonAddAlt1 className="text-primary w-6 h-6  " />
              </Link>
            )}
            <span className="text-xs">{t("account")}</span>
          </Link>
          <Link to="/" className="flex flex-col items-center">
            <MdFormatListBulleted className="w-6 h-6 text-primary" />
            <span className="text-xs">{t("more")}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
