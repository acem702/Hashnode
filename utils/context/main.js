import { createContext, useEffect, useRef, useState } from "react";

export const Context = createContext();

const ContextHandler = ({ children, values }) => {
  const [theme, setTheme] = useState("dark"); // <LIGHT || DARK>
  const searchInput = useRef(null);
  const [toast, setToast] = useState({
    status: false,
    msg: "",
    type: "", // success, info, error, warning
  });

  useEffect(() => {
    if (toast.status) {
      setTimeout(
        () =>
          setToast({
            status: false,
            msg: "",
            type: "",
          }),
        1500
      );
    }
  }, [toast]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const themeValue = localStorage.getItem("theme") || "dark";
    setTheme(themeValue);

    if (searchInput.current) {
      window.addEventListener("keydown", (e) => {
        if (
          document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA"
        ) {
          return;
        } else {
          if (e.key === "/") {
            e.preventDefault();
            searchInput.current.focus();
          }
        }
      });

      return () => {
        window.removeEventListener("keydown", () => {});
      };
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body").classList.remove("light");
      document.querySelector("body").classList.add("dark");
      localStorage.setItem("theme", theme);
    } else {
      document.querySelector("body").classList.add("light");
      document.querySelector("body").classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const data = {
    theme,
    setTheme,
    searchInput,
    toast,
    setToast,
    user,
    setUser,
    ...values,
  };

  return (
    <Context.Provider value={data}>
      {children}

      {toast.status && (
        <div
          className={`fixed top-10 flex gap-2 items-center right-10 p-4 ${
            toast.type === "success"
              ? "bg-success"
              : toast.type === "info"
              ? "bg-info"
              : toast.type === "warning"
              ? "bg-warning"
              : toast.type === "error" && "bg-error"
          } rounded-lg z-50 w-72 animate-alert`}
        >
          <span>
            {toast.type === "success" ? (
              <i class="uil uil-check-circle text-white text-2xl" />
            ) : toast.type === "error" ? (
              <i class="uil uil-exclamation-octagon text-white text-2xl" />
            ) : toast.type === "info" ? (
              <i class="uil uil-info-circle text-white text-2xl" />
            ) : (
              toast.type === "warning" && (
                <i class="uil uil-exclamation-triangle text-white text-2xl" />
              )
            )}
          </span>
          <p className="text-white font-semibold">{toast.msg}</p>
        </div>
      )}
    </Context.Provider>
  );
};

export default ContextHandler;
