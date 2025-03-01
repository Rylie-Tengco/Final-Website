import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  height: 250px;
  background: #E9C46A;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    img {
      transform: scale(1.05);
    }

    .overlay {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(38, 70, 83, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
  color: white;
  text-align: center;
  font-size: 1.1rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  max-width: 90%;
  max-height: 90vh;
  position: relative;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const ImageCaption = styled.div`
  color: white;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.1rem;
`;

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: "https://picsum.photos/id/1018/800/600",
      caption: "Mountain Adventure",
      description: "Exploring the peaks of the mountain range"
    },
    {
      src: "https://picsum.photos/id/1015/800/600",
      caption: "River Valley",
      description: "Serene river flowing through the valley"
    },
    {
      src: "https://picsum.photos/id/1019/800/600",
      caption: "Forest Path",
      description: "A peaceful walk through the forest"
    },
    {
      src: "https://picsum.photos/id/1016/800/600",
      caption: "Ocean View",
      description: "Sunset at the beach"
    },
    {
      src: "https://picsum.photos/id/1020/800/600",
      caption: "City Lights",
      description: "Urban nightlife and architecture"
    },
    {
      src: "https://picsum.photos/id/1021/800/600",
      caption: "Desert Journey",
      description: "Adventure through the desert landscape"
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
              onClick={() => setSelectedImage(image)}
            >
              <Image src={image.src} alt={image.caption} />
              <ImageOverlay className="overlay">
                {image.caption}
              </ImageOverlay>
            </ImageCard>
          ))}
        </GalleryGrid>

        <AnimatePresence>
          {selectedImage && (
            <Modal
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              onClick={() => setSelectedImage(null)}
            >
              <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
                <ModalImage src={selectedImage.src} alt={selectedImage.caption} />
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
