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
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router";

const AllMovies = () => {
  const [moviesList, setMoviesList] = useState([]);

  const allMoviesURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=cd8d258de880a82d62119c0bbcfef5c3";

  const getMovies = () => {
    fetch(allMoviesURL)
      .then((res) => res.json())
      .then((json) => setMoviesList(json.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMovies();
  }, []);
  console.log(moviesList);

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          All Movies
        </Typography>

        <Grid container spacing={3}>
          {moviesList.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card key={movie.id} sx={{ margin: "1rem" }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 300 }}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AllMovies;
