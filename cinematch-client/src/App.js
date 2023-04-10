import './App.css';
import TextField from '@mui/material/TextField';
import MovieIcon from '@mui/icons-material/Movie';
import Button from '@mui/material/Button';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import { useTable } from "react-table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CineMatch</h1>
        <MDBContainer>
          <MDBRow>
            <MDBCol size='lg'>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <MovieIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                <TextField id="search-bar" label="Search Movies!" variant="outlined" />
              </Box>
            </MDBCol>
            <MDBCol size="sm">
              <Button variant="outlined">Submit</Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </header>
    </div>
  );
}

export default App;
