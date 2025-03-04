import { useEffect, useRef, useState, useContext } from 'react';
import { AudioContext, StyledComponents } from '../App';

function AudioProgress() {
  const { audioElement } = useContext(AudioContext);
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!audioElement) return;

    const updateProgress = () => {
      const value = (audioElement.currentTime / audioElement.duration) * 100;
      setProgress(isNaN(value) ? 0 : value);
    };

    audioElement.addEventListener('timeupdate', updateProgress);
    return () => audioElement.removeEventListener('timeupdate', updateProgress);
  }, [audioElement]);

  const handleProgressClick = (e) => {
    if (!audioElement) return;
    const bounds = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    audioElement.currentTime = percent * audioElement.duration;
  };

  return (
    <StyledComponents.ProgressBar ref={progressBarRef} onClick={handleProgressClick}>
      <StyledComponents.Progress width={progress} />
    </StyledComponents.ProgressBar>
  );
}

export default AudioProgress;
