import InfoTiles from './components/cards/cards';
import TopButton from "../../components/topButton";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import { useTranslation } from "react-i18next";
import './Home.css'

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const homeInfo = {
    slogan0: t("home.slogan0"),
    slogan1: t("home.slogan1"),
    button: t("home.button"),
  }

  const BigText = () => {
    return (
      <>
        <div className='big-text'>
            {homeInfo.slogan0}
            {homeInfo.slogan1}
            <div className='button'>
              <ContainedButton/>
            </div>
        </div>
      </>
    );
  };

  function ContainedButton() {
    const goSignIn = () => {
      navigate("/sign_up")
    }

    return (
      <Button variant="contained" onClick={goSignIn}
            size="large"
            style={{
              width: '15em',
              height: '5em',
              borderRadius: '25px',
              backgroundColor: '#16796F'
            }}>
          {homeInfo.button}
      </Button>
    );
  }

  return (
    <>
      <Paper square
        elevation={0}
        sx={{
          display: 'flex',
          height: 600,
          pl: 2,
          bgcolor: '#10564F',
        }}>
        <BigText/>
      </Paper>
      <InfoTiles/>
      <TopButton/>
    </>
  );
};

export default Home;
