import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import {
  BsFillStopCircleFill,
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
} from "react-icons/bs";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import { InboxRecorderControls } from "@/lib/types/types";

const InboxRecordAudio: React.FC<{
  setRecorderControls?: Dispatch<SetStateAction<InboxRecorderControls>>;
  formHandler?: (value: string | Blob) => void;
  className?: string;
}> = ({ setRecorderControls, formHandler, className }) => {
  const [displayVoiceRecorder, setDisplayVoiceRecorder] = React.useState(false);
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error, isRecordingInProgress } = recorderControls;
  const { theme } = useModeSwitch("red", "#fff");

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;

    formHandler(recordedBlob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordedBlob, error]);

  useEffect(() => {
    if (!error) return;
  }, [error]);

  useEffect(() => {
    setRecorderControls && setRecorderControls(recorderControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecordingInProgress]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (className) {
        setDisplayVoiceRecorder(false);
      } else {
        setDisplayVoiceRecorder(true);
      }
    }, 1);

    return () => clearTimeout(timeoutId);
  }, [className]);

  return (
    <div className={`${className} w-10/12`}>
      <div className="flex items-center gap-2">
        {recorderControls.isPausedRecording ? (
          <BsFillPlayCircleFill
            onClick={() => {
              recorderControls.togglePauseResume();
            }}
            className="cursor-pointer text-2xl text-gray-500 dark:text-white md:text-3xl"
          />
        ) : (
          <BsFillPauseCircleFill
            onClick={() => {
              recorderControls.togglePauseResume();
            }}
            className="cursor-pointer text-2xl text-gray-500 dark:text-white md:text-3xl"
          />
        )}
        <BsFillStopCircleFill
          onClick={() => {
            recorderControls.clearCanvas();
            recorderControls.stopRecording();
          }}
          className="cursor-pointer text-2xl text-gray-500 dark:text-white md:text-3xl"
        />
        {displayVoiceRecorder && (
          <VoiceVisualizer
            isDefaultUIShown={false}
            controls={recorderControls}
            isControlPanelShown={false}
            isAudioProcessingTextShown={false}
            mainContainerClassName="w-10/12"
            height={40}
            barWidth={4}
            speed={1}
            mainBarColor={theme === "light" ? "#000" : "#fff"}
          />
        )}
        <span className="hidden text-xs md:block">
          {recorderControls.formattedRecordingTime}
        </span>
      </div>
    </div>
  );
};
export default InboxRecordAudio;
