// server.js

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000; // You can use any port number you prefer


// API endpoint to get Pokemon details
app.get('/pokemon/:idOrName', async (req, res) => {
  try {
    const { idOrName } = req.params;

    // Make the request to PokeAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);

    // Extract relevant data from the response
    const pokemonData = {
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map((type) => type.type.name),
      abilities: response.data.abilities.map((ability) => ability.ability.name),
    };

    res.json(pokemonData); // Send the Pokemon data as JSON response
  } catch (error) {
    res.status(404).json({ message: 'Pokemon not found.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
