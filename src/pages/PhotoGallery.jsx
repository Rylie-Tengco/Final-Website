import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Image imports
import bestFriends from "../gallery images/BESTFRIENDS.jpeg";
import bidyuhiko1 from "../gallery images/BIDYUHIKO 1.jpeg";
import bidyuhiko2 from "../gallery images/BIDYUHIKO 2.jpeg";
import bidyuhiko3 from "../gallery images/BIDYUHIKO 3.jpeg";
import bidyuhiko4 from "../gallery images/BIDYUHIKO 4.jpeg";
import family from "../gallery images/FAMILY.jpg";
import graduation from "../gallery images/GRADUATION.jpeg";
import gymBros from "../gallery images/GYMBROS.jpeg";
import seniorHighschool from "../gallery images/SENIOR HIGHSCOOL.jpeg";
import seniorHighschoolRecognition from "../gallery images/SENIOR HIGSCHOOL RECOGNITION.jpeg";
import socitRecognition1 from "../gallery images/SOCIT RECOGNITION 1.jpeg";
import socitRecognition2 from "../gallery images/SOCIT RECOGNITION 2.jpeg";

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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3);
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(0.5rem, 2vw, 1rem);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  background: rgba(233, 196, 106, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  
  @media (hover: hover) {
    &:hover {
      img {
        transform: scale(1.05);
      }
      .overlay {
        opacity: 1;
      }
    }
  }

  @media (hover: none) {
    .overlay {
      opacity: 1;
      background: rgba(26, 27, 47, 0.5);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 27, 47, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
  color: #E0F4FF;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(8px);
  transition: background 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;
`;

const ModalContent = styled(motion.div)`
  max-width: min(90%, 1200px);
  max-height: 90vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(0.5rem, 2vw, 1rem);
  border-radius: 12px;
  touch-action: none;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  @media (max-width: 768px) {
    max-width: 95%;
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  margin: 0 auto;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  border-radius: 50%;
  display: none; /* Hide by default */
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  min-width: 44px;
  min-height: 44px;
  
  @media (hover: hover) {
    display: flex; /* Show only on devices that can hover */
    
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 1rem;
`;

const NextButton = styled(NavigationButton)`
  right: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #E0F4FF;
  font-size: clamp(1.75rem, 4vw, 2rem);
  cursor: pointer;
  padding: clamp(0.3rem, 1vw, 0.5rem);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    top: -35px;
    right: -5px;
  }
`;

const ImageCaption = styled.div`
  color: #E0F4FF;
  text-align: center;
  margin-top: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  padding: 0 clamp(0.5rem, 2vw, 1rem);

  h3 { 
    margin-bottom: clamp(0.3rem, 1vw, 0.5rem);
    font-size: clamp(1.1rem, 3vw, 1.3rem);
  }

  p {
    opacity: 0.9;
    max-width: 65ch;
    margin: 0 auto;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    margin-top: 0.75rem;
  }
`;

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: window.innerWidth <= 768 ? 40 : 25,
      stiffness: window.innerWidth <= 768 ? 400 : 300,
      duration: window.innerWidth <= 768 ? 0.2 : 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: window.innerWidth <= 768 ? 0.15 : 0.3,
      ease: "easeOut"
    }
  }
};

function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dragConstraints = { left: 0, right: 0 };
  const swipeThreshold = 50;

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (selectedImage) {
      if (e.key === 'ArrowLeft') {
        handlePrevious(e);
      } else if (e.key === 'ArrowRight') {
        handleNext(e);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, selectedImage]);

  const images = [
    {
      src: family,
      caption: "Family",
      description: "Beautiful moments shared with my beloved family"
    },
    {
      src: bestFriends,
      caption: "Best Friends",
      description: "Precious moments with my closest friends"
    },
    {
      src: bidyuhiko1,
      caption: "Bidyuhiko 1",
      description: "Memorable moment with Bidyuhiko"
    },
    {
      src: bidyuhiko2,
      caption: "Bidyuhiko 2",
      description: "Captured memory with Bidyuhiko"
    },
    {
      src: bidyuhiko3,
      caption: "Bidyuhiko 3",
      description: "Special moment with Bidyuhiko"
    },
    {
      src: bidyuhiko4,
      caption: "Bidyuhiko 4",
      description: "Highlight of Bidyuhiko"
    },
    {
      src: graduation,
      caption: "Graduation",
      description: "Celebrating a significant milestone in my academic journey"
    },
    {
      src: gymBros,
      caption: "Gym Bros",
      description: "Great times with my workout partners and friends"
    },
    {
      src: seniorHighschool,
      caption: "Senior High School",
      description: "Memorable moments from my senior high school years"
    },
    {
      src: seniorHighschoolRecognition,
      caption: "Senior High School Recognition",
      description: "Proud moment of achievement in senior high school"
    },
    {
      src: socitRecognition1,
      caption: "SOCIT Recognition 1",
      description: "First recognition event at the School of Computing and Information Technologies"
    },
    {
      src: socitRecognition2,
      caption: "SOCIT Recognition 2",
      description: "Highlights of the ceremony at SOCIT recognition"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>Photo Gallery</Title>
        <GalleryGrid>
          {images.map((image, index) => (
            <ImageCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleImageSelect(image, index)}
            >
              <Image src={image.src} alt={image.caption} />
              <ImageOverlay className="overlay">
                {image.caption}
              </ImageOverlay>
            </ImageCard>
          ))}
        </GalleryGrid>

        <AnimatePresence mode="wait">
          {selectedImage && (
            <Modal
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={() => setSelectedImage(null)}
            >
              <ModalContent 
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={window.innerWidth <= 768 ? 0.4 : 0.7}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (Math.abs(swipe) >= swipeThreshold) {
                    if (swipe > 0) {
                      handlePrevious(e);
                    } else {
                      handleNext(e);
                    }
                  }
                }}
                animate={{
                  x: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: window.innerWidth <= 768 ? 400 : 300, 
                    damping: window.innerWidth <= 768 ? 40 : 30 
                  }
                }}
                whileDrag={{
                  scale: 0.95,
                  opacity: 0.9
                }}
              >
                <CloseButton onClick={() => setSelectedImage(null)} aria-label="Close image">×</CloseButton>
                <PrevButton 
                  onClick={handlePrevious} 
                  aria-label="Previous image"
                >
                  ❮
                </PrevButton>
                <NextButton 
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  ❯
                </NextButton>
                <ModalImage 
                  src={selectedImage.src} 
                  alt={selectedImage.caption} 
                  onClick={e => e.stopPropagation()}
                />
                <ImageCaption>
                  <h3>{selectedImage.caption}</h3>
                  <p>{selectedImage.description}</p>
                </ImageCaption>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </PageContainer>
    </motion.div>
  );
}

export default PhotoGallery;
