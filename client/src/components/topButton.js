import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: "10%",
          bottom: "0%",
          zIndex: 1000,
          paddingBottom:'2%'
        }}
      >
        {showButton && (
          <Fab
            variant="extended"
            color="#ADC9C5"
            aria-label="add"
            onClick={scrollToTop}
          >
            <NavigationIcon sx={{ mr: 1 }} />
            Top
          </Fab>
        )}
      </Box>
    </>
  );
};

export default TopButton;
