import './header.scss'
import Cookies from "js-cookie";
import i18n from "i18next";
import { useState } from "react"
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const menu = [
    {
      title: t("header.main"),
      path: "#",
    },
    {
      title: t("header.contact"),
      path: "#",
    },
  ];

  const languages = [
    { name: "English", code: "en" },
    { name: "Українська", code: "uk" },
  ];

  const currentLocale = Cookies.get("i18next") || "en";
  const [language, setLanguage] = useState(currentLocale);

  const handleChangeLocale = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <header>
      <div className="container header_content">
        <div className="brand">React&Rails</div>
        <nav>
          <ul>
            {menu.map(({ title, path }) => (
              <li key={title}>
                <a href={path}>{title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="spacer"></div>
        <div className="switcher">
          <span>{t("header.language")}</span>{" "}
          <select onChange={handleChangeLocale} value={language}>
            {languages.map(({ name, code }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
