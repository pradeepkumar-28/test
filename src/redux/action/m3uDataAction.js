import axios from "axios";

export const m3uPlaylistURL = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const m3uParseData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "M3U_PARSE_DATA",
      payload: data,
    });
  };
};
