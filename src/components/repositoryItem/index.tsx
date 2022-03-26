import React from "react";

// @logic

// @material-ui
import {

  Grid, Typography,
  
} from "@material-ui/core";

// @local
import useStyles from "./styles";

const RepositoryItem = () => {
  const classes = useStyles({});

  return (
    <Grid container >
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.repoTitle}>
                Random project
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography  variant="subtitle2">
                USING REBASSS AND REACT
            </Typography>
        </Grid>
        <Grid item container xs={12}>
            <Grid item xs={6}>
                <Typography  variant="caption">
                    Typescript
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="caption">
                    updated 6 months ago
                </Typography>
            </Grid>
        </Grid>

    </Grid>
  );
};

export default RepositoryItem;
