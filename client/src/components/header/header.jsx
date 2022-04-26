import './header.scss';
import '../../consts.js';
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom";
import Switcher from '../../components/switch-language/switch-language';
import MenuList from '../../components/menuList';
import CreateButton from "../create-button/create-button";
import Cookies from 'universal-cookie';

const Header = (props) => {
  const cookies = new Cookies();
  const token = cookies.get('user-info');




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
        <a className="brand" onClick={ () => {navigate("/")} }>React&Rails</a>
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
        { token != null && <CreateButton link={"/create_advert"}/>  }
        <Switcher/>
        <MenuList/>
      </div>
    </header>
  );
};

export default Header;
