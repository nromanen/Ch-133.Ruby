import './header.scss';
import 'consts.js';
import { useTranslation } from "react-i18next";
import Switcher from 'components/switch-language/switch-language';
import MenuList from 'components/menuList';

const Header = (props) => {
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
            {
              menu.map(({ title, path }) => (
                 <li key={title}>
                  <a href={path}>{title}</a>
                 </li>
              ))
            }
          </ul>
        </nav>
        <div className="spacer"></div>
        <Switcher/>
        <MenuList/>
      </div>
    </header>
  );
};

export default Header;
