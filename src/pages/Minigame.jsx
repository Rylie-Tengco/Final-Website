import { useEffect, useRef, useState } from 'react';
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

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Canvas = styled.canvas`
  border: 2px solid #264653;
  border-radius: 8px;
  background: #F8F9FA;
  margin-bottom: 1rem;
`;

const Score = styled.div`
  font-size: 2rem;
  color: #2A9D8F;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: #2A9D8F;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #264653;
  }
`;

const Instructions = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: #264653;
    margin-bottom: 1rem;
  }

  p {
    color: #2B2D42;
    line-height: 1.6;
  }
`;

function Minigame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const bird = useRef({
    x: 50,
    y: 150,
    velocity: 0,
    gravity: 0.6,
    jump: -10,
    size: 20
  });

  const game = useRef({
    pipes: [],
    speed: 2,
    gap: 150,
    pipeWidth: 50,
    spawnInterval: 150,
    frameCount: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleClick = () => {
      if (!gameStarted) {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        bird.current.y = 150;
        bird.current.velocity = 0;
        game.current.pipes = [];
      }
      bird.current.velocity = bird.current.jump;
    };

    const createPipe = () => {
      const minHeight = 50;
      const maxHeight = canvas.height - game.current.gap - minHeight;
      const height = Math.random() * (maxHeight - minHeight) + minHeight;
      return {
        x: canvas.width,
        height: height
      };
    };

    const drawBird = () => {
      ctx.fillStyle = '#2A9D8F';
      ctx.beginPath();
      ctx.arc(bird.current.x, bird.current.y, bird.current.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPipes = () => {
      ctx.fillStyle = '#264653';
      game.current.pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, game.current.pipeWidth, pipe.height);
        ctx.fillRect(
          pipe.x,
          pipe.height + game.current.gap,
          game.current.pipeWidth,
          canvas.height - pipe.height - game.current.gap
        );
      });
    };

    const checkCollision = () => {
      const birdBox = {
        left: bird.current.x - bird.current.size,
        right: bird.current.x + bird.current.size,
        top: bird.current.y - bird.current.size,
        bottom: bird.current.y + bird.current.size
      };

      // Check wall collision
      if (birdBox.top <= 0 || birdBox.bottom >= canvas.height) {
        return true;
      }

      // Check pipe collision
      return game.current.pipes.some(pipe => {
        const boxesIntersect = (box1, box2) =>
          box1.left < box2.right &&
          box1.right > box2.left &&
          box1.top < box2.bottom &&
          box1.bottom > box2.top;

        const topPipeBox = {
          left: pipe.x,
          right: pipe.x + game.current.pipeWidth,
          top: 0,
          bottom: pipe.height
        };

        const bottomPipeBox = {
          left: pipe.x,
          right: pipe.x + game.current.pipeWidth,
          top: pipe.height + game.current.gap,
          bottom: canvas.height
        };

        return (
          boxesIntersect(birdBox, topPipeBox) ||
          boxesIntersect(birdBox, bottomPipeBox)
        );
      });
    };

    const gameLoop = () => {
      if (!gameStarted || gameOver) {
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update bird
      bird.current.velocity += bird.current.gravity;
      bird.current.y += bird.current.velocity;

      // Update pipes
      if (game.current.frameCount % game.current.spawnInterval === 0) {
        game.current.pipes.push(createPipe());
      }

      game.current.pipes.forEach(pipe => {
        pipe.x -= game.current.speed;
      });

      // Remove off-screen pipes
      game.current.pipes = game.current.pipes.filter(pipe => pipe.x > -game.current.pipeWidth);

      // Update score
      game.current.pipes.forEach(pipe => {
        if (pipe.x + game.current.pipeWidth === bird.current.x) {
          setScore(s => s + 1);
        }
      });

      // Draw everything
      drawBird();
      drawPipes();

      // Check collision
      if (checkCollision()) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      game.current.frameCount++;
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    canvas.width = 400;
    canvas.height = 600;

    canvas.addEventListener('click', handleClick);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        handleClick();
      }
    });

    gameLoop();

    return () => {
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>Flappy Bird</Title>
        <GameContainer>
          <Score>Score: {score}</Score>
          <Canvas ref={canvasRef} />
          {!gameStarted && (
            <Button onClick={() => setGameStarted(true)}>
              {gameOver ? 'Play Again' : 'Start Game'}
            </Button>
          )}
          <Instructions>
            <h3>How to Play</h3>
            <p>
              Click the mouse or press the spacebar to make the bird jump.
              Avoid the pipes and try to score as many points as possible!
            </p>
          </Instructions>
        </GameContainer>
      </PageContainer>
    </motion.div>
  );
}

export default Minigame;
