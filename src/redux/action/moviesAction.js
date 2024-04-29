export const allMoviesData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "ALL_MOVIES_DATA",
      payload: data,
    });
  };
};

export const getMovieDetail = (data) => {
  return (dispatch) => {
    dispatch({
      type: "GET_MOVIE_DETAIL",
      payload: data,
    });
  };
};

export const getAllMoviesCategory = (data) => {
  return (dispatch) => {
    dispatch({
      type: "GET_MOVIE_CATEGORY",
      payload: data,
    });
  };
};

export const getTMDBDetails = (data) => {
  return (dispatch) => {
    dispatch({
      type: "GET_TMDB_DATA",
      payload: data,
    });
  };
};


export const clearTMDBData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_TMDB_DATA",
      payload: data,
    });
  };
};
