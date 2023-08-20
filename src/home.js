import React, { useState, useEffect } from 'react';
import { Container, Input, Button, Card, Image, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [cardsData, setCardsData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Simulate fetching data from example.com
    // const fetchedData = 
    // setCardsData(fetchedData);

    (async() =>{
        const fetchedData = await axios.get(`localhost:5000`);
        setCardsData(fetchedData);
    })();


  }, []); // Get the navigate function


  const handleCardClick = (index) => {
    // You can add your click logic here
    console.log(`Clicked on card ${index + 1}`);
  };

  const handleSearchClick = () => {
    navigate(`/search?query=${searchText}`); // Navigate to /search when search button is clicked
  };

  return (
    <Container >
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Input 
          fluid
          placeholder="Search..."
          style={{ width: '60%', marginRight: '10px' }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} />
        <Button primary onClick={handleSearchClick}>Search</Button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Header as="h2">Top Products</Header>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Card.Group itemsPerRow={5}>
          {cardsData.map((card, index) => (
            <Card key={index} onClick={() => handleCardClick(index)}>
              <Image src={card.image} wrapped ui={false} />
              <Card.Content>
                <Card.Description>{card.text}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
      
    </Container>
  );
}

export default Home;
