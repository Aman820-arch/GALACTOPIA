const API_URL = "http://127.0.0.1:8000";

// ---------------- AUTH ----------------

export async function register(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  return await res.json();
}

export async function login(userData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  return await res.json();
}

// ---------------- FAVORITES ----------------

export async function getFavorites(email) {
  const res = await fetch(`${API_URL}/favorites/${email}`);
  return await res.json();
}

export async function addFavorite(movie) {
  const res = await fetch(`${API_URL}/favorites/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movie)
  });

  return await res.json();
}

export async function removeFavorite(email, movieId) {
  const res = await fetch(
    `${API_URL}/favorites/remove/${email}/${movieId}`,
    {
      method: "DELETE"
    }
  );

  return await res.json();
}

// WATCHLIST

export async function getWatchlist(email) {
  const res = await fetch(`${API_URL}/watchlist/${email}`);
  return await res.json();
}

export async function addWatchlist(movie) {
  const res = await fetch(`${API_URL}/watchlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  return await res.json();
}

export async function removeWatchlist(email, movie_id) {
  const res = await fetch(
    `${API_URL}/watchlist/remove/${email}/${movie_id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
}

export async function getContinueWatching(email) {
  const res = await fetch(`${API_URL}/continue/${email}`);
  return await res.json();
}

export async function saveContinueWatching(movie) {
  const res = await fetch(`${API_URL}/continue/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  return await res.json();
}

// HISTORY

export async function getHistory(email) {
  const res = await fetch(`${API_URL}/history/${email}`);
  return await res.json();
}

export async function saveHistory(movie) {
  const res = await fetch(`${API_URL}/history/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  return await res.json();
}