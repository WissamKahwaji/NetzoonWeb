import { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
interface LanguageButtonProps {
  className: string;
  title?: string | undefined;
}
const LanguageButton = ({ className, title }: LanguageButtonProps) => {
  const { i18n } = useTranslation();

  const storedLanguage = localStorage.getItem("selectedLanguage");
  const [lang, setLang] = useState(
    storedLanguage || navigator.language.split("-")[0] || "en"
  ); // Default to 'en' if language is not available
  // const [initialized, setInitialized] = useState(false);

  // useEffect(() => {
  //   if (!initialized) {
  //     setInitialized(true);
  //     if (storedLanguage && storedLanguage === "ar") {
  //       setLang("en");
  //       localStorage.setItem("selectedLanguage", "en");
  //     }
  //   }
  // }, [storedLanguage, initialized]);
  const navigate = useNavigate();
  useEffect(() => {
    document.body.dir = i18n.dir(lang);
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const changeLanguage = (lng: string) => {
    setLang(lng);
    localStorage.setItem("selectedLanguage", lng);
    navigate("/", { replace: true });
  };

  const [isOpen, setIsOpen] = useState(false);

  const langList = ["en", "ar"];

  return (
    <div className={className}>
      <button
        className="bg-primary text-xs md:text-sm text-white capitalize px-2 py-2 md:px-3 md:py-1  w-full h-full flex items-center justify-between font-serif  rounded-lg tracking-wider border-transparent active:border-white duration-300 active:text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {/* {lang} */}
        {title ? title : lang}
        {!isOpen ? (
          <AiOutlineCaretDown className="h-3" />
        ) : (
          <AiOutlineCaretUp className="h-3" />
        )}
      </button>
      {isOpen && (
        <div className="bg-primary absolute text-white w-full z-50 top-9 md:top-8 rounded-lg flex flex-col items-center  p-1  ">
          {langList.map((lang, index) => (
            <div
              key={index}
              className="w-full flex hover:bg-navBackground/30 justify-center rounded-r-lg border-l-transparent hover:border-l-white border-l-2 cursor-pointer "
              onClick={() => {
                setLang(lang);
                changeLanguage(lang);
                setIsOpen(prev => !prev);
              }}
            >
              <h3 className="capitalize my-1 font-body text-sm md:text-base ">
                {t(lang)}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
