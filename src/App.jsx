import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Preloader from './components/Preloader';
import MovieDetail from './components/MovieDetail';
import UniqueLiquidBackground from './components/UniqueLiquidBackground';
import Navbar from './components/Navbar';
import NavAvatar from './components/NavAvatar'; 

import Home from './pages/Home';
import Genres from './pages/Genres';
import Search from './pages/Search';
import Contact from './pages/Contact';
import Auth from './pages/Auth';               
import Profile from './pages/Profile';         

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Wrapper component to safely access hook variables within context router scopes
function AppContent({
  showLoader, setShowLoader, searchQuery, setSearchQuery,
  trendingMovies, searchResults, selectedMovie, setSelectedMovie,
  isLoadingFeeds, activeGenreLabel, fetchGenreSector
}) {
  const location = useLocation();
  const isContact = location.pathname === '/contact';

  // CLEAN SLATE CORE DYNAMIC AGGREGATORS
  const [continueWatching, setContinueWatching] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [watchedHistory, setWatchedHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Live wrapper to push clicks into runtime pools
  const handlePlayMovie = (movie) => {
    setSelectedMovie(movie);
    
    // Add to continue watching pool at 0% default progress
    setContinueWatching(prev => {
      if (prev.find(m => m.id === movie.id)) return prev;
      return [{ 
        id: movie.id, 
        title: movie.title, 
        progress: 0, 
        year: movie.year, 
        tag: activeGenreLabel || "FEATURED" 
      }, ...prev];
    });

    // Append to watched history tracking stack
    setWatchedHistory(prev => {
      if (prev.find(m => m.id === movie.id)) return prev;
      return [{ id: movie.id, title: movie.title, watchedAt: "JUST NOW" }, ...prev];
    });
  };

  // Reusable prop handler passed to dashboard toggles or feed nodes
  const toggleWishlist = (movie) => {
    setWishlist(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev.filter(m => m.id !== movie.id);
      return [...prev, { ...movie, tag: activeGenreLabel || "FEATURED" }];
    });
  };

  // Dedicated handler to capture runtime core selections for favorites
  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev.filter(m => m.id !== movie.id);
      return [...prev, { ...movie, tag: activeGenreLabel || "FEATURED" }];
    });
  };

  return (
    <div className={`min-h-screen bg-[#020204] text-white relative overflow-x-hidden ${
      isContact ? 'selection:bg-amber-500/30 selection:text-amber-200' : 'selection:bg-emerald-500/30 selection:text-emerald-200'
    } pl-0 md:pl-20`}>
      
      <UniqueLiquidBackground />
      <Navbar />
      <NavAvatar />

      {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}
      
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <div className={`px-6 md:px-12 max-w-6xl mx-auto w-full space-y-16 pb-20 pt-12 relative z-10 transition-all duration-700 ${
        !showLoader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                movies={trendingMovies} 
                setSelectedMovie={handlePlayMovie} 
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            } 
          />
          <Route path="/genres" element={<Genres onSelectGenre={fetchGenreSector} />} />
          <Route path="/search" element={
            <Search 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              movies={searchResults}
              setSelectedMovie={handlePlayMovie}
              isLoadingFeeds={isLoadingFeeds}
              activeSectorLabel={activeGenreLabel}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/contact" element={<Contact onAddRequest={toggleWishlist} />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/profile" 
            element={
              <Profile 
                continueWatching={continueWatching}
                wishlist={wishlist}
                watchedHistory={watchedHistory}
                favorites={favorites}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [activeGenreLabel, setActiveGenreLabel] = useState("");

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
            color: "from-emerald-500/20 via-purple-600/5 to-transparent"
          }));
          setTrendingMovies(formatted);
          setSearchResults(formatted);
        }
      } catch (err) {
        console.error("Failed connecting to TMDB matrix:", err);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      if (trendingMovies.length > 0) setSearchResults(trendingMovies);
      return;
    }
    setActiveGenreLabel(""); 
    
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
            color: "from-zinc-500/20 via-slate-600/5 to-transparent"
          }));
          setSearchResults(searched);
        }
      } catch (err) {
        console.error("Failed querying live search stream:", err);
      } finally {
        setIsLoadingFeeds(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, trendingMovies]);

  const fetchGenreSector = async (genreId, label) => {
    if (!TMDB_API_KEY) return;
    setIsLoadingFeeds(true);
    setActiveGenreLabel(label);
    setSearchQuery(""); 
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
          color: "from-purple-500/20 via-emerald-600/5 to-transparent"
        }));
        setSearchResults(genreMovies);
      }
    } catch (err) {
      console.error("Failed executing genre parameter query:", err);
    } finally {
      setIsLoadingFeeds(false);
    }
  };

  return (
    <Router>
      <AppContent 
        showLoader={showLoader}
        setShowLoader={setShowLoader}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        trendingMovies={trendingMovies}
        searchResults={searchResults}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        isLoadingFeeds={isLoadingFeeds}
        activeGenreLabel={activeGenreLabel}
        fetchGenreSector={fetchGenreSector}
      />
    </Router>
  );
}