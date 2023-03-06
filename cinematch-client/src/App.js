import './App.css';
import Search from './components/Search'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    s:"",
    results: [],
    selected: {}
  })

  const apikey = "b5d2f69cf0491ce4441c4d04c4befc3d";

  const search = (e) => {
    if (e.key === "Enter") {
      
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s}
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CineMatch</h1>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
            <Search handleInput={handleInput}/>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </header>
    </div>
  );
}

export default App;
