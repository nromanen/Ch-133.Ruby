import './header.scss';
import '../../consts.js';
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";
import Switcher from '../../components/switch-language/switch-language';
import MenuList from '../../components/menuList';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menu = [
    {
      title: t("header.main"),
      path: "/adverts",
    },
    {
      title: t("header.contact"),
      path: "/contact",
    },
  ];

  return (
    <header>
      <div className="container header_content">
        <a className="brand" onClick={ () => {navigate("/")} }>💫Read</a>
        <nav>
          <ul>
            {
              menu.map(({ title, path }) => (
                 <li key={title}>
                  <a onClick={()=>{navigate(path)}}>{title}</a>
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
