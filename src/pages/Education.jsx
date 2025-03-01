import styled from '@emotion/styled';
import { motion } from 'framer-motion';

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

const Timeline = styled.div`
  position: relative;
  max-width: min(800px, 100%);
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2rem) 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #2A9D8F;

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: clamp(0.75rem, 2vw, 1rem) 0;
  position: relative;
  width: 50%;
  margin-left: ${props => props.align === 'right' ? '50%' : '0'};

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    margin-left: 60px;
    
    /* Maintain visual hierarchy on mobile */
    &::before {
      content: '';
      position: absolute;
      left: -30px;
      top: 50%;
      width: 20px;
      height: 2px;
      background: #2A9D8F;
      transform: translateY(-50%);
    }
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: clamp(1.25rem, 3vw, 1.5rem);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  margin: 0 clamp(1rem, 3vw, 2rem);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: #E9C46A;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    ${props => props.align === 'right' ? 'left: -48px;' : 'right: -48px;'};
    border: 2px solid white;
    box-shadow: 0 0 0 4px rgba(233, 196, 106, 0.2);

    @media (max-width: 768px) {
      left: -38px;
      width: 14px;
      height: 14px;
    }
  }
`;

const Year = styled.div`
  color: #2A9D8F;
  font-weight: bold;
  font-size: clamp(1.1rem, 2.5vw, 1.2rem);
  margin-bottom: clamp(0.4rem, 1.5vw, 0.5rem);
`;

const Institution = styled.h3`
  color: #1A1B2F;
  margin-bottom: clamp(0.4rem, 1.5vw, 0.5rem);
  font-size: clamp(1rem, 2.5vw, 1.1rem);
`;

const Description = styled.p`
  color: #1A1B2F;
  line-height: 1.5;
  font-size: clamp(0.9rem, 2vw, 1rem);
`;

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { opacity: 0, x: props => props.align === 'right' ? 50 : -50 },
  animate: { opacity: 1, x: 0 }
};

function Education() {
  const educationData = [
    {
      year: "2011 - 2017",
      institution: "Maranatha Christian Academy",
      description: "Elementary Education",
      align: "left"
    },
    {
      year: "2017 - 2021",
      institution: "Maranatha Christian Academy",
      description: "Highschool Education",
      align: "right"
    },
    {
      year: "2021 - 2023",
      institution: "Maranatha Christian Academy",
      description: "Senior Highschool - STEM Strand",
      align: "left"
    },
    {
      year: "2023 - Present",
      institution: "Asia Pacific College",
      description: "Bachelor of Science in Information Technology - Mobile and Internet",
      align: "right"
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>Education</Title>
        <Timeline>
          {educationData.map((item, index) => (
            <TimelineItem
              key={index}
              align={item.align}
              variants={itemVariants}
              custom={{ align: item.align }}
              transition={{ delay: index * 0.2 }}
            >
              <TimelineContent align={item.align}>
                <Year>{item.year}</Year>
                <Institution>{item.institution}</Institution>
                <Description>{item.description}</Description>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </PageContainer>
    </motion.div>
  );
}

export default Education;
