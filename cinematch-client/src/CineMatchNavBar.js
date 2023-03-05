import React from 'react';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

class CineMatchNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ""
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
      }

    handleSearchSubmit() {
        this.props.onSearch(this.state.searchQuery);
        this.props.fetchMovies(this.state.searchQuery);
    }

    render() {
        return (
        <AppBar position="static" style={{backgroundColor:"navy", color:"white"}}>
            <Toolbar>
            <h1>CimeMatch</h1>
            <div style={{ flexGrow: 1 }} />
            <TextField 
                id='search-bar' 
                label='Search' 
                variant='outlined' 
                value={this.state.searchQuery} 
                onChange={this.handleSearchChange} 
                InputProps={{
                    style: { color: 'white' }
                }}
                InputLabelProps={{
                    style: { color: 'white' }
                }}
                style={{color: 'white', flex:3}}
            />
            <Button 
                style={{color:"white"}} 
                onClick={this.handleSearchSubmit}
            >
                    <SearchIcon/>Search
            </Button>
            <div style={{ flexGrow: 1 }} />
            <IconButton color="inherit">
                <AccountCircleIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
        );
    }
}

export default CineMatchNavBar;