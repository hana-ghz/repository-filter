import { makeStyles } from "@mui/styles";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles({
  container: {
    marginTop: "20px",
  },
  searchIcon: {
    "&.MuiOutlinedInput-adornedStart": {
      paddingLeft: "0",
    },
  },
});

export default useStyles;
