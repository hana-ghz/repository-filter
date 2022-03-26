import React from 'react';
// @mui
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

interface IProps { filterList: (searchText : string) => void };

const SearchRepository = ({filterList}:IProps) => {
    const [searchText, setSearchText] = React.useState('')
    
    React.useEffect(() => {
        filterList(searchText);
    }, [searchText])

  return (
    <TextField
      fullWidth
      type="search"
      name="search-bo"
      variant="outlined"
      placeholder="Search for..."
      value={searchText}
      InputProps={{
        startAdornment: <InputAdornment position="start">
           <IconButton
            edge="end"
            >
              <SearchIcon/>
            </IconButton>
        </InputAdornment>,
      }}
      onChange={(e) => setSearchText(e.target.value)}
    />
  )
}

export default SearchRepository