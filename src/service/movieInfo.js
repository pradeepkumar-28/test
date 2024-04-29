import axios from "axios";
import { getLocalStorageData } from "../helper/helper";

export const getMovieInfo = async (id) => {
  const USER_INFO = getLocalStorageData("USER_INFO");
  const URL = `${USER_INFO.baseUrl}/player_api.php?username=${USER_INFO.username}&password=${USER_INFO.password}&action=get_vod_info&vod_id=${id}`;
  const resp = await axios.get(URL);
  return resp;
};

export const getMoviesCategory = async () => {
  const USER_INFO = getLocalStorageData("USER_INFO");
  const URL = `${USER_INFO.baseUrl}/player_api.php?username=${USER_INFO.username}&password=${USER_INFO.password}&action=get_vod_categories`;
  const resp = await axios.get(URL);
  return resp;
};
