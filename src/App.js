import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, InputGroup, FormControl, Row, Card } from 'react-bootstrap';


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedOption, setSelectedOption] = useState('both'); // Default to 'both'

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(response => response.json())
      .then(data => setAccessToken(data.access_token));
  }, []);

  async function search() {
    // Clear previous results
    setAlbums([]);

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistId = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then(response => response.json())
      .then(data => data.artists.items[0].id);

    var searchUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`;

    if (selectedOption === 'singles') {
      searchUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?album_type=single&limit=50`;
    } else if (selectedOption === 'albums') {
      searchUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?album_type=album&limit=50`;
    }

    var returnedAlbums = await fetch(searchUrl, searchParameters)
      .then(response => response.json())
      .then(data => {
        setAlbums(data.items);
      })
  }

  return (
    <div className="App">
      <Container>
        <Row className="mt-4">
          <div className="d-flex justify-content-start" style={{ width: '50%' }}>
            <Button
              variant={selectedOption === 'singles' ? 'primary' : 'light'}
              className="mx-1"
              onClick={() => {
                setSelectedOption('singles');
                // Clear albums when the option changes
                setAlbums([]);
              }}
              style={{ width: '30%' }}
            >
              Singles
            </Button>
            <Button
              variant={selectedOption === 'albums' ? 'primary' : 'light'}
              className="mx-1"
              onClick={() => {
                setSelectedOption('albums');
                // Clear albums when the option changes
                setAlbums([]);
              }}
              style={{ width: '30%' }}
            >
              Albums
            </Button>
            <Button
              variant={selectedOption === 'both' ? 'primary' : 'light'}
              className="mx-1"
              onClick={() => {
                setSelectedOption('both');
                // Clear albums when the option changes
                setAlbums([]);
              }}
              style={{ width: '30%' }}
            >
              Singles & Albums
            </Button>
          </div>
        </Row>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='search for artist'
            type='input'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button
            variant="primary"
            onClick={search}
          >
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map((album, i) => (
            <Card key={i}>
              <Card.Img src={album.images[0].url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
