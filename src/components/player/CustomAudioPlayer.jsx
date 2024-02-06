import React from "react";
// npm
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const CustomAudioPlayer = (props) => {
  const {
    file = "",
    handlePlay,
    handleClickPrevious,
    handleClickNext,
    currentIndex,
    id,
  } = props;
  return (
    <AudioPlayer
      autoPlay={false}
      src={file}
      onPlay={(e) => handlePlay()}
      layout="stacked-reverse"
      onClickPrevious={() => handleClickPrevious(currentIndex)}
      onClickNext={() => handleClickNext(currentIndex)}
      customAdditionalControls={[]}
      showSkipControls={true}
      showJumpControls={false}
      id={id}
      // other props here
    />
  );
};

export default CustomAudioPlayer;
