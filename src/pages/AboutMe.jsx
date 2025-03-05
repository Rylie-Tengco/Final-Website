import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import profilePicture from '../images/Profile Picture.jpeg';
import { AudioContext } from '../App';
import AudioProgress from '../components/AudioProgress';

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
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.25rem;
    max-width: 95%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  width: 100%;
`;

const ProfileImage = styled.img`
  width: clamp(200px, 35vw, 250px);
  height: clamp(200px, 35vw, 250px);
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ProfileInfo = styled.div`
  max-width: 65ch;
  margin: 0 auto;
  width: 100%;
`;

const Bio = styled.p`
  line-height: 1.6;
  color: #1A1B2F;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.9rem, 2vw, 1rem);
  text-align: justify;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const AudioPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: rgba(42, 157, 143, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  margin: 1rem 0 2rem;
  width: min(100%, 400px);

  .controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const BaseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
`;

const PlayButton = styled(BaseButton)`
  background: #2A9D8F;
  color: white;

  &:hover {
    background: #1A1B2F;
  }
`;

const ShuffleButton = styled(BaseButton)`
  background: ${props => props.isActive ? 'white' : '#2A9D8F'};
  color: ${props => props.isActive ? '#2A9D8F' : 'white'};
  border: 2px solid #2A9D8F;

  &:hover {
    background: ${props => props.isActive ? '#f5f5f5' : '#1A1B2F'};
  }
`;

const ShuffleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 17h-1.559l-9.7-10.673A3 3 0 0 0 3.44 5H2v2h1.559l9.7 10.673A3 3 0 0 0 15.559 19H17v2l4-3-4-3v2zm0-12h-1.559a3 3 0 0 0-2.3 1.327L8.859 11l1.408 1.548 4.282-4.707A1 1 0 0 1 15.559 7H17v2l4-3-4-3v2z"/>
  </svg>
);

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

const MusicName = styled.div`
  color: #2A9D8F;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
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

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialMediaLink = styled.a`
  color: #2A9D8F;
  font-size: 1.8rem;
  transition: color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    color: #1A1B2F;
    transform: translateY(-2px);
  }
`;

const ContactSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(26, 27, 47, 0.1);
`;

const ContactTitle = styled.h2`
  color: #1E3D59;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  color: #2A9D8F;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const ContactText = styled.span`
  color: #1A1B2F;
  font-size: 1rem;
`;

const ReferencesSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(26, 27, 47, 0.1);
`;

const ReferencesTitle = styled.h2`
  color: #1E3D59;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const ReferencesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
`;

const ReferenceLink = styled.a`
  color: #2A9D8F;
  transition: transform 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  
  &:hover {
    color: #1A1B2F;
    transform: translateY(-3px);
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function AboutMe() {
  const { audioElement, isPlaying, setIsPlaying, volume, setVolume, currentTrack, nextTrack, previousTrack, isShuffleOn, toggleShuffle } = useContext(AudioContext);
  const [showVolume, setShowVolume] = useState(false);

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioElement.volume = value;
  };

  useEffect(() => {
    if (!audioElement) return;

    const playWhenReady = () => {
      if (isPlaying) {
        audioElement.play()
          .catch(err => console.error('Error playing audio:', err));
      }
    };

    audioElement.addEventListener('canplaythrough', playWhenReady);
    if (audioElement.readyState >= 3) {
      playWhenReady();
    }

    return () => {
      audioElement.removeEventListener('canplaythrough', playWhenReady);
    };
  }, [audioElement, isPlaying]);

  const handlePreviousTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    previousTrack();
    setIsPlaying(true);
  };

  const handleNextTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextTrack();
    setIsPlaying(true);
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
            <ProfileImage src={profilePicture} alt="Profile" loading="lazy" />
            <SocialMediaContainer>
              <SocialMediaLink 
                href="https://www.facebook.com/share/1QAk7kQWqg/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </SocialMediaLink>
              <SocialMediaLink 
                href="https://github.com/Rylie-Tengco" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialMediaLink>
              <SocialMediaLink 
                href="https://www.linkedin.com/in/rylie-tengco-6b110a306/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialMediaLink>
            </SocialMediaContainer>
            <AudioPlayer>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
              <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShuffleButton onClick={toggleShuffle} isActive={isShuffleOn} aria-label="Toggle shuffle">
                  <ShuffleIcon />
                </ShuffleButton>
                  <PlayButton onClick={handlePreviousTrack}>⏮</PlayButton>
                  <PlayButton onClick={togglePlay}>
                    {isPlaying ? '⏸' : '▶'}
                  </PlayButton>
                  <PlayButton onClick={handleNextTrack}>⏭</PlayButton>
                </div>
                <AudioProgress />
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
              </div>
              <MusicName>{currentTrack.title}</MusicName>
            </AudioPlayer>
            <ProfileInfo>
              <Bio>
                Hello! I'm Julian Rylie B. Tengco, a 20-year-old aspiring IT technician
                born on November 23, 2004. As the eldest of four brothers, I've developed
                a natural sense of leadership and responsibility that carries over into my
                professional endeavors.
              </Bio>
              <Bio>
                Currently, I'm pursuing a Bachelor of Science in Information Technology
                with a focus on Mobile and Internet technologies. My passion lies in creating
                innovative solutions and exploring the latest trends in mobile development,
                aiming to develop applications that positively impact users' lives.
              </Bio>
            </ProfileInfo>
            <ContactSection>
              <ContactTitle>Contact Me</ContactTitle>
              <ContactInfo>
                <ContactItem>
                  <ContactIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                    </svg>
                  </ContactIcon>
                  <ContactText>Imus, Cavite</ContactText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                  </ContactIcon>
                  <ContactText>jrylietengco@gmail.com</ContactText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                    </svg>
                  </ContactIcon>
                  <ContactText>09277795738</ContactText>
                </ContactItem>
              </ContactInfo>
            </ContactSection>
            
            <ReferencesSection>
              <ReferencesTitle>References</ReferencesTitle>
              <ReferencesContainer>
                <ReferenceLink 
                  href="https://github.com/features/copilot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="GitHub Copilot"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.922 12.306c0 5.35-3.872 9.808-9 10.068v-2.103c3.611-.453 6.433-3.526 6.433-7.197 0-3.998-3.246-7.244-7.244-7.244S6.867 9 6.867 13.074c0 3.67 2.822 6.744 6.433 7.197v2.103c-5.128-.26-9-4.718-9-10.068C4.3 6.956 8.256 3 13.111 3s9.811 3.956 9.811 9.306zM12.5 16.102c-1 0-1.814-.814-1.814-1.814s.814-1.814 1.814-1.814 1.814.814 1.814 1.814-.814 1.814-1.814 1.814z"/>
                  </svg>
                </ReferenceLink>
                <ReferenceLink 
                  href="https://chat.openai.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="ChatGPT"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829 14.6202 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4069-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                  </svg>
                </ReferenceLink>
                <ReferenceLink 
                  href="https://claude.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Claude AI"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.486 2 2 6.486 2 12c0 5.513 4.486 10 10 10s10-4.487 10-10c0-5.514-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                    <path d="M13 7h-2v6h6v-2h-4z"/>
                  </svg>
                </ReferenceLink>
                <ReferenceLink 
                  href="https://www.w3schools.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="W3Schools"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </ReferenceLink>
                <ReferenceLink 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </ReferenceLink>
              </ReferencesContainer>
            </ReferencesSection>
          </ProfileContainer>
        </ContentSection>
      </PageContainer>
    </motion.div>
  );
}

export default AboutMe;
