import './header.scss'
import { useTranslation } from "react-i18next";
import Switcher from 'components/switch-language/switch-language'

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
        <Switcher/>
      </div>
    </header>
  );
};

export default Header;
