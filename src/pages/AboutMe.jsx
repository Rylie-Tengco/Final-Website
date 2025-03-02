import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import profilePicture from '../images/Profile Picture.jpeg';
import selfLoveMusic from '../music/Self Love.mp3';

const PageContainer = styled.div`
  max-width: min(1200px, 90vw);
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
`;

const Title = styled.h1`
  color: #1E3D59;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(2rem, 5vw, 2.5rem);
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3);
`;

const ContentSection = styled.section`
  background: rgba(255, 255, 255, 0.8);
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const ProfileContainer = styled.div`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2rem);
  align-items: start;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  grid-template-columns: minmax(150px, 200px) 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

const ProfileImage = styled.img`
  width: clamp(150px, 30vw, 200px);
  height: clamp(150px, 30vw, 200px);
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileInfo = styled.div`
  max-width: 65ch;
  margin: 0 auto;
`;

const Bio = styled.p`
  line-height: 1.6;
  color: #1A1B2F;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.9rem, 2vw, 1rem);
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const AudioPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(42, 157, 143, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
  width: 100%;
`;

const PlayButton = styled.button`
  background: #2A9D8F;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1A1B2F;
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(26, 27, 47, 0.2);
  border-radius: 2px;
  position: relative;
  cursor: pointer;

  &:hover {
    height: 6px;
  }
`;

const Progress = styled.div`
  height: 100%;
  background: #2A9D8F;
  border-radius: 2px;
  width: ${props => props.width}%;
`;

const VolumeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const VolumeButton = styled.button`
  background: transparent;
  color: #2A9D8F;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1A1B2F;
  }
`;

const VolumeSlider = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 36px;
  height: 100px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;

  input[type="range"] {
    writing-mode: bt-lr;
    -webkit-appearance: slider-vertical;
    width: 8px;
    height: 80px;
    background: #2A9D8F;
    outline: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      background: #1A1B2F;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function AboutMe() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(value) ? 0 : value);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    const bounds = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioRef.current.volume = value;
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>About Me</Title>
        <ContentSection>
          <ProfileContainer>
            <div>
              <ProfileImage src={profilePicture} alt="Profile" loading="lazy" />
              <AudioPlayer>
                <audio ref={audioRef} src={selfLoveMusic} preload="metadata" />
                <PlayButton onClick={togglePlay}>
                  {isPlaying ? '⏸' : '▶'}
                </PlayButton>
                <ProgressBar ref={progressBarRef} onClick={handleProgressClick}>
                  <Progress width={progress} />
                </ProgressBar>
                <VolumeContainer 
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <VolumeButton>
                    {volume > 0 ? '🔊' : '🔇'}
                  </VolumeButton>
                  <VolumeSlider show={showVolume}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  </VolumeSlider>
                </VolumeContainer>
              </AudioPlayer>
            </div>
            <ProfileInfo>
              <Bio>
                Hello! I'm [Your Name], a passionate software developer with a keen interest
                in creating elegant solutions to complex problems. My journey in technology
                began with a curiosity about how things work, and it has evolved into a
                fulfilling career in software development.
              </Bio>
              <Bio>
                I specialize in full-stack development, with expertise in modern web
                technologies. When I'm not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing knowledge
                with the developer community.
              </Bio>
              <Bio>
                I believe in continuous learning and staying up-to-date with the latest
                industry trends. My goal is to create meaningful applications that make a
                positive impact on users' lives.
              </Bio>
            </ProfileInfo>
          </ProfileContainer>
        </ContentSection>
      </PageContainer>
    </motion.div>
  );
}

export default AboutMe;
