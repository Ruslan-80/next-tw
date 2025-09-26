"use client";

import { createContext, useState, useEffect, useContext } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Загрузка избранного из localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    if (favorites.some((item) => item.id === product.id)) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
