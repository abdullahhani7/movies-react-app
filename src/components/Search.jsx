import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  console.log(searchParams);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const allMoviesURL =
        "https://api.themoviedb.org/3/discover/movie?api_key=cd8d258de880a82d62119c0bbcfef5c3";

      try {
        const res = await fetch(allMoviesURL);
        const data = await res.json();

        const filteredResults = data.results.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.log("error: ", error);
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
        <Typography variant="body1">search results for : {query}</Typography>

        {searchResults && (
          <Grid container spacing={3}>
            {searchResults.map((movie) => (
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
        )}
      </Container>
    </>
  );
};

export default Search;
