import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextHandler = ({ children, values }) => {
  const [theme, setTheme] = useState("light"); // <LIGHT || DARK>
  const data = { theme, setTheme, ...values };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body").classList.remove("light");
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.add("light");
      document.querySelector("body").classList.remove("dark");
    }
  }, [theme]);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default ContextHandler;
