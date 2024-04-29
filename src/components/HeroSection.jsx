import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { MediaPlayer, MediaProvider } from "@vidstack/react";

function HeroSection() {
  // State to manage the mute/unmute status of the video
  const [isMuted, setIsMuted] = useState(true);
  // State to track if the video is playing or not
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <Box className="Hero-section-container">
      <Box className="content">
        <Typography className="movie_genres">ACTION,CRIME</Typography>
        <Typography className="movie_title">JOHN WICK 4</Typography>
        <Box className="movie_info">
          <i className="fa-solid fa-star"></i>
          <Typography className="movie_info-text">8.2</Typography>
          <Typography className="movie_info-text">2023</Typography>
          <Typography className="movie_info-text">1h 45 Mins</Typography>
        </Box>
        <Typography className="movie-desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet qui
          consequatur delectus, officiis a eos molestias, tempora dicta
          molestiae illum ut! Explicabo labore architecto quae voluptas,
          obcaecati ad distinctio dolores?
        </Typography>
        <Button className="movie-info-btn">Play Now</Button>
      </Box>
      <Box className="bg-video-container">
        <MediaPlayer
          title="Sprite Fight"
          src="https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/728fa59bff4866b9aba6290b60ed0a63/downloads/default.mp4"
          autoPlay
          muted={isMuted} // Set muted state
          className="video-player"
          poster="https://streamvid.gavencreative.com/wp-content/uploads/2023/06/john-wap-ai.jpg"
          // Event handler to set isVideoPlaying state to true when video starts playing
          onPlay={() => setIsVideoPlaying(true)}
          // Event handler to set isVideoPlaying state to false when video pauses
          onPause={() => setIsVideoPlaying(false)}
        >
          <MediaProvider />
        </MediaPlayer>
        {/* Show poster when video is not playing */}
        {!isVideoPlaying && (
          <Box className="video-poster">
            {" "}
            <img
              src="https://streamvid.gavencreative.com/wp-content/uploads/2023/06/john-wap-ai.jpg"
              alt="Poster"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        )}
      </Box>
      {/* Button to toggle mute/unmute */}
      {isVideoPlaying && (
        <IconButton onClick={() => setIsMuted(!isMuted)} className="mute-btn">
          {isMuted ? (
            <i
              className="fa-solid fa-volume-xmark muteIcon"
              style={{ color: "#fff", opacity: "0.5", fontSize: "14px" }}
            ></i>
          ) : (
            <i
              className="fa-solid fa-volume-high muteIcon"
              style={{ color: "#fff", opacity: "0.5", fontSize: "14px" }}
            ></i>
          )}
        </IconButton>
      )}
    </Box>
  );
}

export default HeroSection;
