import { useState, useEffect } from "react";
import "./App.css";
import { BackgroundEffect } from "./components/StarField";
import { Play, Pause, RotateCcw } from "lucide-react";
import "./animations.css"
function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [frenchTime, setFrenchTime] = useState(
    new Date().toLocaleString("fr-FR", { hour12: false })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFrenchTime(
        new Date().toLocaleString("fr-FR", { hour12: false })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
     setIsRunning(true)
  };
  const stopTimer = () => {
     setIsRunning(false)
  };
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return <div className="container">
      <BackgroundEffect />

      <header className="timer-header">
        {frenchTime}
      </header>

      <div className="timer">
        <div className="timer-number">
          <span className="timer-number-value">{minutes}</span>
          <span className="timer-number-label">:</span>
          <span className="timer-number-value">{seconds}</span>
        </div>

        <div className="timer-buttons">
          <button className="timer-button" onClick={resetTimer}>
            <RotateCcw />
          </button>

          <button className="timer-button" onClick={startTimer}>
            <Play />
          </button>

          <button className="timer-button" onClick={stopTimer}>
            <Pause />
          </button>
        </div>
      </div>
    </div>
}

export default App;
