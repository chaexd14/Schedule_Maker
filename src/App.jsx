import "./App.css";
import Squares from "./components/ui/Squares/Squares";
import { Times } from "./data/time";
import { Day } from "./data/day";
import { useState } from "react";
import AddSchedule from "./forms/addSchedule";

function App() {
  const [showForm, setshowForm] = useState(false);
  const [sched, setSched] = useState([]);

  const [schedForm, setschedForm]= useState({
    title: "",
    description: "",
    day: 0,
    start: 0,
    end: 1
  })

  const handleFormChange = (key, value) => {
    setschedForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleForm = () => {
    setshowForm((prev) => !prev);
  };

  const scheduleMark = (e) => {
    e.preventDefault();

    const startTimeObj = Times.find((t) => t.value ===schedForm.start);
    const endTimeObj = Times.find((t) => t.value === schedForm.end);

    setSched([
      ...sched,
      {
        title: schedForm.title,
        description: schedForm.description,
        starttime: startTimeObj,
        endtime: endTimeObj,
        column: schedForm.day,
        rowStart: schedForm.start,
        rowEnd: schedForm.end,
      },
    ]);
    console.log(schedForm);
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

          {/* Forms */}
          {showForm&&(
          <AddSchedule
            schedForm={schedForm}
            toggleForm={toggleForm}
            handleFormChange={handleFormChange}
            scheduleMark={scheduleMark}
          />
          )}

          <h1 className="w-fit custom-font text-6xl text-center font-extrabold text-[#2B2C34] pointer-events-auto">
            My
            <span className="text-[#6246EA] font-extrabold text-7xl">
              Schedule
            </span>
          </h1>

          {/* Main container */}
          <div className="flex flex-row w-full h-[calc(100vh-6rem)] overflow-hidden border border-orange-400">
            {/* Schedule scroll area (both horizontal & vertical) */}
            <div className="flex-1 overflow-auto border bg-white border-blue-400 pointer-events-auto">
              {/* Full grid content (can overflow in both directions) */}
              <div className="min-w-max min-h-max">
                {/* Days Header */}
                <div className="bg-white pl-[80px] mb-5 grid grid-cols-7 sticky top-0 z-20">
                  {Day.map((d, i) => (
                    <div key={i} className="text-center border-b border-l border-red-400">
                      {d.day}
                    </div>
                  ))}
                </div>

                {/* Grid area */}
                <div className="flex">
                  {/* Time Column (sticky left) */}
                  <div className="bg-white border-t grid border-red-400 grid-rows-24 sticky left-0 z-10">
                    {Times.map((t, i) => (
                      <div
                        key={i}
                        className="relative w-[80px] text-xs flex items-center justify-center border-b border-l border-red-400"
                      >
                        <h1 className="absolute -top-[10px]">{t.time}</h1>
                      </div>
                    ))}
                  </div>

                  {/* Schedule Grid */}
                  <div className="bg-slate-200 border-t border-l border-red-400 grid grid-cols-7 grid-rows-24 relative">
                  {/* Always show empty grid cells */}
                  {Array.from({ length: 7 * 24 }).map((_, i) => (
                    <div
                      key={`cell-${i}`}
                      className="border-r border-b border-red-400 min-w-[200px] min-h-[80px]"
                    />
                  ))}

                  {/* Then overlay schedules using absolute positioning inside the relative parent */}
                  {sched.map((s, i) => (
                    <div
                      key={`sched-${i}`}
                      className="absolute bg-slate-200 p-2"
                      style={{
                        top: `${s.rowStart * 80}px`,
                        left: `${s.column * 200}px`,
                        height: `${(s.rowEnd - s.rowStart) * 80}px`,
                        width: `200px`,
                      }}
                    >
                      <div className="h-full border border-[#6246EA] bg-[#D1D1E9] rounded">
                        <h3 className="text-base font-semibold text-[#2B2C34] custom-font">
                          {s.title}
                        </h3>
                        <p className="text-sm text-[#2B2C34]">{s.description}</p>
                        <p className="text-sm text-[#2B2C34]">
                          {s.starttime.time} - {s.endtime.time}
                        </p>
                        </div>
                    </div>
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
