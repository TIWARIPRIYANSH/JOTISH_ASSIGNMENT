import { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Could not access camera. Please check permissions.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/jpeg');

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      onCapture(imageData);
    }
  };

  const handleCancel = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {error ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <p className="text-xl mb-4">{error}</p>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="max-w-full max-h-full"
            />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="p-6 flex justify-center gap-4">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
            <button
              onClick={takePicture}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Camera size={20} />
              <span>Take Picture</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
