import { MdFormatListBulleted, MdPersonAddAlt1 } from "react-icons/md";
import logo_img from "../../assets/netzoon-logo.png";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useEffect, useRef, useState } from "react";
import { useCountry } from "../../context/CountryContext";
import "./index.css";
import {
  IoIosLogOut,
  IoIosNotifications,
  IoMdAddCircle,
  IoMdCart,
  IoMdHome,
} from "react-icons/io";
import { useAppSelector } from "../../app/hooks";
import { selectTotalQuantity } from "../../features/cart/slice";
import LanguageButton from "../../components/const/language-button/LanguageButton";
import { DepartmentModel } from "../../apis/departments/type";
import { useTranslation } from "react-i18next";
import { useGetUserSearchQuery } from "../../apis/user/queries";
import { useAuth } from "../../context/AuthContext";

interface NavbarParams {
  profileImage?: string;
  username?: string | undefined;
  departmentsInfo?: DepartmentModel[] | undefined;
}

const Navbar = ({ profileImage, departmentsInfo, username }: NavbarParams) => {
  const { t, i18n } = useTranslation();
  const { logout, isAuthenticated } = useAuth();
  const selectedLang = i18n.language;
  const { country, setCountry } = useCountry();
  const [selected, setSelected] = useState(country);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { data: suggestions, refetch } = useGetUserSearchQuery(searchQuery);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };
  const handleClickOutsideMobile = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobile);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0 && searchQuery !== "") {
      refetch();
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, refetch]);

  return (
    <>
      <header
        className="fixed left-0 top-0 z-[1001] w-full bg-seconBackground border-b border-gray-200 shadow-sm"
        style={{ direction: "ltr" }}
      >
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
          <div className="w-full max-w-xl mx-4 relative">
            <input
              type="text"
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`${t("what_are_you_looking_for")}`}
              className="border border-gray-300 bg-white text-gray-700 outline-none px-4 py-2 rounded-full w-full"
            />
            {showSuggestions && suggestions && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 w-full max-h-[300px] overflow-y-scroll font-body bg-white border border-gray-300 rounded-b-lg shadow-lg z-10"
              >
                {suggestions?.users.map((user, index) => (
                  <Link
                    key={index}
                    to={`/categories/${user.userType}/${user._id}`}
                    reloadDocument
                  >
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={user.profilePhoto}
                        alt=""
                        crossOrigin="anonymous"
                        className="w-8 h-8 rounded-full border border-primary shadow-sm"
                      />
                      <p className="text-sm">{user.username}</p>
                    </div>
                  </Link>
                ))}
                {suggestions?.products.map((product, index) => (
                  <Link
                    key={index}
                    reloadDocument
                    to={`/departments/${product.category?.department._id}/${product.category?._id}/products/${product._id}`}
                  >
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt=""
                        crossOrigin="anonymous"
                        className="w-8 h-8 rounded-full border border-primary shadow-sm"
                      />
                      <p className="text-sm">{product.name}</p>
                    </div>
                  </Link>
                ))}
                {suggestions?.advertisments.map((adv, index) => (
                  <Link key={index} to={`/ads/${adv._id}`} reloadDocument>
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={adv.advertisingImage}
                        alt=""
                        crossOrigin="anonymous"
                        className="w-8 h-8 rounded-full border border-primary shadow-sm"
                      />
                      <p className="text-sm">{adv.advertisingTitle}</p>
                    </div>
                  </Link>
                ))}
                {suggestions?.vehicles.map((vehicle, index) => (
                  <Link
                    key={index}
                    to={`/vehicles/${vehicle.category}/${vehicle._id}`}
                    reloadDocument
                  >
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={vehicle.imageUrl}
                        alt=""
                        crossOrigin="anonymous"
                        className="w-8 h-8 rounded-full border border-primary shadow-sm"
                      />
                      <p className="text-sm">{vehicle.name}</p>
                    </div>
                  </Link>
                ))}
                {suggestions?.realEstates.map((realEstate, index) => (
                  <Link
                    key={index}
                    to={`/real-estate/${realEstate._id}`}
                    reloadDocument
                  >
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                    >
                      <img
                        src={realEstate.imageUrl}
                        alt=""
                        crossOrigin="anonymous"
                        className="w-8 h-8 rounded-full border border-primary shadow-sm"
                      />
                      <p className="text-sm">{realEstate.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <LanguageButton
              title={selectedLang === "en" ? "English" : "العربية"}
              className="relative flex items-center rounded-lg"
            />
            <Link
              to={"add"}
              className="flex justify-start items-center bg-primary px-3 py-0.5 rounded font-serif capitalize"
            >
              <p className="text-white">{t("add_item")}</p>
            </Link>
            {username && (
              <div className="text-gray-700">
                {t("hala")}{" "}
                {username?.split(" ")[0].length > 10
                  ? `${username?.split(" ")[0].slice(0, 8)}...`
                  : username?.split(" ")[0].slice(0, 8)}
              </div>
            )}
            {profileImage ? (
              <Link to={`/my-account`}>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-primary object-cover"
                  crossOrigin="anonymous"
                />
              </Link>
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
            <Link to={`/notifications`}>
              <IoIosNotifications className="w-6 h-6 text-primary" />
            </Link>
            {isAuthenticated && (
              <IoIosLogOut
                className="w-6 h-6 text-primary cursor-pointer"
                onClick={() => {
                  logout();
                  window.location.href = "/signin";
                }}
              />
            )}
          </div>
        </nav>
        <div className="hidden md:flex bg-seconBackground py-2 px-5">
          <div className="flex justify-between items-center text-gray-800">
            <div className="flex items-center lg:gap-x-2 2xl:gap-x-4">
              {departmentsInfo &&
                departmentsInfo.map((department, index) => (
                  <Link
                    key={index}
                    to={`/departments/${department._id}`}
                    className={`font-semibold capitalize ${
                      department.name === "in_account" ? "hidden" : "flex"
                    } hover:text-primary lg:text-xs 2xl:text-base`}
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
          <div className="flex flex-row items-center gap-x-4">
            {/* <Link to="/your-cart" className="relative flex items-center">
              <IoMdCart className="w-6 h-6 text-primary" />
              {totalQuantity > 0 && (
                <div className="absolute -top-2 -right-2 rounded-full p-1 w-5 h-5 text-xs text-white bg-red-500 flex items-center justify-center">
                  {totalQuantity}
                </div>
              )}
            </Link> */}
            <Link to={`/notifications`} className="flex items-center">
              <IoIosNotifications className="w-6 h-6 text-primary" />
            </Link>
            {isAuthenticated && (
              <IoIosLogOut
                className="w-6 h-6 text-primary "
                onClick={() => {
                  logout();
                  window.location.href = "/signin";
                }}
              />
            )}
            <LanguageButton
              title={selectedLang === "en" ? "English" : "العربية"}
              className="relative flex items-center rounded-lg"
            />
          </div>
        </nav>
        <div className="flex items-center justify-center px-5 py-2 relative">
          <input
            type="text"
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`${t("what_are_you_looking_for")}`}
            className="border border-gray-300 bg-white text-gray-700 outline-none px-4 py-2 rounded-full w-full"
          />
          {showSuggestions && suggestions && (
            <div
              ref={suggestionsRef}
              className="absolute overflow-y-scroll max-h-[200px] top-[52px] left-0 w-full font-body bg-white border border-gray-300 rounded-b-lg shadow-lg z-10"
            >
              {suggestions?.users.map((user, index) => (
                <Link
                  key={index}
                  to={`/categories/${user.userType}/${user._id}`}
                  reloadDocument
                >
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    <img
                      src={user.profilePhoto}
                      alt=""
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full border border-primary shadow-sm"
                    />
                    <p className="text-sm">{user.username}</p>
                  </div>
                </Link>
              ))}
              {suggestions?.products.map((product, index) => (
                <Link
                  key={index}
                  reloadDocument
                  to={`/departments/${product.category?.department._id}/${product.category?._id}/products/${product._id}`}
                >
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt=""
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full border border-primary shadow-sm"
                    />
                    <p className="text-sm">{product.name}</p>
                  </div>
                </Link>
              ))}
              {suggestions?.advertisments.map((adv, index) => (
                <Link key={index} to={`/ads/${adv._id}`} reloadDocument>
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    <img
                      src={adv.advertisingImage}
                      alt=""
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full border border-primary shadow-sm"
                    />
                    <p className="text-sm">{adv.advertisingTitle}</p>
                  </div>
                </Link>
              ))}
              {suggestions?.vehicles.map((vehicle, index) => (
                <Link
                  key={index}
                  to={`/vehicles/${vehicle.category}/${vehicle._id}`}
                  reloadDocument
                >
                  <div
                    className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                  >
                    <img
                      src={vehicle.imageUrl}
                      alt=""
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full border border-primary shadow-sm"
                    />
                    <p className="text-sm">{vehicle.name}</p>
                  </div>
                </Link>
              ))}
              {suggestions?.realEstates.map((realEstate, index) => (
                <Link
                  key={index}
                  to={`/real-estate/${realEstate._id}`}
                  reloadDocument
                >
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer flex flex-row gap-x-3 items-center justify-start"
                  >
                    <img
                      src={realEstate.imageUrl}
                      alt=""
                      crossOrigin="anonymous"
                      className="w-8 h-8 rounded-full border border-primary shadow-sm"
                    />
                    <p className="text-sm">{realEstate.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
          <Link to="/add" className="flex flex-col items-center">
            <IoMdAddCircle className="w-6 h-6 text-primary" />
            <span className="text-xs">{t("add")}</span>
          </Link>
          <Link to="/my-account" className="flex flex-col items-center">
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
          <Link to="/more" className="flex flex-col items-center">
            <MdFormatListBulleted className="w-6 h-6 text-primary" />
            <span className="text-xs">{t("more")}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
