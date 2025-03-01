import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #264653;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
`;

const ContentSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #E9C46A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #264653;
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Bio = styled.p`
  line-height: 1.6;
  color: #2B2D42;
  margin-bottom: 1rem;
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
            <ProfileImage>👤</ProfileImage>
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
