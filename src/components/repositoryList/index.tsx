import React from "react";

// @logic

// @material-ui
import { Divider, Grid, List, ListItem, ListItemText } from "@material-ui/core";

// @local
import RepositoryItem from "../repositoryItem";
import useStyles from "./styles";
import SearchRepository from "../searchRepository";

interface IProps {
  filteredRepositories: IRepository[] | null;
}
const URL = "https://api.github.com/users";

interface IRepository {
  name: string;
  visibility: string;
  description: string;
  updated_at: Date;
  default_branch: string;
  languages_url: string;
}

const RepositoryList = ({ filteredRepositories }: IProps) => {
  const classes = useStyles({});
  const [noMatches, setNoMatches] = React.useState(false);

  return (
    <Grid container className={classes.root}>
     
        <List>
          {filteredRepositories &&
            filteredRepositories.map((singleRepository: IRepository) => {
              return (
                <Grid  item xs={12}>
                  <ListItem alignItems="flex-start">
                    <RepositoryItem repository={singleRepository} />
                  </ListItem>
                  <Divider/>
                </Grid>
              );
            })}
        </List>
      
    </Grid>
  );
};

export default RepositoryList;
