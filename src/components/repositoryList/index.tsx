import React from "react";
import axios from 'axios';

// @logic

// @material-ui
import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

// @local
import RepositoryItem from "../repositoryItem";
import useStyles from "./styles";

interface IProps { username: string };
const URL = "https://api.github.com/users";

const RepositoryList = ({username}: IProps) => {
  const classes = useStyles({});

  const  getUserRepositories = async () => {
    const result = await axios.get(`${URL}/${username}/repos`).then((result) => {
      console.log(result);
    }).catch((error)=> {console.log(error)})
  };

  React.useEffect(() => {
    if (username) {
      getUserRepositories();
    }
  }, [username]);
  
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
