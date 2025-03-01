import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';
import Education from './pages/Education';
import Hobbies from './pages/Hobbies';
import Goals from './pages/Goals';
import ITExperience from './pages/ITExperience';
import PhotoGallery from './pages/PhotoGallery';
import Minigame from './pages/Minigame';
import Feedback from './pages/Feedback';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: #F8F9FA;
    color: #2B2D42;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  padding: 2rem;
  margin-top: 60px;
`;

function App() {
  return (
    <Router>
      <Global styles={globalStyles} />
      <MainContainer>
        <Navbar />
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
  );
}

export default App;
