import * as faceapi from "face-api.js";
import { toast } from "react-hot-toast";

export const loadModels = async () => {
  try {
    const MODEL_URL = "/models"; // Make sure models are in public/models
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
  } catch (error) {
    console.error("Failed to load face models:", error);
    toast.error("Failed to load face recognition models");
  }
};

// Start Webcam
export const startWebcam = async (videoRef, streamRef, setIsCapturing) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 640, height: 480 },
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCapturing(true);
    }
  } catch (err) {
    toast.error("Unable to access camera: " + err.message);
  }
};

// Capture Face
export const captureFace = async (
  videoRef,
  canvasRef,
  setFaceDescriptor,
  setFaceImage,
) => {
  if (!videoRef.current) return;

  try {
    const detections = await faceapi
      .detectSingleFace(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      toast.error("No face detected! Adjust and try again.");
      return;
    }

    setFaceDescriptor(Array.from(detections.descriptor));

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    setFaceImage(canvas.toDataURL("image/jpeg"));

    toast.success("Face captured successfully!");
  } catch (error) {
    toast.error("Face capture failed.");
  }
};
