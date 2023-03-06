import { useEffect, useState } from "react";
import ClockAlarm from "./clock-alarm.mp3";

export function App() {
  const defaultTimeInMinutes = 0.1;

  let focusTimeInMinutes = defaultTimeInMinutes;
  let restTimeInMinutes = 0.1;

  const [isCounterActive, setIsCounterActive] = useState(false);
  const [time, setTime] = useState(defaultTimeInMinutes * 60);
  const [currentMode, setCurrentMode] = useState("focus");

  const clockAlarm = new Audio(ClockAlarm);

  clockAlarm.volume = 0.7;
  clockAlarm.loop = false;

  function setFocusMode() {
    document.body.classList.replace("bg-light-blue", "bg-light-red");
    setCurrentMode("focus");
    setTime(focusTimeInMinutes * 60);
  }

  function setRestMode() {
    setCurrentMode("rest");
    setTime(restTimeInMinutes * 60);
    document.body.classList.replace("bg-light-red", "bg-light-blue");
  }

  function handleResetTimer() {
    setIsCounterActive(false);

    if (currentMode === "focus") {
      setTime(focusTimeInMinutes * 60);
    }
    if (currentMode === "rest") {
      setTime(restTimeInMinutes * 60);
    }
  }

  function handleCounterActivity() {
    setIsCounterActive(!isCounterActive);
  }

  useEffect(() => {
    if (isCounterActive) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);

        if (time === 0) {
          handleResetTimer();
          clockAlarm.play();

          if (currentMode === "focus") {
            setRestMode();
          }

          if (currentMode === "rest") {
            setFocusMode();
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isCounterActive, time]);

  return (
    <div className="flex flex-col">
      <h1 className="font-nunito font-bold text-white text-3xl pt-4 pl-4">
        pomodoro
      </h1>

      <main className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex gap-3 items-center self-center mt-12 font-odibee-sans tracking-wider text-white text-7xl">
          <span>{String(Math.floor(time / 60)).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(Math.floor(time % 60)).padStart(2, "0")}</span>
        </div>

        <div className="flex items-center gap-6 self-center mt-20">
          <button
            className="text-white text-xl font-nunito font-semibold tracking-wide p-2 rounded-md border-2 border-[#fff] w-[12rem] shadow-lg hover:bg-white hover:text-light-red transition-all duration-150"
            onClick={handleCounterActivity}
          >
            {isCounterActive ? "pause" : "start"}
          </button>

          <button
            className="text-white text-xl font-nunito font-semibold tracking-wide p-2 rounded-md border-2 border-[#fff] w-[12rem] shadow-lg hover:bg-white hover:text-light-red transition-all duration-150"
            onClick={handleResetTimer}
          >
            reset
          </button>
        </div>
      </main>

      <footer className="flex justify-end absolute pr-2 pb-2 bottom-0 w-full">
        <span className="font-nunito text-white text-xl">
          Made with 💜 by{" "}
          <a href="https://github.com/arthur-lage">Arthur Lage</a>
        </span>
      </footer>
    </div>
  );
}
