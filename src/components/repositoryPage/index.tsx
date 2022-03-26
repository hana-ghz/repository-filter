import React from "react";

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
    <div className={classes.container}>
      <SearchUser onUserSearch={getUsername}/>
      <RepositoryList username={username}/>
    </div>
  );
};

export default RepositoryPage;
