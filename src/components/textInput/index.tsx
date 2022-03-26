import React from "react";

// @logic

// @material-ui
import {
  List,
  ListItem,
  TextField,
} from "@material-ui/core";

// @local

const TextInput = () => {

  return (
    <TextField
    id="user-input"
    label="Username"
    type="text"
    variant="outlined"

  />
  );
};

export default TextInput;
