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

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #2A9D8F;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 1rem 0;
  position: relative;
  width: 50%;
  margin-left: ${props => props.align === 'right' ? '50%' : '0'};

  @media (max-width: 768px) {
    width: calc(100% - 50px);
    margin-left: 50px;
  }
`;

const TimelineContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #E9C46A;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    ${props => props.align === 'right' ? 'left: -60px;' : 'right: -60px;'}

    @media (max-width: 768px) {
      left: -40px;
    }
  }
`;

const Year = styled.div`
  color: #2A9D8F;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Institution = styled.h3`
  color: #264653;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #2B2D42;
  line-height: 1.5;
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
      year: "2019 - 2023",
      institution: "University Name",
      description: "Bachelor of Science in Computer Science",
      align: "left"
    },
    {
      year: "2017 - 2019",
      institution: "College Name",
      description: "Associate Degree in Information Technology",
      align: "right"
    },
    {
      year: "2013 - 2017",
      institution: "High School Name",
      description: "High School Diploma with focus on STEM",
      align: "left"
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
