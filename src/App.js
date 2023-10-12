import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, InputGroup, FormControl, Row, Card } from 'react-bootstrap'; 
import { useState, useEffect } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [accessToken, setAccessToken] = useState('') 

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(response => response.json())
    .then(data => setAccessToken(data.access_token))
  }, [])
  
  async function search(){
    console.log("Search for:" + searchInput);
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl placeholder='search for artist'
          type='input'
          onKeyPress={event => {
            if(event.key === 'Enter'){
              search();
            }
          }
        }
        onChange={event => setSearchInput(event.target.value)}
        />
        <Button onClick={search}>
          search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          <Card>
            <Card.Img src='https://via.placeholder.com/500' />
            <Card.Body>
              <Card.Title>Album Name here</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;

//reated by lorenz boss
// This is a comment