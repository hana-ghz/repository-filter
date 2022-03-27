import React from "react";
import axios from "axios";
// @mui
import { Grid } from "@material-ui/core";
// @local
import RepositoryList from "../repositoryList";
import SearchUser from "../searchUser";
import SearchRepository from "../searchRepository";
import UserNotFound from "../userNotFound";
import useStyles from "./styles";

interface IRepository {
  name: string;
  visibility: string;
  description: string;
  updated_at: Date;
  default_branch: string;
  languages_url: string;
}

const RepositoryPage = () => {
  const classes = useStyles({});
  const [username, setUsername] = React.useState("");
  const [userNotFound, setUserNotFound] = React.useState(false);

  const [userRepositories, setUserRepositories] = React.useState<
    IRepository[] | null
  >(null);
  const [filteredRepositories, setFilteredRepositories] = React.useState<
    IRepository[] | null
  >(null);

  const getUsername = (user: string) => {
    setUsername(user);
  };

  const handleUserNotFound = (status: boolean) => {
    setUserNotFound(status);
  };

  const filterList = (searchText: String) => {
    if (searchText !== "") {
      const result = userRepositories?.filter((singleRepo) => {
        return singleRepo.name
          .toLowerCase()
          .startsWith(searchText.toLowerCase());
      });
      if (result) {
        setFilteredRepositories(result);
      }
    } else {
      setFilteredRepositories(userRepositories);
    }
  };

  React.useEffect(() => {
    const getUserRepositories = async () => {
      await axios
        .get(`${URL}/${username}/repos`)
        .then((result) => {
          if (result.status === 200 && result.data.length > 0) {
            const repositories = result.data.map((singleRepo: IRepository) => {
              return {
                name: singleRepo.name,
                visibility: singleRepo.visibility,
                description: singleRepo.description,
                updated_at: new Date(singleRepo.updated_at),
                default_branch: singleRepo.default_branch,
                languages_url: singleRepo.languages_url,
              };
            });

            setUserRepositories(repositories);
            setFilteredRepositories(repositories);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (username !== "") {
      getUserRepositories();
    }
  }, [username]);

  return (
    <Grid container className={classes.container}>
      <Grid item md={10} xs={12}>
        <SearchUser
          onUserSearch={getUsername}
          handleUserNotFound={handleUserNotFound}
        />
      </Grid>

      <Grid item md={10} xs={12}>
        <SearchRepository filterList={filterList} />
      </Grid>

      {username && (
        <Grid item md={12} xs={12}>
          <RepositoryList filteredRepositories={filteredRepositories} />
        </Grid>
      )}

      {userNotFound && (
        <Grid item md={12} xs={12}>
          <UserNotFound />
        </Grid>
      )}
    </Grid>
  );
};

export default RepositoryPage;
