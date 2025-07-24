import { Box, CardMedia, Container, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Rating from "@mui/material/Rating";

const MovieDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [movie, setMovie] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=cd8d258de880a82d62119c0bbcfef5c3`;

  useEffect(() => {
    fetch(movieDetailsURL)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMovie(json);
      })
      .catch((error) => console.log(error));
    // .finally(() => setIsLoading(false));
  }, [id]);

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  return (
    // {isLoading ?
    //   <Skeleton variant="rectangular" width={600} height={300}/>
    //   :

    // }
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 600 }}
          image={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "fallback-image-url"
          }
          alt={movie?.title}
        />
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Title: {movie?.title}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: "1.2rem", color: "#555", lineHeight: 1.8 }}
          >
            Overview: {movie?.overview}
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "600", marginBottom: "1rem" }}
          >
            Releasedate: {movie?.release_date}
          </Typography>

          {movie?.genres ? (
            <Typography variant="body1" gutterBottom sx={{ fontWeight: "600" }}>
              Type: {movie.genres.map((genre) => genre.name).join(", ")}
            </Typography>
          ) : null}
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Typography variant="h6" sx={{ marginRight: "1rem" }}>
              Rating:
            </Typography>

            <Rating value={movie?.vote_average / 2} precision={0.5} readOnly />

            <Typography variant="body2" style={{ marginRight: "1rem" }}>
              ({movie?.vote_count})
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MovieDetails;
