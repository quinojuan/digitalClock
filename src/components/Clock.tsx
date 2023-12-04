import { useState, useEffect } from "react";

interface ClockState {
  hours: string;
  minutes: string;
  seconds: string;
}

const Clock = () => {
  const [clockState, setClockState] = useState<ClockState>();
  const [containerClass, setContainerClass] = useState("clock-container");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setClockState({
        hours: date.getHours().toString().padStart(2, "0"),
        minutes: date.getMinutes().toString().padStart(2, "0"),
        seconds: date.getSeconds().toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleFullscreen = () => {
    const root = document.documentElement;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
    } else {
      root.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    }
  };

  const toggleClockContainerClass = () => {
    setContainerClass((prevState) =>
      prevState === "clock-container"
        ? "black-clock-container"
        : "clock-container"
    );
  };

  return (
    <>
      <div className={containerClass}>
          {clockState
            ? `${clockState.hours}:${clockState.minutes}:${clockState.seconds}`
            : null}
      </div>
      <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
      <button onClick={toggleClockContainerClass}>Light - Dark</button>
    </>
  );
};

export default Clock;
