import React from "react";
// @mui
import { Grid } from "@material-ui/core";

// @logic
// @local
import RepositoryList from "../repositoryList";
import SearchUser from "../searchUser";
import useStyles from "./styles";


const RepositoryPage = () => {
  const classes = useStyles({});
  const [username, setUsername] = React.useState('');

  const getUsername = (user: string) => {
    setUsername(user)
  }
  return ( 
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <SearchUser onUserSearch={getUsername}/>

      </Grid>
      <Grid item xs={12}>
        <RepositoryList username={username}/>
      </Grid>
    </Grid>
  );
};

export default RepositoryPage;
