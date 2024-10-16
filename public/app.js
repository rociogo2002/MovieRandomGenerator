// Handle the submission of the form to add new movies
document.getElementById('add-movie-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value;
  const director = document.getElementById('director').value;
  const year = document.getElementById('year').value;

  // Create an object with the new movie data
  const newMovie = { title, genre, director, year };

  // Send the movie data to the server
  fetch('/add-movie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    alert(data.message); // Show success message
    document.getElementById('add-movie-section').classList.add('hidden');
    document.getElementById('menu').style.display = 'block'; // Return to menu
    document.getElementById('add-movie-form').reset(); // Clear form inputs
  })
  .catch(error => {
    console.error('Error adding movie:', error);
    alert('There was a problem adding the movie.');
  });
});

// Function to fetch and show random movie
function fetchRandomMovie() {
  fetch('/movies')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(movies => {
      if (movies.length === 0) {
        alert('No movies available.');
        return;
      }
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      const randomMovieDiv = document.getElementById('random-movie');
      randomMovieDiv.innerHTML = `<h2>${randomMovie.title}</h2>
                                  <p><strong>Genre:</strong> ${randomMovie.genre}</p>
                                  <p><strong>Director:</strong> ${randomMovie.director}</p>
                                  <p><strong>Year:</strong> ${randomMovie.year}</p>`;
      document.getElementById('random-movie-section').classList.remove('hidden');
      document.getElementById('menu').style.display = 'none'; // Hide menu
    })
    .catch(error => {
      console.error('Error fetching random movie:', error);
      alert(`Error fetching random movie: ${error.message}`);
    });
}

// Show the add movie section
document.getElementById('add-movie-menu').addEventListener('click', function() {
  document.getElementById('menu').style.display = 'none'; // Hide menu
  document.getElementById('add-movie-section').classList.remove('hidden'); // Show add movie form
});

// Show the random movie section
document.getElementById('random-movie-menu').addEventListener('click', function() {
  fetchRandomMovie(); // Fetch a random movie when the button is clicked
});

// Back to menu from add movie section
document.getElementById('back-to-menu-from-add').addEventListener('click', function() {
  document.getElementById('add-movie-section').classList.add('hidden');
  document.getElementById('menu').style.display = 'block'; // Return to menu
});

// Back to menu from random movie section
document.getElementById('back-to-menu-from-random').addEventListener('click', function() {
  document.getElementById('random-movie-section').classList.add('hidden');
  document.getElementById('menu').style.display = 'block'; // Return to menu
});
