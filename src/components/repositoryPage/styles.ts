import { createTheme, Theme } from '@mui/material/styles';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles(()=> createStyles({
  container: {
    padding: "70px",
    paddingBottom: "0",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    [theme.breakpoints.down('sm')]: {
        padding: "35px",
    },
  },
  updateAt: {
    color: "#A0A3A8",
    fontSize: "8px",
  },
}),
);

export default useStyles;
