import React, { PropsWithRef } from "react";
import axios from 'axios';
// @form
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// @material-ui
import { Grid, TextField, Button } from "@material-ui/core";

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
    await axios.get(`${URL}/${username}`).then((result) => {
      if (result.status === 200) {
        onUserSearch(username);
      }
    }).catch((error)=> {console.log(error)})
  };

  return (
    <form onSubmit={handleSubmit(getUser)}>
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item >
          <Controller
            render={(props) => (
              <TextField
                {...props.field}
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
        <Grid item>
          <Button className={classes.submitBtn} type="submit" >Get User</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchUser;
