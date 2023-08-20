import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Header } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';







function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');
  
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      const fetchSearchResults = async () => {
        const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(searchQuery)}&country=us&language=en`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
          }
        };
  
        try {
            const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON

        if (Array.isArray(result)) {
          setSearchResults(result);
        } else if (result.data && Array.isArray(result.data)) {
          setSearchResults(result.data);
        } else {
          console.error('Invalid API response structure');
        }
      } catch (error) {
        console.error(error);
      }
    };
      fetchSearchResults();
    }, [searchQuery]); 


  const topProductsFromRapidAPI = searchResults.slice(0, 5);
  const recommendedProductsFromSearch = searchResults.slice(5, 10);
  const similarUserProductsFromSearch = searchResults.slice(10, 15);

  return (
    <Container>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Header as="h2">Products from RapidAPI</Header>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Card.Group itemsPerRow={5}>
          {topProductsFromRapidAPI.map((item, index) => (
            <Card key={index}>
              <Image src={item.product_photos[0]} wrapped ui={false} />
              <Card.Content>
                <Card.Description>{item.product_title}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Header as="h2">Products Recommended For You</Header>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Card.Group itemsPerRow={5}>
          {recommendedProductsFromSearch.map((item, index) => (
            <Card key={index}>
              <Image src={item.product_photos[0]} wrapped ui={false} />
              <Card.Content>
                <Card.Description>{item.product_title}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Header as="h2">Products Searched by Similar Users</Header>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Card.Group itemsPerRow={5}>
          {similarUserProductsFromSearch.map((item, index) => (
            <Card key={index}>
              <Image src={item.product_photos[0]} wrapped ui={false} />
              <Card.Content>
                <Card.Description>{item.product_title}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    </Container>
  );
}

export default Search;
