import { useEffect, useState } from "react";
import { Modal, Box, Button, Grid, Typography } from "@mui/material";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import { useSelector } from "react-redux";
import { getLocalStorageData } from "../helper/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",

  bgcolor: "#00031c",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3,
};

function MovieDetail() {
  const { movieDetail } = useSelector((state) => state.moviesReducer) || {};
  const { TMDBData } = useSelector((state) => state.moviesReducer) || [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    if (movieDetail) {
      const USER_INFO = getLocalStorageData("USER_INFO");
      const URL = `${USER_INFO.baseUrl}/movie/${USER_INFO.username}/${USER_INFO.password}/${movieDetail?.movie_data?.stream_id}.${movieDetail?.movie_data?.container_extension}`;
      setVideoSrc(URL);
    }
  }, [movieDetail]);

  function convertMinutesToTimeString(minutes) {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    // Format the time string
    const timeString = `${hours}h : ${remainingMinutes} Mins`;

    return timeString;
  }

  return (
    <Box
      className="home_Container movie_container"
      style={{
        backgroundImage: TMDBData?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${TMDBData?.backdrop_path})`
          : `url(${movieDetail?.info?.cover_big})`,
      }}
    >
      <Box className="Movie-info-container">
        <Grid container height="100%">
          <Grid item xs={3} className="left_Action">
            <Box className="Movie_info-Box">
              <Box className="Movie_card">
                <img
                  src={
                    TMDBData?.poster_path
                      ? `https://image.tmdb.org/t/p/original/${TMDBData?.poster_path}`
                      : movieDetail?.info?.movie_image
                  }
                  alt="movie_poster"
                  className="movie_poster"
                />
              </Box>
              <Button className="watch-btn" onClick={handleOpen}>
                Watch Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={8} className="right_Action">
            <Box className="Movie-content">
              <Typography className="movie_title">
                {TMDBData?.title
                  ? TMDBData?.title
                  : movieDetail?.movie_data?.name}
              </Typography>
              <Typography className="movie_Tagline">
                {TMDBData?.tagline}
              </Typography>

              <Box className="genre_box">
                {TMDBData?.genres?.map((item) => {
                  return (
                    <Typography key={item.id} component="p">
                      {item.name}
                    </Typography>
                  );
                })}
              </Box>

              <Box className="movie-info">
                <Typography component="p">{TMDBData?.release_date}</Typography>
                <Typography component="p">
                  {convertMinutesToTimeString(
                    TMDBData?.runtime
                      ? TMDBData?.runtime
                      : movieDetail?.info?.runtime
                  )}
                </Typography>
              </Box>
              <Typography className="desc">{TMDBData?.overview}</Typography>
              {TMDBData?.production_companies && (
                <Box className="production_box">
                  <Typography className="production-title">
                    Production Companies :{" "}
                  </Typography>
                  {TMDBData?.production_companies?.map((item) => {
                    return (
                      <Typography key={item.id} className="title">
                        {item?.name}
                      </Typography>
                    );
                  })}
                </Box>
              )}

              {movieDetail?.info?.cast && (
                <Typography className="movie-cast">
                  Cast: <span>{movieDetail?.info?.cast}</span>
                </Typography>
              )}
              <Typography className="movie-cast">
                Rating:{" "}
                <span>{`${
                  movieDetail?.info?.rating ? movieDetail?.info?.rating : "0"
                } / 10`}</span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="video-container" sx={style}>
            {videoSrc && (
              <MediaPlayer
                title={movieDetail?.movie_data?.name}
                src={{
                  src: videoSrc,
                  type: "video/mp4",
                  onError(e) {
                    console.log("tenta", e);
                  },
                }}
                autoPlay
                className="video-player"
                onError={(error) => console.error("Video Error:", error)}
              >
                <MediaProvider />
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            )}
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default MovieDetail;
