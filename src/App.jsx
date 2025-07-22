import "./App.css";
import Squares from "./components/ui/Squares/Squares";
import { Times } from "./data/time";
import { Day } from "./data/day";
import { useState } from "react";

function App() {
  const [schedForm, setschedForm] = useState(false);
  const [sched, setSched] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);

  const toggleForm = () => {
    setschedForm((prev) => !prev);
  };

  const scheduleMark = (e) => {
    e.preventDefault();

    const startTimeObj = Times.find((t) => t.value === start);
    const endTimeObj = Times.find((t) => t.value === end);

    setSched([
      ...sched,
      {
        title,
        description,
        starttime: startTimeObj.time,
        endtime: endTimeObj.time,
        column: day,
        rowStart: start,
        rowEnd: end,
      },
    ]);
    console.log(
      title,
      description,
      startTimeObj.time,
      endTimeObj.time,
      day,
      start,
      end
    );
  };

  return (
    <>
      <main className="h-screen w-full bg-[#FFFFFE] relative">
        {/* Hoverable background */}
        <div className="absolute inset-0 h-full w-full z-0">
          <Squares
            speed={0.2}
            squareSize={40}
            direction="diagonal"
            borderColor="#D1D1E9"
            hoverFillColor="#D1D1E9"
          />
        </div>

        {/* Main content — allow hover to pass through */}
        <section className="relative z-10 h-screen w-full flex flex-col items-center pointer-events-none">
          
          <h1 className="w-fit custom-font text-6xl text-center font-extrabold text-[#2B2C34] pointer-events-auto">
            My
            <span className="text-[#6246EA] font-extrabold text-7xl">
              Schedule
            </span>
          </h1>

          {/* Main container */}
          <div className="flex flex-row w-full h-[calc(100vh-6rem)] overflow-hidden border border-orange-400">
            {/* Schedule scroll area (both horizontal & vertical) */}
            <div className="flex-1 overflow-auto border border-blue-400 pointer-events-auto">
              {/* Full grid content (can overflow in both directions) */}
              <div className="min-w-max min-h-max">
                {/* Days Header */}
                <div className="pl-[80px] grid grid-cols-7 sticky top-0 z-10 border-violet-400">
                  {Day.map((d, i) => (
                    <div key={i} className="text-center font-semibold border border-red-400">
                      {d.day}
                    </div>
                  ))}
                </div>

                {/* Grid area */}
                <div className="flex">
                  {/* Time Column (sticky left) */}
                  <div className="grid grid-rows-24 sticky left-0 z-10">
                    {Times.map((t, i) => (
                      <div
                        key={i}
                        className="w-[80px] text-xs flex items-center justify-center border border-red-400"
                      >
                        {t.time}
                      </div>
                    ))}
                  </div>

                  {/* Schedule Grid */}
                  <div className="grid grid-cols-7 grid-rows-24">
                    {Array.from({ length: 7 * 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="border border-red-400 min-w-[300px] min-h-[40px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-fit h-fit border border-red-400 flex flex-col gap-5 p-2">
              <button className="normal-button pointer-events-auto" onClick={toggleForm}>
                Add
              </button>
              <button className="normal-button pointer-events-auto">Settings</button>
              <button className="normal-button pointer-events-auto">Download</button>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}

export default App;
