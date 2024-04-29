import React, { useEffect, useRef } from "react";
import videojs from "video.js";

const VideoJsPlayer = (props) => {
  const videoRef = useRef(null);
  const { options, onReady, playerRef } = props;

  console.log("options", options);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src({
        src: options?.sources?.[0]?.src,
        type: options?.sources?.[0]?.type,
      });
    }
  }, [options.sources?.[0]?.src, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    const handlePlay = () => {
      console.log("Player started playing");

      // Add your logic here for handling the 'play' event
    };

    const handleDispose = () => {
      player.off("play", handlePlay); // Remove event listener when disposing the player
    };

    player.on("play", handlePlay);
    player.on("error", () => {}); // Add event listener for 'dispose' event

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
      <div className="videoplayer" ref={videoRef} />
    </>
  );
};

export default React.memo(VideoJsPlayer);
