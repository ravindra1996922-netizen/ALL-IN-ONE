import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

// custom hook
export const useTheme = () => useContext(ThemeContext);

// provider (IMPORTANT: Capital letter)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};