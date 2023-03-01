import './App.css';
import TextField from '@mui/material/TextField';
import MovieIcon from '@mui/icons-material/Movie';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CineMatch</h1>
        <Container>
          <Row>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <MovieIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
              <TextField id="search-bar" label="Search Movies!" variant="outlined" />
            </Box>
            <Button variant="outlined">Submit</Button>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
