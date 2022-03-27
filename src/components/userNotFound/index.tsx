import React from "react";
// @material-ui
import { Grid, Typography } from "@material-ui/core";
import { PersonOutline } from "@mui/icons-material";
// @local
import useStyles from "./styles";

const UserNotFound = () => {
  const classes = useStyles({});

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <PersonOutline  sx={{ fontSize: 200 }}/>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4">No users Found</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">
          Check the spelling or try another username
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserNotFound;
