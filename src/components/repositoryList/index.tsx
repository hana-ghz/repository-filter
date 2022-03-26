import React from "react";

// @logic

// @material-ui
import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

// @local
import useStyles from "./styles";
import RepositoryItem from "../repositoryItem";

const RepositoryList = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <List>
        <ListItem alignItems="flex-start">
          <RepositoryItem />
         
        </ListItem>
      </List>
    </div>
  );
};

export default RepositoryList;
