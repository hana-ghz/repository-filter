import React from "react";
import axios from 'axios';
// @form
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// @material-ui
import { Grid, TextField, Button } from "@material-ui/core";
import {PersonOutline} from '@mui/icons-material';
// @local
import useStyles from "./styles";

interface FormValues {
  username: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
});

interface IProps { onUserSearch: (username: string) => void };
const URL = "https://api.github.com/users";


const SearchUser = ({onUserSearch}:IProps) => {
  const classes = useStyles({});
  

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const  getUser = async (payload: FormValues) => {
    const { username } = payload;
    console.log(`${URL}/${username}`)
    await axios.get(`${URL}/${username}`).then((result) => {
      if (result.status === 200) {
        console.log("hel user", username)
        onUserSearch(username);
      }
    }).catch((error)=> {console.log(error)})
  };

  return (
    <div style={{width: '100%'}}>
    <form onSubmit={handleSubmit(getUser)} >
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item  xs={12} md={7}>
          <Controller
            render={(props) => (
              <TextField
                {...props.field}
                fullWidth
                name="username"
                type="text"
                margin="normal"
                label="Username"
                variant="outlined" 
                error={Boolean(errors.username)}
                helperText={errors.username && errors.username.message}
              />
            )}
            name="username"
            control={control}
          />
        </Grid>
        <Grid  item xs={12} md={2}>
            <Button className={classes.submitBtn} type="submit" startIcon={<PersonOutline />} >Get User</Button>
        </Grid>
      </Grid>
      </form>
      </div>
  );
};

export default SearchUser;
