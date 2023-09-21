import { createContext, useEffect, useState } from "react";

const initialState = {
  movieType: "popular",
};

const MovieContext = createContext({ ...initialState });
function MovieProvider({ children }) {
  const [movieTypeCtx, setMovieTypeCtx] = useState("popular");
  const [movieSearchCtx, setMovieSearchCtx] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        //TODO
        //get movieType...
      } catch (err) {
        console.error(err);
      }
    };
    initialize();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movieTypeCtx,
        setMovieTypeCtx,
        movieSearchCtx,
        setMovieSearchCtx,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
