import React, { useEffect } from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

const InboxAudioMessage: React.FC<{ blob: Blob }> = ({ blob }) => {
  const recorderControls = useVoiceVisualizer();
  const { setPreloadedAudioBlob } = recorderControls;

  useEffect(() => {
    setPreloadedAudioBlob(blob);
  }, [blob]);

  return (
    <div className="flex w-full items-center justify-around gap-2">
      {recorderControls.isPausedRecordedAudio ? (
        <BsFillPlayCircleFill
          onClick={() => {
            recorderControls.togglePauseResume();
          }}
          className="cursor-pointer text-2xl text-white"
        />
      ) : (
        <BsFillPauseCircleFill
          onClick={() => {
            recorderControls.togglePauseResume();
          }}
          className="cursor-pointer text-2xl text-white"
        />
      )}
      <VoiceVisualizer
        isDefaultUIShown={false}
        controls={recorderControls}
        isControlPanelShown={false}
        mainContainerClassName="w-10/12 md:w-full"
        isAudioProcessingTextShown={false}
        height={40}
        barWidth={4}
      />
    </div>
  );
};
export default InboxAudioMessage;
