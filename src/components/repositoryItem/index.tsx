import React from "react";
import axios from "axios";
import { format } from "date-fns";
// @material-ui
import { Grid, Typography } from "@material-ui/core";
// @local
import useStyles from "./styles";

interface IRepository {
  name: string;
  visibility: string;
  description: string;
  updated_at: Date;
  default_branch: string;
  languages_url: string;
}

interface IProps {
  repository: IRepository;
}
interface IResult {
  [key: string]: Number;
}

const RepositoryItem = ({ repository }: IProps) => {
  const classes = useStyles({});
  const [mostUsedLanguage, setMostUsedLanguage] = React.useState("");

  const getMostUsedLanguages = async () => {
    await axios.get<IResult>(repository.languages_url).then((result) => {
      const maxTuple = Object.entries(result.data).reduce((e, v) =>
        e[1] > v[1] ? e : v
      );
      setMostUsedLanguage(maxTuple[0]);
    });
  };

  React.useEffect(() => {
    getMostUsedLanguages();
  }, [repository]);

  return (
    <Grid container spacing={1} className={classes.container}>
      <Grid
        container
        item
        xs={12}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={8}>
          <Typography variant="h6" className={classes.repoTitle}>
            {repository.name}
          </Typography>
        </Grid>
        <Grid item >
          <Typography variant="caption" className={classes.updatedAt}>
            Updated on {format(repository.updated_at, "PP")}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2">{repository.description}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="caption" className={classes.language}>
          {mostUsedLanguage}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RepositoryItem;
