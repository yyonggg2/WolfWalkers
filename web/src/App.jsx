import { useEffect, useRef, useState } from "react";
import { createFaceLandmarker } from "./lib/faceLandmarker";
import "./App.css";
import { extractFaceFeatures } from "./lib/faceFeatures";

function drawLandmarks(ctx, landmarks, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#7cfc9c";
  for (const point of landmarks) {
    const x = point.x * width;
    const y = point.y * height;
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const landmarkerRef = useRef(null);
  const rafRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [landmarkCount, setLandmarkCount] = useState(0);
  const [features, setFeatures] = useState(null);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const landmarker = await createFaceLandmarker();
        if (cancelled) return;
        landmarkerRef.current = landmarker;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        if (cancelled) return;

        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();
        setStatus("running");

        const loop = () => {
          const canvas = canvasRef.current;
          if (canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          const results = landmarkerRef.current.detectForVideo(
            video,
            performance.now(),
          );
          const ctx = canvas.getContext("2d");
          const landmarks = results.faceLandmarks[0];
          if (landmarks) {
            drawLandmarks(ctx, landmarks, canvas.width, canvas.height);
            setLandmarkCount(landmarks.length);
            setFeatures(extractFaceFeatures(landmarks));
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setLandmarkCount(0);
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } catch (err) {
        console.error(err);
        if (!cancelled) setStatus(`error: ${err.message}`);
      }
    }

    start();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      landmarkerRef.current?.close();
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="app">
      <div className="stage">
        <video ref={videoRef} className="camera-feed" playsInline muted />
        <canvas ref={canvasRef} className="landmark-overlay" />
      </div>
      <div className="status-bar">
        status: {status} · landmarks: {landmarkCount}
        {features && (
          <>
            {" "}
            · jaw: {features.jawLineAngle.toFixed(2)} · eye:{" "}
            {features.eyeAngle.toFixed(2)} · ratio:{" "}
            {features.faceRatio.toFixed(2)} · eyeSpace:{" "}
            {features.eyeSpacing.toFixed(2)}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
