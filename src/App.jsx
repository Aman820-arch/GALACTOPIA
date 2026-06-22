import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Preloader from './components/Preloader';
import MovieDetail from './components/MovieDetail';
import UniqueLiquidBackground from './components/UniqueLiquidBackground';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Genres from './pages/Genres';
import Search from './pages/Search';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [activeGenreLabel, setActiveGenreLabel] = useState("");

  // Base Trigger: Mount trending records on baseline home load
  useEffect(() => {
    const fetchTrending = async () => {
      if (!TMDB_API_KEY) return;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        if (data.results) {
          const formatted = data.results.map(m => ({
            id: m.id,
            title: m.title,
            tags: m.vote_average ? `★ ${m.vote_average.toFixed(1)}` : '0.0',
            year: m.release_date ? m.release_date.split('-')[0] : 'N/A',
            rating: m.vote_average ? m.vote_average.toFixed(1) : '0.0',
            overview: m.overview,
            poster: m.backdrop_path ? `https://image.tmdb.org/t/p/w500${m.backdrop_path}` : null,
            color: "from-amber-500/20 via-purple-600/5 to-transparent"
          }));
          setMovies(formatted);
        }
      } catch (err) {
        console.error("Failed connecting to TMDB matrix:", err);
      }
    };
    fetchTrending();
  }, []);

  // Live Mutation Core: Tracks characters keyed inside the Search page
  useEffect(() => {
    if (!searchQuery.trim()) return;
    setActiveGenreLabel(""); // Reset explicit genre label if typing custom search criteria
    
    const delayDebounce = setTimeout(async () => {
      if (!TMDB_API_KEY) return;
      setIsLoadingFeeds(true);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.results) {
          const searched = data.results.map(m => ({
            id: m.id,
            title: m.title,
            tags: m.vote_average ? `★ ${m.vote_average.toFixed(1)}` : '0.0',
            year: m.release_date ? m.release_date.split('-')[0] : 'N/A',
            rating: m.vote_average ? m.vote_average.toFixed(1) : '0.0',
            overview: m.overview,
            poster: m.backdrop_path ? `https://image.tmdb.org/t/p/w500${m.backdrop_path}` : null,
            color: "from-red-500/20 via-amber-600/5 to-transparent"
          }));
          setMovies(searched);
        }
      } catch (err) {
        console.error("Failed querying live search stream:", err);
      } finally {
        setIsLoadingFeeds(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Genre Filtering Hook: Pulls records filtered strictly by categorical genre IDs
  const fetchGenreSector = async (genreId, label) => {
    if (!TMDB_API_KEY) return;
    setIsLoadingFeeds(true);
    setActiveGenreLabel(label);
    setSearchQuery(""); // Wipe textual search state to cleanly isolate the selected category
    try {
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`);
      const data = await res.json();
      if (data.results) {
        const genreMovies = data.results.map(m => ({
          id: m.id,
          title: m.title,
          tags: m.vote_average ? `★ ${m.vote_average.toFixed(1)}` : '0.0',
          year: m.release_date ? m.release_date.split('-')[0] : 'N/A',
          rating: m.vote_average ? m.vote_average.toFixed(1) : '0.0',
          overview: m.overview,
          poster: m.backdrop_path ? `https://image.tmdb.org/t/p/w500${m.backdrop_path}` : null,
          color: "from-purple-500/20 via-amber-600/5 to-transparent"
        }));
        setMovies(genreMovies);
      }
    } catch (err) {
      console.error("Failed executing genre parameter query:", err);
    } finally {
      setIsLoadingFeeds(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#020204] text-white relative overflow-x-hidden selection:bg-amber-500/30 selection:text-white pl-0 md:pl-20">
        
        <UniqueLiquidBackground />
        <Navbar />

        {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}
        
        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}

        <div className={`px-6 md:px-12 max-w-6xl mx-auto w-full space-y-16 pb-20 pt-12 relative z-10 transition-all duration-700 ${
          !showLoader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          
          <Routes>
            <Route path="/" element={<Home movies={movies} setSelectedMovie={setSelectedMovie} />} />
            <Route path="/genres" element={<Genres onSelectGenre={fetchGenreSector} />} />
            <Route path="/search" element={
              <Search 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                movies={movies}
                setSelectedMovie={setSelectedMovie}
                isLoadingFeeds={isLoadingFeeds}
                activeSectorLabel={activeGenreLabel}
              />
            } />
          </Routes>

          <footer className="pt-6 border-t border-white/[0.03] text-[9px] text-zinc-600 tracking-wider flex justify-between">
            <div>© GALACTOPIA HUB</div>
            <div>POWERED BY TMDB ENGINE</div>
          </footer>
          
        </div>
      </div>
    </Router>
  );
}