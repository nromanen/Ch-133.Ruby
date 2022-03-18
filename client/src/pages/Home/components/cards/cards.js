import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Footer from 'components/footer/footer';
import { useTranslation } from "react-i18next";

function InfoTilesContent () {
  const { t } = useTranslation();

  const buttonColor = {
    text: "#ffffff",
    background: '#5AC69F',
    font: "font-family: 'Raleway', sans-serif",
  }

  const secondSectionData = {
    id: 1,
    main: t("section.main"),
    description: t("section.description")
  }

  const tiers = [
    {
      id: 1,
      title: t("offers.title"),
      description: t("offers.description"),
      buttonText: t("offers.buttonText"),
      buttonVariant: 'outlined'
    },
    {
      id: 2,
      title: t("offers.title0"),
      description: t("offers.description0"),
      buttonText: t("offers.buttonText0"),
      buttonVariant: 'outlined'
    },
    {
      id: 3,
      title: t("offers.title1"),
      description: t("offers.description1"),
      buttonText: t("offers.buttonText0"),
      buttonVariant: 'outlined'
    },
  ];

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          fontFamily= "'Raleway', sans-serif"
          gutterBottom
        >
          {secondSectionData.main}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          fontFamily="'Inconsolata', monospace"
        >
          {secondSectionData.description}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.id}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                    </Typography>
                  </Box>
                  <Typography variant="h5" align="center">
                    {tier.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} style={{
                      borderRadius: '25px',
                      marginBottom: '12px',
                      borderWidth: '0px',
                      backgroundColor: buttonColor.background,
                      opacity: '0.8',
                      color: buttonColor.text,
                      fontFamily: buttonColor.font,
                  }}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}

export default function InfoTiles() {
  return <InfoTilesContent/>;
}
