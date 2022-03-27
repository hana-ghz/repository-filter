import React from "react";
// @material-ui
import { Grid, Typography } from "@mui/material";
import { DoNotDisturbAltOutlined } from "@mui/icons-material";
// @local
import useStyles from "./styles";

interface IProps {
  username: string;
}
const NoRepositories = ({ username }: IProps) => {
  const classes = useStyles({});

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <DoNotDisturbAltOutlined sx={{ fontSize: 200 }} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4">
          {username} doesn't have any public repositories yet.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoRepositories;
