import React from "react";
import axios from "axios";
import { format } from "date-fns";
// @material-ui
import { Grid, Typography } from "@material-ui/core";
import { TerminalOutlined, ModeStandbyOutlined, StarBorderOutlined} from "@mui/icons-material";
// @local
import useStyles from "./styles";

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
    /**
     * Each language used in a repository has a numeric value associated
     * The most used language has the highest value
     * This function maps through the tuple-like (lanuage, its_corresponding_value) to get
     * the entry with the highest number and then extracts the associated language
     * **/
    await axios.get<IResult>(repository.languages_url).then((result) => {
      const maxTuple = Object.entries(result.data).reduce(
        (previousValue, currentValue) =>
          previousValue[1] > currentValue[1] ? previousValue : currentValue
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
        <Grid item>
          <Typography variant="caption" className={classes.updatedAt}>
            {/* formating the date in PP allows to display it a "Feb 15, 2021" format  */}
            Updated on {format(repository.updated_at, "PP")}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="caption" style={{color:"#56545A"}}>{repository.description}</Typography>
      </Grid>

      <Grid
        item
        md={3}
        xs={12}
        container
        direction="row"
        alignItems="flex-start"
      >
        <TerminalOutlined sx={{ fontSize: "18px", color: "#95CE2f" }} />
        <Typography variant="caption" className={classes.language}>
          {mostUsedLanguage}
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        container
        direction="row"
        alignItems="flex-start"
      >
        <StarBorderOutlined sx={{ fontSize: "18px", color: "#A0A3A8" }} />
        <Typography variant="caption" className={classes.relatedInfo}>
          {repository.stargazers_count}
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        container
        direction="row"
        alignItems="flex-start"
      >
        <ModeStandbyOutlined sx={{ fontSize: "18px", color: "#A0A3A8" }} />
        <Typography variant="caption" className={classes.relatedInfo}>
          {repository.open_issues}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RepositoryItem;
