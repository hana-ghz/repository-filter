import React from "react";
import axios from 'axios';


// @logic

// @material-ui
import {

  Grid, Typography,
  
} from "@material-ui/core";

// @local
import useStyles from "./styles";


interface IRepository {
    name: string;
    visibility: string;
    description: string;
    updated_at: Date;
    default_branch: string;
    languages_url: string;
};
  
interface IProps { repository: IRepository};

const RepositoryItem = ({repository}: IProps) => {
    const classes = useStyles({});
    const [mostUsedLanguage, setMostUsedLanguage] = React.useState('')

    const getMostUsedLanguages = async () => {
        await axios.get(repository.languages_url).then((result) => {
            //const max = Math.max(...Object.values(result.data))

            setMostUsedLanguage (Object.keys(result.data)[0]);
           
        });
    }
        
    React.useEffect(() => {   
        getMostUsedLanguages();
    }, [repository]);

  return (
    <Grid container >
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.repoTitle}>
                {repository.name}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography  variant="subtitle2">
                {repository.description}
            </Typography>
        </Grid>
        <Grid item container xs={12}>
            <Grid item xs={6}>
                <Typography  variant="caption">
                    {mostUsedLanguage}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="caption">
                    updated {repository.updated_at.getTime()}
                </Typography>
            </Grid>
        </Grid>

    </Grid>
  );
};

export default RepositoryItem;
