"use client";
import { createContext, useState, useEffect, useContext } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const storedItems = localStorage.getItem("compareItems");
    if (storedItems) {
      try {
        setCompareItems(JSON.parse(storedItems));
      } catch (e) {
        localStorage.removeItem("compareItems");
      }
    }
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product) => {
    if (compareItems.length >= 4) {
      alert("Максимум 4 товара для сравнения");
      return;
    }
    if (!compareItems.some((item) => item.id === product.id)) {
      setCompareItems([...compareItems, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareItems(compareItems.filter((item) => item.id !== productId));
  };

  return (
    <CompareContext.Provider
      value={{ compareItems, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
