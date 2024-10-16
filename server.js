const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const MOVIES_FILE = path.join(__dirname, 'movies.json');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, JS

// Endpoint to get all movies (for random selection)
app.get('/movies', (req, res) => {
  fs.readFile(MOVIES_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading movies file:', err);
      return res.status(500).json({ message: 'Error reading movies file' });
    }

    try {
      const movies = JSON.parse(data || '[]');
      res.json(movies); // Return the array of movies
    } catch (parseError) {
      console.error('Error parsing movies file:', parseError);
      return res.status(500).json({ message: 'Error parsing movies file' });
    }
  });
});

// Endpoint to add a new movie
app.post('/add-movie', (req, res) => {
  const newMovie = req.body;

  // Read the current list of movies
  fs.readFile(MOVIES_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading movies file:', err);
      return res.status(500).json({ message: 'Error reading movies file' });
    }

    try {
        const movies = JSON.parse(data || '[]'); // Parse the file, or use empty array if it's empty
  
        // Check if the movie already exists by title (case-insensitive comparison)
        const movieExists = movies.some(movie => movie.title.toLowerCase() === newMovie.title.toLowerCase());
  
        if (movieExists) {
          return res.status(400).json({ message: 'Movie with this title already exists' });
        }
  
        // If the movie does not exist, add it
        movies.push(newMovie);
  
        // Write the updated list of movies back to the file
        fs.writeFile(MOVIES_FILE, JSON.stringify(movies, null, 2), (writeErr) => {
          if (writeErr) {
            console.error('Error writing movies file:', writeErr);
            return res.status(500).json({ message: 'Error saving movie' });
          }
  
          res.json({ message: 'Movie added successfully!' });
        });
      } catch (parseError) {
        console.error('Error parsing movies file:', parseError);
        return res.status(500).json({ message: 'Error parsing movies file' });
      }
    });
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });