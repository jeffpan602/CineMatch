import './App.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MovieIcon from '@mui/icons-material/Movie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CineMatch</h1>
        <TextField id="outlined-basic" label="Search Movies" variant="outlined" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MovieIcon />
            </InputAdornment>
          ),
        }} />
      </header>
    </div>
  );
}

export default App;
