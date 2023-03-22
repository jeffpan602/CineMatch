import React from 'react';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import MovieIcon from '@mui/icons-material/Movie';

class CineMatchNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ""
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
      }

    handleSearchSubmit() {
        this.props.onSearch(this.state.searchQuery);
        this.props.fetchMovies(this.state.searchQuery);
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSearchSubmit();
        }
    }

    render() {
        return (
        <AppBar position="static" style={{backgroundColor:"navy", color:"white"}}>
            <Toolbar>
            <h1>CineMatch</h1>
            <div style={{ flexGrow: 1 }} />
            <TextField 
                id='search-bar' 
                /*label='Search' */
                variant='outlined' 
                value={this.state.searchQuery} 
                onChange={this.handleSearchChange} 
                onKeyDown={this.handleKeyDown}
                InputProps={{
                    style: { color: 'white' },
                    startAdornment: <InputAdornment position="start"><MovieIcon htmlColor='white'/></InputAdornment>
                }}
                InputLabelProps={{
                    style: { color: 'white' }
                }}
                style={{color: 'white', flex:3}}
                size="small"
            />
            <Button 
                style={{color:"white"}} 
                onClick={this.handleSearchSubmit}
                size="medium"
            >
                    <SearchIcon/>Search
            </Button>
            <div style={{ flexGrow: 1 }} />
            <IconButton color="inherit">
                <AccountCircleIcon fontSize='large'/>
            </IconButton>
            </Toolbar>
        </AppBar>
        );
    }
}

export default CineMatchNavBar;