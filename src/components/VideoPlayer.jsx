import React from "react";
import { Box } from "@mui/material";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

function VideoPlayer({ videoSrc, selectedMovieData, onExitFullScreenHandler }) {
  function onFullscreenChange(isFullscreen, nativeEvent) {
    if (isFullscreen) {
      onExitFullScreenHandler();
    }
    // const requestEvent = nativeEvent.request;
    // console.log("requestEvent", requestEvent, isFullscreen, nativeEvent);
  }
  return (
    <Box className="bg-video-container">
      <MediaPlayer
        title="Sprite Fight"
        src={videoSrc}
        autoPlay
        // muted={isMuted} // Set muted state
        className="video-player"
        poster={selectedMovieData?.info?.backdrop_path}
        // Event handler to set isVideoPlaying state to true when video starts playing

        onError={(error) => console.log("tenta", error)}
        onFullscreenChange={onFullscreenChange}
      >
        <MediaProvider />
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </Box>
  );
}

export default VideoPlayer;
