import React from "react";
// @material-ui
import { Divider, List, ListItem } from "@material-ui/core";
// @local
import RepositoryItem from "../repositoryItem";
import useStyles from "./styles";

interface IProps {
  filteredRepositories: IRepository[] | null;
}

interface IRepository {
  name: string;
  visibility: string;
  description: string;
  updated_at: Date;
  default_branch: string;
  languages_url: string;
  stargazers_count: number;
  open_issues: number;
}

const RepositoryList = ({ filteredRepositories }: IProps) => {
  const classes = useStyles({});
  
  return (
    <div className={classes.root}>
      <List>
        {filteredRepositories &&
          filteredRepositories.map((singleRepository: IRepository) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <RepositoryItem repository={singleRepository} />
                </ListItem>
                <Divider />
              </>
            );
          })}
      </List>
    </div>
  );
};

export default RepositoryList;
