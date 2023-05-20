import { apiKey } from "./environment/key.js";

const moviesContainer = document.querySelector(".movies-container");
//selecionando o primeiro elemento no DOM que possui a classe CSS "movies-container" e armazenando-o na variável moviesContainer.
const input = document.querySelector("input");
const searchButton = document.querySelector(".search-icon");


//adicionando evento ao clicar no icone
searchButton.addEventListener('click', searchMovies);

//adicionando evento ao input com enter
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchMovies();
    return
  }
});


//requisição passando o valor do input
async function searchMovies(){
  const inputValue = input.value;
  if(inputValue != ''){
    clearMovies();
    const movies = await searchMovieByName(inputValue);
    movies.forEach(movie => createMovieCard(movie));
    
  }
}

function clearMovies(){
  moviesContainer.innerHTML = '';
}

//requisicao de pesquisa com o titulo
async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1`;
  const searchResponse = await fetch(url);
  const { results } = await searchResponse.json();
  return results;
}

async function getMoviesAPI() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const fetchResponse = await fetch(url);
  //O Fetch é uma API usada para fazer requisição HTTP antiva do JS
  const { results } = await fetchResponse.json();
  return results;
}

// lista dde objetos movie
window.onload = async function () {
  const movies = await getMoviesAPI();
  console.log(movies);
  movies.forEach((movie) => createMovieCard(movie));
};

function createMovieCard(movie) {
  const { title, poster_path, vote_average, release_date, overview } = movie;
  const isFavorited = false;

  const year = new Date(release_date).getFullYear();
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const cardMovie = document.createElement("div");
  cardMovie.classList.add("card-movie");
  moviesContainer.appendChild(cardMovie);

  const movieInfos = document.createElement("div");
  movieInfos.classList.add("movie-infos");

  const movieThumbContainer = document.createElement("div");
  movieThumbContainer.classList.add("movie-thumb");
  const thumbImage = document.createElement("img");
  thumbImage.src = image;
  thumbImage.alt = `${title} Poster`;
  movieThumbContainer.appendChild(thumbImage);
  cardMovie.appendChild(movieThumbContainer);

  const mainInfos = document.createElement("div");
  mainInfos.classList.add("main-infos");
  const movieTitle = document.createElement("p");
  movieTitle.textContent = `${title} (${year})`;
  movieTitle.classList.add("movie-title");
  mainInfos.appendChild(movieTitle);

  const actionsCard = document.createElement("div");
  actionsCard.classList.add("actions-card");
  mainInfos.appendChild(actionsCard);
  cardMovie.appendChild(mainInfos);

  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("ratting-movie");
  const ratingIcon = document.createElement("img");
  ratingIcon.src = "/Assets/ratting-icon.svg";
  ratingIcon.alt = "Rating Star Icon";
  const ratingValue = document.createElement("p");
  ratingValue.classList.add("rating-value");
  ratingValue.textContent = vote_average;
  actionsCard.appendChild(ratingContainer);
  ratingContainer.appendChild(ratingIcon);
  ratingContainer.appendChild(ratingValue);

  const favoriteMovie = document.createElement("div");
  favoriteMovie.classList.add("favorite-Movie");
  const favoriteIcon = document.createElement("img");
  favoriteIcon.src = isFavorited
    ? "/Assets/favorite-icon.svg"
    : "/Assets/favorite-icon-filled.svg";
  favoriteIcon.alt = "Favorited Heart Icon";
  favoriteIcon.classList.add("favorite-icon");

  const favoriteLabel = document.createElement("p");
  favoriteLabel.classList.add("favorite-label");
  favoriteLabel.textContent = "Favoritar";

  favoriteMovie.appendChild(favoriteIcon);
  favoriteMovie.appendChild(favoriteLabel);
  actionsCard.appendChild(favoriteMovie);

  const movieDescriptionContainer = document.createElement("div");
  movieDescriptionContainer.classList.add("movie-description");
  const descriptionText = document.createElement("p");
  descriptionText.textContent = overview;
  movieDescriptionContainer.appendChild(descriptionText);
  cardMovie.appendChild(movieDescriptionContainer);
}
