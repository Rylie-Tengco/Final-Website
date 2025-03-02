import { useRef, useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

const PhotoboothContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  max-width: 600px;
  margin: 0 auto;
`;

const CameraView = styled.video`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  border: 2px solid #1A1B2F;
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PhotoStrip = styled.canvas`
  max-width: 100%;
  border-radius: 8px;
  border: 2px solid #1A1B2F;
  margin-top: 1rem;
`;

const CountdownOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const CameraViewContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const Photobooth = () => {
  const videoRef = useRef(null);
  const photoStripRef = useRef(null);
  const streamRef = useRef(null);
  const photosRef = useRef([]);
  
  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [photoStripGenerated, setPhotoStripGenerated] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsStarted(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsStarted(false);
    }
  }, []);

  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }, []);

  const generatePhotoStrip = useCallback(() => {
    const canvas = photoStripRef.current;
    const ctx = canvas.getContext('2d');
    const photoWidth = 200;
    const photoHeight = 150;
    const padding = 10;

    canvas.width = photoWidth + (padding * 2);
    canvas.height = (photoHeight * 4) + (padding * 5);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    photosRef.current.forEach((photoUrl, index) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          padding,
          padding + (index * (photoHeight + padding)),
          photoWidth,
          photoHeight
        );
      };
      img.src = photoUrl;
    });

    setPhotoStripGenerated(true);
  }, []);

  const downloadPhotoStrip = () => {
    const link = document.createElement('a');
    link.download = 'photo-strip.jpg';
    link.href = photoStripRef.current.toDataURL('image/jpeg');
    link.click();
  };

  const startPhotoSequence = useCallback(async () => {
    photosRef.current = [];
    setPhotosTaken(0);
    setPhotoStripGenerated(false);

    for (let i = 0; i < 4; i++) {
      setCountdown(3);
      await new Promise(resolve => {
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              resolve();
              return null;
            }
            return prev - 1;
          });
        }, 1000);
      });

      const photo = takePhoto();
      photosRef.current.push(photo);
      setPhotosTaken(prev => prev + 1);

      if (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    generatePhotoStrip();
    stopCamera();
  }, [takePhoto, stopCamera, generatePhotoStrip]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <PhotoboothContainer>
      <CameraViewContainer>
        <CameraView
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />
        {countdown && (
          <CountdownOverlay>{countdown}</CountdownOverlay>
        )}
      </CameraViewContainer>

      {!isStarted && !photoStripGenerated ? (
        <Button onClick={startCamera}>Start Photobooth</Button>
      ) : isStarted && !photoStripGenerated ? (
        <Button
          onClick={startPhotoSequence}
          disabled={countdown !== null}
        >
          Take Photos
        </Button>
      ) : null}

      <PhotoStrip
        ref={photoStripRef}
        style={{ display: photoStripGenerated ? 'block' : 'none' }}
      />

      {photoStripGenerated && (
        <>
          <Button onClick={downloadPhotoStrip}>Download Photo Strip</Button>
          <Button onClick={() => {
            setIsStarted(false);
            setPhotoStripGenerated(false);
            setPhotosTaken(0);
            photosRef.current = [];
          }}>Take Another Photo</Button>
        </>
      )}
    </PhotoboothContainer>
  );
};

export default Photobooth;