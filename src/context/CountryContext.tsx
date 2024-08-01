/* eslint-disable react-refresh/only-export-components */
// src/context/CountryContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CountryContextProps {
  country: string;
  setCountry: (country: string) => void;
}

const CountryContext = createContext<CountryContextProps | undefined>(
  undefined
);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [country, setCountry] = useState<string>(() => {
    return localStorage.getItem("selectedCountry") ?? "AE";
  });

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setCountry(savedCountry);
    }
  }, []);

  const handleSetCountry = (newCountry: string) => {
    setCountry(newCountry);
    localStorage.setItem("selectedCountry", newCountry);
  };

  return (
    <CountryContext.Provider value={{ country, setCountry: handleSetCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};
