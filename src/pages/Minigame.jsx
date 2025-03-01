import { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const GameSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const GameButton = styled.button`
  background: ${props => props.active ? '#1A1B2F' : '#2A9D8F'};
  color: #E0F4FF;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${props => props.active ? '#1A1B2F' : '#1f7268'};
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Canvas = styled.canvas`
  border: 2px solid #1A1B2F;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  max-width: 100%;
  height: auto;
  touch-action: none;
`;

const Score = styled.div`
  font-size: 2rem;
  color: #1E3D59;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3);
`;

const Button = styled.button`
  background: #2A9D8F;
  color: #E0F4FF;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #1A1B2F;
  }
`;

const Instructions = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  backdrop-filter: blur(5px);

  h3 {
    color: #1A1B2F;
    margin-bottom: 1rem;
  }

  p {
    color: #1A1B2F;
    line-height: 1.6;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1000;
  backdrop-filter: blur(10px);

  h2 {
    color: #1A1B2F;
    margin-bottom: 1rem;
  }

  p {
    color: #2A9D8F;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  z-index: 999;
`;

const FlappyBird = ({ setScore, gameStarted, setGameStarted, gameOver, setGameOver }) => {
  const canvasRef = useRef(null);
  const birdRef = useRef({
    y: 200,
    velocity: 0,
    gravity: 0.5,
    jumpStrength: -8,
    size: 20
  });
  const pipesRef = useRef([]);
  const gameRef = useRef({
    speed: 2,
    gapHeight: 150,
    pipeWidth: 50,
    spawnInterval: 150,
    frameCount: 0
  });

  const resetGame = useCallback(() => {
    birdRef.current = {
      y: 200,
      velocity: 0,
      gravity: 0.5,
      jumpStrength: -8,
      size: 20
    };
    pipesRef.current = [];
    gameRef.current.frameCount = 0;
    setScore(0);
  }, [setScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    let animationFrameId;

    const handleTouch = () => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      if (gameStarted && !gameOver) {
        birdRef.current.velocity = birdRef.current.jumpStrength;
      }
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleTouch();
      }
    };

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleTouch();
    });

    const createPipe = () => {
      const gapStart = Math.random() * (canvas.height - gameRef.current.gapHeight - 80) + 40;
      return {
        x: canvas.width,
        gapStart,
        gapHeight: gameRef.current.gapHeight,
        width: gameRef.current.pipeWidth,
        passed: false
      };
    };

    const drawBird = () => {
      ctx.fillStyle = '#E76F51';
      ctx.beginPath();
      ctx.arc(100, birdRef.current.y, birdRef.current.size/2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPipes = () => {
      ctx.fillStyle = '#2A9D8F';
      pipesRef.current.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapStart);
        ctx.fillRect(
          pipe.x,
          pipe.gapStart + pipe.gapHeight,
          pipe.width,
          canvas.height - (pipe.gapStart + pipe.gapHeight)
        );
      });
    };

    const update = () => {
      if (!gameStarted || gameOver) return;

      birdRef.current.velocity += birdRef.current.gravity;
      birdRef.current.y += birdRef.current.velocity;

      pipesRef.current.forEach(pipe => {
        pipe.x -= gameRef.current.speed;
      });

      pipesRef.current = pipesRef.current.filter(pipe => pipe.x + pipe.width > 0);

      if (gameRef.current.frameCount % gameRef.current.spawnInterval === 0) {
        pipesRef.current.push(createPipe());
      }

      if (birdRef.current.y < 0 || birdRef.current.y > canvas.height) {
        setGameOver(true);
        return;
      }

      pipesRef.current.forEach(pipe => {
        if (
          100 < pipe.x + pipe.width &&
          100 + birdRef.current.size/2 > pipe.x &&
          (
            birdRef.current.y - birdRef.current.size/2 < pipe.gapStart ||
            birdRef.current.y + birdRef.current.size/2 > pipe.gapStart + pipe.gapHeight
          )
        ) {
          setGameOver(true);
          return;
        }

        if (!pipe.passed && pipe.x + pipe.width < 100) {
          pipe.passed = true;
          setScore(s => s + 1);
        }
      });

      gameRef.current.frameCount++;
    };

    const gameLoop = () => {
      if (!gameStarted || gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update();
      drawPipes();
      drawBird();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    document.addEventListener('keydown', handleKeyPress);
    if (gameStarted && !gameOver) {
      gameLoop();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver, setGameOver, setScore, setGameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      resetGame();
    }
    return () => {
      birdRef.current = {
        y: 200,
        velocity: 0,
        gravity: 0.5,
        jumpStrength: -8,
        size: 20
      };
      pipesRef.current = [];
      gameRef.current.frameCount = 0;
    };
  }, [gameStarted, gameOver, resetGame]);

  return <Canvas ref={canvasRef} />;
};

