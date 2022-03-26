import React from "react";
import axios from 'axios';

// @logic

// @material-ui
import {
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

// @local
import RepositoryItem from "../repositoryItem";
import useStyles from "./styles";
import SearchRepository from "../searchRepository";

interface IProps { username: string };
const URL = "https://api.github.com/users";

interface IRepository {
  name: string;
  visibility: string;
  description: string;
  updated_at: Date;
  default_branch: string;
  languages_url: string;
};

const RepositoryList = ({username}: IProps) => {
  const classes = useStyles({});
  const [userRepositories, setUserRepositories] = React.useState<IRepository[] | null>(null);
  const [filteredRepositories, setFilteredRepositories] = React.useState<IRepository[] | null>(null);
  const [noMatches, setNoMatches]= React.useState(false)

  React.useEffect(() => {
    const  getUserRepositories = async () => {
      await axios.get(`${URL}/${username}/repos`).then((result) => {
        if (result.status === 200 && result.data.length > 0) {
          const repositories = result.data.map((singleRepo: IRepository) => {
            
            return {
              name: singleRepo.name,
              visibility: singleRepo.visibility,
              description: singleRepo.description,
              updated_at: new Date(singleRepo.updated_at),
              default_branch: singleRepo.default_branch,
              languages_url: singleRepo.languages_url,
            }
          })
          
          setUserRepositories(repositories);
          setFilteredRepositories(repositories);
        }
      }).catch((error)=> {console.log(error)})
    };
    
    if (username) {
      getUserRepositories();
    }
  }, [username]);

  const filterList = (searchText: String) => {
    if (searchText !== '') {
      const result = userRepositories?.filter((singleRepo) => {
        return singleRepo.name.toLowerCase().startsWith(searchText.toLowerCase())
      })
      result ? setFilteredRepositories(result) : setNoMatches(true)
    } else {
      setFilteredRepositories(userRepositories);
    }
  
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <SearchRepository filterList={filterList} />
      </Grid>
      <Grid container item xs={12}>
        <List>
          {
            filteredRepositories && filteredRepositories.map((singleRepository: IRepository) => {
              return (
                <ListItem alignItems="flex-start">
                  <RepositoryItem repository={singleRepository}/>
                </ListItem>
              )
            })
          }
        </List>
      </Grid>
  </Grid>   
     
  );
};

export default RepositoryList;
