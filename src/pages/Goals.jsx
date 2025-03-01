import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1E3D59;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const GoalCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const GoalTitle = styled.h3`
  color: #1A1B2F;
  font-size: 1.5rem;
  margin: 0;
`;

const ProgressContainer = styled.div`
  flex-shrink: 0;
  min-width: 200px;
`;

const ProgressBar = styled.div`
  background: #E9E9E9;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
`;

const Progress = styled.div`
  background: #2A9D8F;
  height: 100%;
  width: ${props => props.value}%;
  transition: width 1s ease-in-out;
`;

const ProgressLabel = styled.div`
  color: #1A1B2F;
  font-size: 0.9rem;
  text-align: right;
  margin-top: 0.5rem;
`;

const GoalDescription = styled.p`
  color: #1A1B2F;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const GoalMilestones = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Milestone = styled.li`
  color: #1A1B2F;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '${props => props.completed ? '✓' : '○'}';
    position: absolute;
    left: 0;
    color: ${props => props.completed ? '#2A9D8F' : '#1A1B2F'};
  }
`;

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

function Goals() {
  const goals = [
    {
      title: "Master Full-Stack Development",
      progress: 75,
      description: "Becoming proficient in both front-end and back-end development technologies.",
      milestones: [
        { text: "Learn React and its ecosystem", completed: true },
        { text: "Master Node.js and Express", completed: true },
        { text: "Study database design and management", completed: true },
        { text: "Build complex full-stack applications", completed: false }
      ]
    },
    {
      title: "Contribute to Open Source",
      progress: 40,
      description: "Actively participating in open-source projects and contributing to the community.",
      milestones: [
        { text: "Find suitable projects to contribute", completed: true },
        { text: "Make first pull request", completed: true },
        { text: "Become a regular contributor", completed: false },
        { text: "Start own open source project", completed: false }
      ]
    },
    {
      title: "Achieve Cloud Certification",
      progress: 25,
      description: "Obtaining professional certification in cloud technologies.",
      milestones: [
        { text: "Complete online courses", completed: true },
        { text: "Practice with cloud platforms", completed: false },
        { text: "Take practice exams", completed: false },
        { text: "Pass certification exam", completed: false }
      ]
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
        <Title>Professional Goals</Title>
        <GoalsContainer>
          {goals.map((goal, index) => (
            <GoalCard
              key={index}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
            >
              <GoalHeader>
                <GoalTitle>{goal.title}</GoalTitle>
                <ProgressContainer>
                  <ProgressBar>
                    <Progress value={goal.progress} />
                  </ProgressBar>
                  <ProgressLabel>{goal.progress}% Complete</ProgressLabel>
                </ProgressContainer>
              </GoalHeader>
              <GoalDescription>{goal.description}</GoalDescription>
              <GoalMilestones>
                {goal.milestones.map((milestone, idx) => (
                  <Milestone key={idx} completed={milestone.completed}>
                    {milestone.text}
                  </Milestone>
                ))}
              </GoalMilestones>
            </GoalCard>
          ))}
        </GoalsContainer>
      </PageContainer>
    </motion.div>
  );
}

export default Goals;
