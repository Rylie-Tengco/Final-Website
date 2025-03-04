import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState, createContext } from 'react';
import selfLoveMusic from './music/Self Love.mp3';
import amIDreamingMusic from './music/Am I Dreaming.mp3';
import callingMusic from './music/Calling.mp3';
import linkUpMusic from './music/Link Up.mp3';
import monaLisaMusic from './music/Mona Lisa.mp3';
import sunflowerMusic from './music/Sunflower.mp3';
import Navbar from './components/Navbar';
import backgroundVideo from './background/background.mp4';
import AboutMe from './pages/AboutMe';
import Education from './pages/Education';
import Hobbies from './pages/Hobbies';
import Goals from './pages/Goals';
import ITExperience from './pages/ITExperience';
import PhotoGallery from './pages/PhotoGallery';
import Minigame from './pages/Minigame';
import Feedback from './pages/Feedback';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    background: #F8F9FA;
    color: #2B2D42;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, input, textarea {
    font-family: inherit;
  }

  /* Improve touch targets on mobile */
  @media (max-width: 768px) {
    button, a {
      min-height: 44px;
      min-width: 44px;
    }
  }
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.6;

  @media (max-width: 768px) {
    opacity: 0.4; /* Slightly reduce opacity on mobile for better readability */
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.main`
  padding: clamp(1rem, 5vw, 2rem);
  margin-top: clamp(60px, 10vh, 80px);
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const AudioContext = createContext();

const musicTracks = [
  { src: selfLoveMusic, title: 'Self Love' },
  { src: monaLisaMusic, title: 'Mona Lisa' },
  { src: sunflowerMusic, title: 'Sunflower' },
  { src: linkUpMusic, title: 'Link Up' },
  { src: callingMusic, title: 'Calling' },
  { src: amIDreamingMusic, title: 'Am I Dreaming' }
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioElement, setAudioElement] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicTracks[currentTrackIndex].src);
    audio.loop = false;
    audio.volume = volume;

    const loadAndPlay = async () => {
      try {
        await audio.load();
        setAudioElement(audio);
        if (isPlaying) {
          await audio.play();
        }
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAndPlay();

    audio.addEventListener('ended', () => {
      if (isShuffleOn) {
        const nextIndex = Math.floor(Math.random() * musicTracks.length);
        setCurrentTrackIndex(nextIndex);
      } else {
        const nextIndex = (currentTrackIndex + 1) % musicTracks.length;
        setCurrentTrackIndex(nextIndex);
      }
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentTrackIndex, isPlaying, volume]);

  return (
    <AudioContext.Provider value={{
      audioElement,
      isPlaying,
      setIsPlaying,
      volume,
      setVolume,
      currentTrack: musicTracks[currentTrackIndex],
      nextTrack: () => {
        if (isShuffleOn) {
          const nextIndex = Math.floor(Math.random() * musicTracks.length);
          setCurrentTrackIndex(nextIndex);
        } else {
          setCurrentTrackIndex((currentTrackIndex + 1) % musicTracks.length);
        }
      },
      previousTrack: () => {
        if (isShuffleOn) {
          const nextIndex = Math.floor(Math.random() * musicTracks.length);
          setCurrentTrackIndex(nextIndex);
        } else {
          setCurrentTrackIndex((currentTrackIndex - 1 + musicTracks.length) % musicTracks.length);
        }
      },
      isShuffleOn,
      toggleShuffle: () => setIsShuffleOn(prev => !prev)
    }}>
      <Router>
        <Global styles={globalStyles} />
        <MainContainer>
          <VideoBackground autoPlay loop muted playsInline>
            <source src={backgroundVideo} type="video/mp4" />
          </VideoBackground>
          <Navbar />
          <ScrollToTop />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<AboutMe />} />
              <Route path="/education" element={<Education />} />
              <Route path="/hobbies" element={<Hobbies />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/experience" element={<ITExperience />} />
              <Route path="/gallery" element={<PhotoGallery />} />
              <Route path="/minigame" element={<Minigame />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </ContentWrapper>
        </MainContainer>
      </Router>
    </AudioContext.Provider>
  );
}

export default App;
