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

const HobbiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const HobbyCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const HobbyIcon = styled.div`
  background: #2A9D8F;
  color: white;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`;

const HobbyContent = styled.div`
  padding: 1.5rem;
`;

const HobbyTitle = styled.h3`
  color: #264653;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const HobbyDescription = styled.p`
  color: #2B2D42;
  line-height: 1.6;
`;

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 }
};

function Hobbies() {
  const hobbies = [
    {
      icon: '🎮',
      title: 'Gaming',
      description: 'Enjoying both competitive and story-driven games, with a particular interest in strategy and RPG genres.'
    },
    {
      icon: '📚',
      title: 'Reading',
      description: 'Reading technical books, science fiction, and personal development literature to expand knowledge and imagination.'
    },
    {
      icon: '🏃',
      title: 'Running',
      description: 'Regular jogging and participating in local marathons to maintain physical fitness and mental clarity.'
    },
    {
      icon: '🎸',
      title: 'Music',
      description: 'Playing guitar and exploring different music genres in free time to unwind and express creativity.'
    },
    {
      icon: '✈️',
      title: 'Traveling',
      description: 'Exploring new places, experiencing different cultures, and documenting journeys through photography.'
    },
    {
      icon: '👨‍🍳',
      title: 'Cooking',
      description: 'Experimenting with recipes from various cuisines and perfecting cooking techniques.'
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
        <Title>Hobbies</Title>
        <HobbiesGrid>
          {hobbies.map((hobby, index) => (
            <HobbyCard
              key={index}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
            >
              <HobbyIcon>{hobby.icon}</HobbyIcon>
              <HobbyContent>
                <HobbyTitle>{hobby.title}</HobbyTitle>
                <HobbyDescription>{hobby.description}</HobbyDescription>
              </HobbyContent>
            </HobbyCard>
          ))}
        </HobbiesGrid>
      </PageContainer>
    </motion.div>
  );
}

export default Hobbies;
