import * as React from 'react';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = (props) => {
  const { t } = useTranslation();

  const footerData = {
      company: t("footer.company"),
      description: t("footer.description"),
      git: 'https://github.com/nromanen/Ch-133.Ruby',
      color: '#10564F',
      font: 'Fredoka',
      textColor: "#ffffff"
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="#ADC9C5" align="center" {...props}>
        {'Copyright © '}
        <Link color="#ADC9C5" href="https://mui.com/">
          {footerData.git}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ bgcolor: footerData.color, p: 6, marginTop: 20, fontFamily: footerData.font}} component="footer">
        <Typography variant="h6" align="center" color="#ADC9C5" gutterBottom>
          {footerData.company}
        </Typography>
        <Typography variant="subtitle1"
          align="center"
          color="#ADC9C5"
          component="p"
        >
          {footerData.description}
        </Typography>
        <Copyright />
      </Box>
    </>
  );
};

export default Footer;
