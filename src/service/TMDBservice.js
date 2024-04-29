import axios from "axios";

export const getTMDBdetail = async (id) => {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=b1efd75bdbe9985fb017bf5c683a0a69`
  );
  return resp;
};
