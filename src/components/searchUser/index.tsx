import React from "react";
import axios from "axios";
// @form
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @material-ui
import { Grid, TextField, Button } from "@material-ui/core";
import { PersonOutline } from "@mui/icons-material";
// @local
import useStyles from "./styles";

interface FormValues {
  username: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
});

interface IProps {
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
          handleUserNotFound(false)

        }
      })
      .catch((error) => {
        handleUserNotFound(true)
      });
  };

  return (
    <form onSubmit={handleSubmit(getUser)}>
      <Grid
        container
        style={{ width: "100%" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={8} sm={12} xs={12}>
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
        <Grid item>
          <Button
            className={classes.submitBtn}
            type="submit"
            startIcon={<PersonOutline />}
          >
            Get User
          </Button>
        </Grid>
      </Grid>
      
    </form>
  );
};

export default SearchUser;
