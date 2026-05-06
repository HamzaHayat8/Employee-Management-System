import { loadModels, detectFace } from "../utils/faceModels";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

export function useFaceCapture() {
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Load models on mount; stop webcam on unmount
  useEffect(() => {
    loadModels()
      .then(() => setIsLoadingModels(false))
      .catch(() => toast.error("Failed to load face recognition models."));

    return () => stopWebcam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopWebcam = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCapturing(false);
  }, []);

  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCapturing(true);
    } catch {
      toast.error("Camera access denied or not available.");
    }
  }, []);

  const captureFace = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      const descriptor = await detectFace(videoRef.current);

      if (!descriptor) {
        toast.error("No face detected. Adjust lighting or position.");
        return;
      }

      setFaceDescriptor(Array.from(descriptor)); // Float32Array → plain array for JSON
      toast.success("Face captured successfully!");
    } catch {
      toast.error("Failed to capture face. Please try again.");
    }
  }, []);

  const resetDescriptor = useCallback(() => {
    setFaceDescriptor(null);
  }, []);

  return {
    videoRef,
    faceDescriptor,
    isCapturing,
    isLoadingModels,
    startWebcam,
    captureFace,
    resetDescriptor,
    stopWebcam,
  };
}
