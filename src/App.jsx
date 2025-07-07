import MovieDetails from "./components/MovieDetails";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMovies from "./components/allmovies/AllMovies";
import FeaturedMovies from "./components/featured/FeaturedMovies";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import UpComingMovies from "./components/upcoming/UpComingMovies";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/featured" element={<FeaturedMovies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upcoming" element={<UpComingMovies />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
