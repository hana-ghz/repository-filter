import React from "react";
import axios from "axios";
import { URL } from "src/App";
// @form
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @material-ui
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { PersonOutline } from "@mui/icons-material";
// @local
import useStyles from "./styles";

interface FormValues {
  username: string;
}

/**This is the validation schema linked to the username field */
const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
});

interface IProps {
  /** onUserSearch emits the username to the parent component if the username exists
   * handleUserNotFound emits true if the username doesn't correspond to any use in github
   */
  onUserSearch: (username: string) => void;
  handleUserNotFound: (status: boolean) => void;
}

const SearchUser = ({ onUserSearch, handleUserNotFound }: IProps) => {
  const classes = useStyles({});

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const getUser = async (payload: FormValues) => {
    const { username } = payload;

    await axios
      .get(`${URL}/${username}`)
      .then((result) => {
        if (result.status === 200) {
          onUserSearch(username);
          handleUserNotFound(false);
        }
      })
      .catch((error) => {
        onUserSearch("");
        handleUserNotFound(true);
      });
  };

  return (
    <form onSubmit={handleSubmit(getUser)}>
      {/*handleSubmit allows testing the input against the validation schema before submitting the form*/}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={9} sm={12} xs={12}>
          <Controller
            render={(props) => (
              <TextField
                {...props.field}
                fullWidth
                name="username"
                type="text"
                margin="normal"
                placeholder="Username"
                variant="outlined"
                className={classes.textField}
                error={Boolean(errors.username)}
              />
            )}
            name="username"
            control={control}
          />
        </Grid>
        <Grid item md sm={12} xs={12}>
          <Button
            className={classes.submitBtn}
            type="submit"
            startIcon={<PersonOutline />}
          >
            Get User
          </Button>
        </Grid>
      </Grid>
      {errors.username && (
        <Typography className={classes.errorMsg} variant="caption">
          {" "}
          {errors.username.message}{" "}
        </Typography>
      )}
    </form>
  );
};

export default SearchUser;
