import React from "react";
import axios from "axios";
import { URL } from "src/App";
// @mui
import { Grid } from "@material-ui/core";
// @local
import RepositoryList from "../repositoryList";
import SearchUser from "../searchUser";
import SearchRepository from "../searchRepository";
import UserNotFound from "../userNotFound";
import useStyles from "./styles";
import { isConstructorDeclaration } from "typescript";
import NoRepositories from "../noRepositories";

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
  const [hasNotRepositories, setHasNotRepositories] = React.useState(false);

  const [userRepositories, setUserRepositories] = React.useState<
    IRepository[] | null
  >(null);

  const [filteredRepositories, setFilteredRepositories] = React.useState<
    IRepository[] | null
  >(null);

  const getUsername = (user: string) => {
    /**handles the username emitted from the searchUser child component */
    setUsername(user);
  };

  const handleUserNotFound = (status: boolean) => {
    /**handles the case of no user found
     * If the userNotFound is set to true, a 404ResourceNotFound page would be displayed
     */

    setUserNotFound(status);
  };

  const filterList = (searchText: String) => {
    /** Filtering the list consists of  checking the starting of the repositories names against the search keyword
     * Transforming the strings to lowercase make the search searching process not case-sensitive
     * The result of the filtered would be passed down to the list to update the view
     */

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
            /**After fetching all repositories, a mapping through them to extract only the needed fields.
             * This also allows for variable typing.
             */
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
          } else {
            setHasNotRepositories(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (username !== "") {
      getUserRepositories();
    } else {
      /**if no username is emitted from the userSearch, the respositories list should be emptied*/
      setUserRepositories(null);
      setFilteredRepositories(null);
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

      {/* If the userSearch doesn't fetch a user, a modal with a usernotfound notice is displayed */}
      { userNotFound && (
        <Grid item md={12} xs={12}>
          <UserNotFound />
        </Grid>
      )}
       {/* If the user has not repositories (the array of the repositorie fetched is 0),  a modal indicating that he has no repositories is displayed */}
      {username !== "" && hasNotRepositories && (
        <Grid item md={12} xs={12}>
          <NoRepositories username={username} />
        </Grid>
      )}
      {username !== "" && (
        <Grid item md={12} xs={12}>
          <RepositoryList filteredRepositories={filteredRepositories} />
        </Grid>
      )}
    </Grid>
  );
};

export default RepositoryPage;
