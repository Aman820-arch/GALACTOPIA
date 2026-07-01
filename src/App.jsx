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
import Admin from './pages/Admin';

import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getWatchlist,
  addWatchlist,
  removeWatchlist,
  getContinueWatching,
  saveContinueWatching,
  getHistory,
  saveHistory
} from "./api/api";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function AppContent() {
  const location = useLocation();
  const isContact = location.pathname === '/contact';
  const isProfile = location.pathname === '/profile';

  // GLOBAL STATE HUBS MOVED INSIDE APPCONTENT FOR PERFECT ROUTE SCOPING
  const [showLoader, setShowLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [activeGenreLabel, setActiveGenreLabel] = useState("");

  // INITIALIZE CORES WITH BULLETPROOF ERROR-CATCHING SAFETY NETS
  const [continueWatching, setContinueWatching] = useState(() => {
    try {
      const saved = localStorage.getItem('continueWatching');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Corrupt continueWatching storage wiped:", err);
      return [];
    }
  });

  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('watchlist');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Corrupt watchlist storage wiped:", err);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Corrupt wishlist storage wiped:", err);
      return [];
    }
  });

  const [watchedHistory, setWatchedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('watchedHistory');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Corrupt watchedHistory storage wiped:", err);
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Corrupt favorites storage wiped:", err);
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const updateUser = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener("userChanged", updateUser);

    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  // DATA SYNC HOOKS FOR LIVE MOVIE DISCOVERY DATA STREAMS
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

  // BACKGROUND SYNC HOOK FOR CONTINUOUS ENGINE LOGGING
  useEffect(() => {
    try {
      localStorage.setItem('continueWatching', JSON.stringify(continueWatching));
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      localStorage.setItem('watchedHistory', JSON.stringify(watchedHistory));
    } catch (err) {
      console.error("Failed saving application state changes to local storage:", err);
    }
  }, [continueWatching, wishlist, watchedHistory]);

  useEffect(() => {
    const loadFavorites = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      try {
        const data = await getFavorites(user.email);
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadFavorites();
  }, [user]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      try {
        const data = await getWatchlist(user.email);
        setWatchlist(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadWatchlist();
  }, [user]);

  useEffect(() => {
    const loadContinueWatching = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      try {
        const data = await getContinueWatching(user.email);

        console.log("Continue Watching API:", data);
        console.log("Is Array:", Array.isArray(data));

        setContinueWatching(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    loadContinueWatching();
  }, [user]);

  useEffect(() => {
    const loadHistory = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      try {
        const data = await getHistory(user.email);
        setWatchedHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
  }, [user]);

  const handlePlayMovie = async (movie) => {
    setSelectedMovie(movie);

    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);

      const exists = continueWatching.find(
        (m) => (m.movie_id ?? m.id) === movie.id
      );

      if (!exists) {
        const continueMovie = {
          movie_id: movie.id,
          title: movie.title,
          poster: movie.poster,
          year: movie.year,
          progress: 0,
          tag: activeGenreLabel || "FEATURED",
          email: user.email
        };

        await saveContinueWatching(continueMovie);

        setContinueWatching(prev => [continueMovie, ...prev]);
      }
    }

    const userString2 = localStorage.getItem("user");

    if (userString2) {
      const user = JSON.parse(userString2);

      const exists = watchedHistory.find(
        (m) => (m.movie_id ?? m.id) === movie.id
      );

      if (!exists) {
        const historyMovie = {
          movie_id: movie.id,
          title: movie.title,
          watchedAt: "JUST NOW",
          email: user.email
        };

        await saveHistory(historyMovie);

        setWatchedHistory(prev => [historyMovie, ...prev]);
      }
    }
  };

  const toggleWatchlist = async (movie) => {

    const userString = localStorage.getItem("user");

    if (!userString) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(userString);

    const exists = watchlist.find(
      (w) => (w.movie_id ?? w.id) === movie.id
    );

    if (exists) {

      const response = await removeWatchlist(
        user.email,
        movie.id
      );

      if (response.success) {
        setWatchlist(prev =>
          prev.filter(
            w => (w.movie_id ?? w.id) !== movie.id
          )
        );
      }

      return;
    }

    const watchMovie = {
      movie_id: movie.id,
      title: movie.title,
      poster: movie.poster,
      year: movie.year,
      tag: activeGenreLabel || "FEATURED",
      email: user.email
    };

    const response = await addWatchlist(watchMovie);

    if (response.success) {
      setWatchlist(prev => [...prev, watchMovie]);
    }

  };

  const handleAddWishlistRequest = (customOrder) => {
    setWishlist(prev => [...prev, { ...customOrder, id: customOrder.id || Date.now() }]);
  };

  const toggleFavorite = async (movie) => {
    const userString = localStorage.getItem("user");

    if (!userString) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(userString);

    const exists = favorites.find(
      (f) => (f.movie_id ?? f.id) === movie.id
    );

    if (exists) {
      const response = await removeFavorite(user.email, movie.id);

      if (response.success) {
        setFavorites((prev) =>
          prev.filter((f) => (f.movie_id ?? f.id) !== movie.id)
        );
      }

      return;
    }

    const favoriteMovie = {
      movie_id: movie.id,
      title: movie.title,
      poster: movie.poster,
      year: movie.year,
      tag: activeGenreLabel || "FEATURED",
      email: user.email,
    };

    const response = await addFavorite(favoriteMovie);

    if (response.success) {
      setFavorites((prev) => [...prev, favoriteMovie]);
    }
  };

  // Dynamic assignment of text selection highlights based on route paths
  const getSelectionStyles = () => {
    if (isContact) return 'selection:bg-amber-500/30 selection:text-amber-200';
    if (isProfile) return 'selection:bg-zinc-500/30 selection:text-zinc-200';
    return 'selection:bg-emerald-500/30 selection:text-emerald-200';
  };

  return (
    <div className={`min-h-screen bg-[#020204] text-white relative overflow-x-hidden ${getSelectionStyles()} pl-0 md:pl-20`}>

      <UniqueLiquidBackground />
      <Navbar />
      <NavAvatar />

      {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          favorites={favorites}
          watchlist={watchlist}
          toggleFavorite={toggleFavorite}
          toggleWatchlist={toggleWatchlist}
        />
      )}

      <div className={`px-6 md:px-12 max-w-6xl mx-auto w-full space-y-16 pb-20 pt-12 relative z-10 transition-all duration-700 ${!showLoader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={trendingMovies}
                setSelectedMovie={handlePlayMovie}
                wishlist={watchlist}
                toggleWishlist={toggleWatchlist}
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
              wishlist={watchlist}
              toggleWishlist={toggleWatchlist}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/contact" element={<Contact onAddRequest={handleAddWishlistRequest} />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profile"
            element={
              <Profile
                continueWatching={continueWatching}
                watchlist={watchlist}
                wishlist={wishlist}
                watchedHistory={watchedHistory}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                wishlist={wishlist}
                setWishlist={setWishlist}
                setTrendingMovies={setTrendingMovies}
                setSearchResults={setSearchResults}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}