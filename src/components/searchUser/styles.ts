import { makeStyles } from "@mui/styles";
import { theme } from "../repositoryPage/styles";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles({
  submitBtn: {
    fontStyle: "normal",
    backgroundColor: "#539BF5",
    fontSize: "15px",
    float: "right",

    letterSpacing: "0.15px",
    "&.MuiButton-root": {
      backgroundColor: "#539BF5",
      minHeight: "55px",
      minWidth: "200px",
      [theme.breakpoints.down("md")]: {
        minWidth: "100%",
        marginTop: "15px",
      },
    },
    "&.MuiButton-root.MuiButton-text": {
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#539BF5",
      },
    },
  },
  textField: { minHeight: "62px" },
  errorMsg: {
    color: "#F44336",
    float: "left",
  },
}, {index: 1});

export default useStyles;
