import React from 'react';

import TextField from '@mui/material/TextField';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

function Search({handleInput}) {
  return (
    <div className="searchbar-wrapper">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField id="searchbar" label="Search Movies!" variant="outlined" size="small" 
                InputProps={{startAdornment: <InputAdornment position="start"><MovieIcon/></InputAdornment>,}} 
                onChange={handleInput}/>
                <Button variant="outlined" size="large"><SearchIcon/></Button>
        </Box>
    </div>
  )
}

export default Search