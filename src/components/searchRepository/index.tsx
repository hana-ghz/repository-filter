import React from "react";
// @mui
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
// @local
import useStyles from "./styles";

interface IProps {
  filterList: (searchText: string) => void;
}

const SearchRepository = ({ filterList }: IProps) => {
  const [searchText, setSearchText] = React.useState("");
  const classes = useStyles({});

  React.useEffect(() => {
    // on every change in the search bar, the filtering function gets triggered
    filterList(searchText);
  }, [searchText, filterList]);

  return (
    <div className={classes.container}>
      <TextField
        type="search"
        name="search-bo"
        variant="outlined"
        placeholder="Search repository..."
        value={searchText}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.searchIcon}>
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchRepository;