const DinoRun = ({ setScore, gameStarted, setGameStarted, gameOver, setGameOver }) => {
  const canvasRef = useRef(null);
  const dinoRef = useRef({
    y: 0,
    velocity: 0,
    baseY: 300,
    width: 44,
    height: 47,
    gravity: 0.8,
    jumpStrength: -18,
    isJumping: false
  });
  const obstaclesRef = useRef([]);
  const groundRef = useRef({
    x: 0,
    speed: 5
  });
  const gameRef = useRef({
    speed: 5,
    score: 0,
    frameCount: 0,
    spawnInterval: 50,
    speedIncreaseInterval: 200,
    lastObstacleX: 0,
    patternIndex: 0
  });

  const resetGame = useCallback(() => {
    dinoRef.current.y = dinoRef.current.baseY;
    dinoRef.current.velocity = 0;
    dinoRef.current.isJumping = false;
    obstaclesRef.current = [];
    gameRef.current.frameCount = 0;
    gameRef.current.speed = 5;
    gameRef.current.lastObstacleX = 0;
    gameRef.current.patternIndex = 0;
    groundRef.current.speed = 5;
    setScore(0);
  }, [setScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    let animationFrameId;

    const handleJump = () => {
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }
      if (!dinoRef.current.isJumping && !gameOver) {
        dinoRef.current.velocity = dinoRef.current.jumpStrength;
        dinoRef.current.isJumping = true;
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === 'ArrowUp' || e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleJump();
    });

    const createObstacle = () => {
      // Fixed patterns for distances
      const patterns = [
        { min: 200, max: 300 },  // Very close
        { min: 300, max: 400 },  // Medium
        { min: 400, max: 550 }   // Long
      ];
      
      // Get current pattern and generate spacing within its range
      const pattern = patterns[gameRef.current.patternIndex];
      const spacing = Math.random() * (pattern.max - pattern.min) + pattern.min;
      
      // Cycle to next pattern
      gameRef.current.patternIndex = (gameRef.current.patternIndex + 1) % patterns.length;
      
      // Height variation (30-150 pixels) with different probability bands
      const heightProb = Math.random();
      let height;
      
      // 40% chance for shorter obstacles (30-70px)
      if (heightProb < 0.4) {
        height = Math.random() * (70 - 30) + 30;
      }
      // 35% chance for medium obstacles (70-110px)
      else if (heightProb < 0.75) {
        height = Math.random() * (110 - 70) + 70;
      }
      // 25% chance for tall obstacles (110-150px)
      else {
        height = Math.random() * (150 - 110) + 110;
      }

      const x = gameRef.current.lastObstacleX === 0 
        ? canvas.width 
        : gameRef.current.lastObstacleX + spacing;

      gameRef.current.lastObstacleX = x;

      // Add slight random speed variation for this obstacle
      const speedVariation = 0.95 + Math.random() * 0.1; // 0.95-1.05 multiplier
      const currentSpeed = gameRef.current.speed * speedVariation;

      return {
        x: x,
        y: dinoRef.current.baseY - height + dinoRef.current.height,
        width: 30,
        height: height,
        speed: currentSpeed
      };
    };

    const drawDino = () => {
      ctx.fillStyle = '#2A9D8F';
      ctx.fillRect(
        50,
        dinoRef.current.y,
        dinoRef.current.width,
        dinoRef.current.height
      );
    };

    const drawObstacles = () => {
      ctx.fillStyle = '#E76F51';
      obstaclesRef.current.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
    };

    const drawGround = () => {
      ctx.fillStyle = '#1A1B2F';
      ctx.fillRect(0, dinoRef.current.baseY + dinoRef.current.height, canvas.width, 2);
      
      ctx.fillStyle = '#2A9D8F';
      for (let i = groundRef.current.x % 40; i < canvas.width; i += 40) {
        ctx.fillRect(i, dinoRef.current.baseY + dinoRef.current.height - 5, 20, 5);
      }
    };

    const update = () => {
      if (!gameStarted || gameOver) return;

      dinoRef.current.velocity += dinoRef.current.gravity;
      dinoRef.current.y += dinoRef.current.velocity;

      if (dinoRef.current.y > dinoRef.current.baseY) {
        dinoRef.current.y = dinoRef.current.baseY;
        dinoRef.current.velocity = 0;
        dinoRef.current.isJumping = false;
      }

      obstaclesRef.current.forEach(obstacle => {
        // Use obstacle's individual speed
        obstacle.x -= (obstacle.speed || gameRef.current.speed);
      });

      obstaclesRef.current = obstaclesRef.current.filter(obstacle => obstacle.x + obstacle.width > 0);

      const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
      if (!lastObstacle || lastObstacle.x < canvas.width - 200) {
        obstaclesRef.current.push(createObstacle());
      }

      groundRef.current.x -= groundRef.current.speed;

      obstaclesRef.current.forEach(obstacle => {
        if (
          50 < obstacle.x + obstacle.width &&
          50 + dinoRef.current.width > obstacle.x &&
          dinoRef.current.y + dinoRef.current.height > obstacle.y &&
          dinoRef.current.y < obstacle.y + obstacle.height
        ) {
          setGameOver(true);
          return;
        }
      });

      if (gameRef.current.frameCount % 10 === 0) {
        setScore(s => s + 1);
      }

      if (gameRef.current.frameCount % gameRef.current.speedIncreaseInterval === 0) {
        gameRef.current.speed += 0.8;
        groundRef.current.speed += 0.8;
      }

      gameRef.current.frameCount++;
    };

    const gameLoop = () => {
      if (!gameStarted || gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update();
      drawGround();
      drawDino();
      drawObstacles();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    document.addEventListener('keydown', handleKeyDown);
    if (gameStarted && !gameOver) {
      gameLoop();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleJump);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver, setGameOver, setScore, setGameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      resetGame();
    }
  }, [gameStarted, gameOver, resetGame]);

  return <Canvas ref={canvasRef} />;
};

