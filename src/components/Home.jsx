import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router";

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const allMoviesURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=cd8d258de880a82d62119c0bbcfef5c3";

  const featureMoviesURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=cd8d258de880a82d62119c0bbcfef5c3";

  const upcomingMoviesURL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=cd8d258de880a82d62119c0bbcfef5c3";
  const getMovies = () => {
    fetch(allMoviesURL)
      .then((res) => res.json())
      .then((json) => setMoviesList(json.results))
      .catch((error) => console.log(error));

    fetch(featureMoviesURL)
      .then((res) => res.json())
      .then((json) => setFeaturedMovies(json.results.slice(0, 4) || []))
      .catch((error) => console.log(error));

    fetch(upcomingMoviesURL)
      .then((res) => res.json())
      .then((json) => setUpcomingMovies(json.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMovies();
  }, []);
  console.log(moviesList);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const upcomingMoviesResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          All Movies
        </Typography>
        <Carousel autoPlay responsive={responsive} infinite={true}>
          {moviesList.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              style={{ textDecoration: "none" }}
            >
              <Card key={movie.id} sx={{ margin: "1rem" }}>
                <CardMedia
                  component="img"
                  sx={{ height: 300 }}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography noWrap variant="h6" component="div">
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Carousel>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Link to={"/movies"}>
            <Button variant="contained">See All</Button>
          </Link>
        </div>

        <Typography variant="h4" gutterBottom>
          Featured Films
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {featuredMovies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ marginTop: "1rem" }}>
                <CardMedia
                  component="img"
                  sx={{ height: 300 }}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />

                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Link to={"/featured"}>
            <Button variant="contained">See All</Button>
          </Link>
        </div>

        <Typography variant="h4" gutterBottom>
          Upcoming Films
        </Typography>
        <Carousel
          autoPlay
          responsive={upcomingMoviesResponsive}
          infinite={true}
        >
          {upcomingMovies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                sx={{ height: 600 }}
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={{
                  margin: "1rem auto",
                  borderRadius: "8px",
                  maxWidth: "100%",
                  objectFit: "cover",
                  marginBottom: "4rem",
                }}
              />
            </Link>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

export default MoviesList;
