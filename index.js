// 

const form = document.querySelector("form");
const movieInfo = document.getElementById("movie-info");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = event.target.elements[0].value;
  const url = `https://www.omdbapi.com/?s=${query}&apikey=59c89865`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      movieInfo.innerHTML = "";

      data.Search.forEach((movie) => {
        const element = document.createElement("div");
        element.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <h2>${movie.Title}</h2>
          <p>Year: ${movie.Year}</p>
          <p>Type: ${movie.Type}</p>
        `;
        movieInfo.appendChild(element);
      });
    } else {
      movieInfo.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    console.error(error);
  }
});
