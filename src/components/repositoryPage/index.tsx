import React from "react";
import axios from 'axios';

// @mui
import { Grid } from "@material-ui/core";

// @logic
// @local
import RepositoryList from "../repositoryList";
import SearchUser from "../searchUser";
import useStyles from "./styles";
import SearchRepository from "../searchRepository";


interface IRepository {
  name: string;
  visibility: string;
  description: string;
  updated_at: Date;
  default_branch: string;
  languages_url: string;
};
const URL = "https://api.github.com/users";


const RepositoryPage = () => {
  const classes = useStyles({});
  const [username, setUsername] = React.useState('');
  const [userRepositories, setUserRepositories] = React.useState<IRepository[] | null>(null);
  const [filteredRepositories, setFilteredRepositories] = React.useState<IRepository[] | null>(null);

  const getUsername = (user: string) => {
    setUsername(user)
  }

  const filterList = (searchText: String) => {
    if (searchText !== '') {
      const result = userRepositories?.filter((singleRepo) => {
        return singleRepo.name.toLowerCase().startsWith(searchText.toLowerCase())
      })
      if (result) {setFilteredRepositories(result)}
    } else {
      setFilteredRepositories(userRepositories);
    }
  }

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
          
          console.log(repositories)
          setUserRepositories(repositories);
          setFilteredRepositories(repositories);
        }
      }).catch((error)=> {console.log(error)})
    };
    
    if (username!=='') {
      getUserRepositories();
    }
  }, [username]);


  return ( 
    <Grid container className={classes.container}>
      <Grid item xs={11}>
        <SearchUser onUserSearch={getUsername}/>
      </Grid>

      <Grid item md={9} xs={12}>
        <SearchRepository filterList={filterList} />
      </Grid>

     
      <Grid container item xs={12} >
        <RepositoryList filteredRepositories={filteredRepositories}/>
      </Grid>
    </Grid>
  );
};

export default RepositoryPage;
