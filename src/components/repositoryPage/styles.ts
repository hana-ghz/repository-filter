import { createTheme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      paddingRight: "15%",
      paddingLeft: "15%",
      paddingTop: "50px",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: "35px",
      },
    },
  })
  , {index: 1});

export default useStyles;
