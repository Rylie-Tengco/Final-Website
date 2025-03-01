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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3);
  margin-top: ${props => props.first ? '0' : '3rem'};
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
  const professionalGoals = [
    {
      title: "Make a Personal Website",
      progress: 65,
      description: "Becoming proficient in both front-end and back-end development technologies.",
      milestones: [
        { text: "Draft initial site layout and design mockups", completed: true },
        { text: "Implement responsive design for mobile and desktop", completed: true },
        { text: "Focus on user experience", completed: true },
        { text: "Analyze and Improve", completed: false }
      ]
    },
    {
      title: "Master Coding in Different Languages",
      progress: 35,
      description: "Expand my programming skill set by learning multiple languages, enabling me to tackle a wide range of projects and challenges.",
      milestones: [
        { text: "Identify core languages to focus on (e.g., Python, JavaScript, CSS)", completed: true },
        { text: "Work on mini-projects to apply new concepts", completed: true },
        { text: "Follow structured courses or tutorials for each language", completed: false },
        { text: "Contribute to open-source projects for real-world experience", completed: false }
      ]
    },
    {
      title: "Make My Personal AI",
      progress: 5,
      description: "Obtaining professional certification in cloud technologies.",
      milestones: [
        { text: "Define the AI’s main purpose and scope", completed: true },
        { text: "Research relevant libraries and frameworks (e.g., TensorFlow, PyTorch)", completed: false },
        { text: "Build a prototype model and train it on sample data", completed: false },
        { text: "Continuously refine the AI’s accuracy and performance through testing", completed: false }
      ]
    }
  ];

  const personalGoals = [
    {
      title: "Finish My Manga and Manhwa Read-list",
      progress: 20,
      description: "Catching up on beloved series, discovering new titles, and conquering a growing backlog to fully enjoy captivating stories and art.",
      milestones: [
        { text: "Explore different genres to broaden my horizons", completed: true },
        { text: "Stay updated with latest chapter releases", completed: true },
        { text: "Keep a dedicated reading schedule each week", completed: false },
        { text: "Write brief reviews or impressions for each series", completed: false }
      ]
    },
    {
      title: "Get My Dream Body",
      progress: 15,
      description: "Building a healthier, stronger physique through consistent workouts, balanced nutrition, and sustainable lifestyle changes.",
      milestones: [
        { text: "Establish a structured workout routine", completed: true },
        { text: "Focus on proper nutrition and meal planning", completed: false },
        { text: "Track progress with measurements and photos", completed: false },
        { text: "Incorporate rest days and recovery practices", completed: false }
      ]
    },
    {
      title: "Get My Wished Characters in Gacha Games",
      progress: 45,
      description: "Strategically saving resources, planning summon schedules, and honing in-game strategies to collect all the characters on my wishlist.",
      milestones: [
        { text: "Research upcoming banners and plan pulls wisely", completed: true },
        { text: "Manage in-game currency effectively", completed: true },
        { text: "Participate in events for bonus rewards", completed: true },
        { text: "Obtain Every Desired Character", completed: false }
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
        <Title first>Professional Goals</Title>
        <GoalsContainer>
          {professionalGoals.map((goal, index) => (
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

        <Title>Personal Goals</Title>
        <GoalsContainer>
          {personalGoals.map((goal, index) => (
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
