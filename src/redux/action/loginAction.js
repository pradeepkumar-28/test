import axios from "axios";

export const userXstreamCodeLogin =
  ({ url }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(url);
      dispatch({
        type: "USER_XSTREAM_LOGIN_SUCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      console.log();
    }
  };

// export const addxStreamPlaylist = async (xStreamPlaylistURL, data) => {
//   try {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     const response = await axios.post(xStreamPlaylistURL, formData);
//     return response.data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };
