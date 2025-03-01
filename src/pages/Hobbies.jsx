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
`;

const HobbiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const HobbyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
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
  color: #1A1B2F;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
`;

const HobbyDescription = styled.p`
  color: #1A1B2F;
  line-height: 1.6;
  text-align: justify;
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
      description: 'Passionate about gacha games including Genshin Impact, Wuthering Waves, Honkai Star Rail, and Zenless Zone Zero. Also enjoy competitive gaming with titles like Valorant and Mobile Legends.'
    },
    {
      icon: '📚',
      title: 'Reading',
      description: 'Avid reader of manga and manhwa, with particular interest in series like Omniscient Reader\'s Viewpoint, Solo Leveling, The Beginning After The End, and many other captivating stories.'
    },
    {
      icon: '📺',
      title: 'Watching',
      description: 'Enthusiastic about anime, particularly action series like Bleach and romance like Love is War. Also enjoy exploring movies across various genres for diverse entertainment.'
    },
    {
      icon: '🏋️',
      title: 'Exercise',
      description: 'Dedicated to maintaining a healthy lifestyle through regular workouts in my spare time. Following a structured workout plan to keep my body in shape and maintain optimal health.'
    },
    {
      icon: '🏐',
      title: 'Volleyball',
      description: 'Passionate about playing volleyball whenever the opportunity arises. Enjoy the thrill of the game, especially when playing with friends, combining friendly competition with social interaction.'
    },
    {
      icon: '🔧',
      title: 'Tinkering',
      description: 'Enjoy tinkering with devices and gadgets, exploring their mechanics, and finding ways to improve or repair them. Each hands-on experience is a learning opportunity.'
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
