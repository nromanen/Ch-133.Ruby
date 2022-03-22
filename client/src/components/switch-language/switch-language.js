import Cookies from "js-cookie";
import i18n from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import 'components/header/header.scss';

const Switcher = () => {

  const languages = [
    { name: "English", code: "en" },
    { name: "Українська", code: "uk" },
  ];

  const handleChangeLocale = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const { t } = useTranslation();
  const currentLocale = Cookies.get("i18next") || "en";
  const [language, setLanguage] = useState(currentLocale);

  return (
    <div className="switcher">
      <span>{t("header.language")}</span>{" "}
      <select onChange={handleChangeLocale} value={language} className="switcher-rignt">
        {languages.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Switcher;
