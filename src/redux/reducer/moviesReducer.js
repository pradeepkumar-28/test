const initialState = {
  allMoviesData: [],
  movieDetail: {},
  moviesCategories: [],
  TMDBData: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_MOVIES_DATA":
      return {
        ...state,
        allMoviesData: action.payload,
      };
    case "GET_MOVIE_CATEGORY":
      return {
        ...state,
        moviesCategories: action.payload,
      };
    case "GET_MOVIE_DETAIL":
      return {
        ...state,
        movieDetail: action.payload,
      };
    case "GET_TMDB_DATA":
      return {
        ...state,
        TMDBData: action.payload,
      };
    case "CLEAR_TMDB_DATA":
      return {
        ...state,
        TMDBData: [],
      };
    default:
      return state;
  }
};

export default moviesReducer;
