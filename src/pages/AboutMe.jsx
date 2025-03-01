import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import profilePicture from '../images/Profile Picture.jpeg';

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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function AboutMe() {
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