const SnakeGame = ({ setScore, gameStarted, setGameStarted, gameOver, setGameOver }) => {
  const canvasRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef(null);

  const snake = useRef({
    body: [{x: 10, y: 10}],
    direction: 'right',
    nextDirection: 'right',
    size: 20,
    speed: 150
  });

  const food = useRef({
    x: 15,
    y: 15,
    size: 20
  });

  const game = useRef({
    lastUpdate: 0,
    gridSize: 20
  });

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 400;
    snake.current = {
      body: [{x: 10, y: 10}],
      direction: 'right',
      nextDirection: 'right',
      size: game.current.gridSize,
      speed: 150
    };
    const x = Math.floor(Math.random() * (canvas.width / game.current.gridSize));
    const y = Math.floor(Math.random() * (canvas.height / game.current.gridSize));
    food.current = { x, y, size: game.current.gridSize };
    setScore(0);
    game.current.lastUpdate = 0;
  }, [setScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const generateFood = () => {
      const x = Math.floor(Math.random() * (canvas.width / game.current.gridSize));
      const y = Math.floor(Math.random() * (canvas.height / game.current.gridSize));
      food.current = { x, y, size: game.current.gridSize };
    };

    const drawSnake = () => {
      ctx.fillStyle = '#2A9D8F';
      snake.current.body.forEach((segment, index) => {
        const alpha = 0.5 + (0.5 * index / snake.current.body.length);
        ctx.fillStyle = `rgba(42, 157, 143, ${alpha})`;
        ctx.fillRect(
          segment.x * game.current.gridSize,
          segment.y * game.current.gridSize,
          snake.current.size,
          snake.current.size
        );
      });
    };

    const drawFood = () => {
      ctx.fillStyle = '#E76F51';
      ctx.beginPath();
      ctx.arc(
        food.current.x * game.current.gridSize + food.current.size/2,
        food.current.y * game.current.gridSize + food.current.size/2,
        food.current.size/2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const moveSnake = (timestamp) => {
      if (!gameStarted || gameOver || isPaused) return;

      if (timestamp - game.current.lastUpdate > snake.current.speed) {
        const head = { ...snake.current.body[0] };
        snake.current.direction = snake.current.nextDirection;

        switch(snake.current.direction) {
          case 'up': head.y--; break;
          case 'down': head.y++; break;
          case 'left': head.x--; break;
          case 'right': head.x++; break;
          default: break;
        }

        if (head.x < 0 || head.x >= canvas.width / game.current.gridSize ||
            head.y < 0 || head.y >= canvas.height / game.current.gridSize) {
          setGameOver(true);
          return;
        }

        if (snake.current.body.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return;
        }

        snake.current.body.unshift(head);

        if (head.x === food.current.x && head.y === food.current.y) {
          setScore(s => s + 1);
          generateFood();
        } else {
          snake.current.body.pop();
        }

        game.current.lastUpdate = timestamp;
      }
    };

    const gameLoop = (timestamp) => {
      if (!gameStarted || gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      moveSnake(timestamp);
      drawFood();
      drawSnake();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleDirectionChange = (newDirection) => {
      if (!gameStarted || gameOver) return;

      const opposites = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
      };

      if (opposites[newDirection] !== snake.current.direction) {
        snake.current.nextDirection = newDirection;
      }
    };

    const handleKeyPress = (e) => {
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
      }

      const directions = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
      };

      const newDirection = directions[e.key];
      if (!newDirection) return;

      handleDirectionChange(newDirection);
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      if (!touchStartRef.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      const dx = touchEnd.x - touchStartRef.current.x;
      const dy = touchEnd.y - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Minimum swipe distance threshold
      const minSwipeDistance = 30;

      if (Math.max(absDx, absDy) > minSwipeDistance) {
        if (absDx > absDy) {
          handleDirectionChange(dx > 0 ? 'right' : 'left');
        } else {
          handleDirectionChange(dy > 0 ? 'down' : 'up');
        }
      }

      touchStartRef.current = null;
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    if (gameStarted && !gameOver && !isPaused) {
      document.addEventListener('keydown', handleKeyPress);
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    if (gameStarted && !gameOver) {
      initGame();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver, isPaused, setScore, initGame]);

  return (
    <GameContainer>
      <Canvas ref={canvasRef} />
      {!gameStarted && (
        <Button onClick={() => setGameStarted(true)}>
          {gameOver ? 'Play Again' : 'Start Game'}
        </Button>
      )}
      {gameStarted && !gameOver && (
        <Button onClick={() => {
          setGameStarted(false);
          setIsPaused(false);
        }}>
          Stop
        </Button>
      )}
    </GameContainer>
  );
};

function Minigame() {
  const [selectedGame, setSelectedGame] = useState('snake');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>Mini Games</Title>
        
        <GameSelector>
          <GameButton 
            active={selectedGame === 'snake'} 
            onClick={() => handleGameSelect('snake')}
          >
            Snake Game
          </GameButton>
          <GameButton 
            active={selectedGame === 'flappy'} 
            onClick={() => handleGameSelect('flappy')}
          >
            Flappy Ball
          </GameButton>
          <GameButton 
            active={selectedGame === 'dino'} 
            onClick={() => handleGameSelect('dino')}
          >
            Block Run
          </GameButton>
        </GameSelector>

        <Score>Score: {score}</Score>

        {selectedGame === 'snake' ? (
          <SnakeGame
            setScore={setScore}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />
        ) : selectedGame === 'flappy' ? (
          <FlappyBird
            setScore={setScore}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />
        ) : (
          <DinoRun
            setScore={setScore}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />
        )}

        <Instructions>
          <h3>How to Play</h3>
          {selectedGame === 'snake' ? (
            <p>
              Use the arrow keys or swipe gestures to control the snake's direction.
              Swipe up, down, left, or right to move the snake.
              Eat the red food to grow longer and increase your score.
              Avoid hitting the walls and yourself!
            </p>
          ) : selectedGame === 'flappy' ? (
            <p>
              Press spacebar or tap the screen to make the ball jump.
              Navigate through the barriers to score points.
              Avoid hitting the barriers or the ground!
            </p>
          ) : (
            <p>
              Press the up arrow key, spacebar, or tap the screen to jump.
              Avoid the incoming obstacles and survive as long as possible.
              The game gets faster over time!
            </p>
          )}
        </Instructions>

        {gameOver && (
          <>
            <Overlay />
            <Modal>
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Button onClick={() => {
                  setGameOver(false);
                  setGameStarted(false);
                  setScore(0);
                  setTimeout(() => {
                    setGameStarted(true);
                  }, 0);
                }}>
                  Play Again
                </Button>
                <Button onClick={() => {
                  setGameOver(false);
                  setGameStarted(false);
                  setScore(0);
                }}>
                  Exit Game
                </Button>
              </div>
            </Modal>
          </>
        )}
      </PageContainer>
    </motion.div>
  );
}

export default Minigame;
