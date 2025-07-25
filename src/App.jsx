import "./App.css";
import Squares from "./components/ui/Squares/Squares";
import { Times } from "./data/time";
import { hours12 } from "./data/12hour";
import { Day } from "./data/day";
import { useState } from "react";
import AddSchedule from "./forms/addSchedule";
import ScheduleSetting from "./forms/ScheduleSetting";

function App() {
  const [showForm, setshowForm] = useState(false);
  const [showSetting, setshowSetting] = useState(false)
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

  const toggleSchedForm = () => {
    setshowForm((prev) => !prev)
  };

  const toggleSetting = () =>{
    setshowSetting((prev) => !prev)
  }

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
    setschedForm({ title: "", description: "", day: 0, start: 0, end: 1 });
    toggleForm();
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
        <section className="relative z-10 h-screen w-full flex flex-col items-center pointer-events-none px-10">

          {/* Forms */}
          {showForm&&(
          <AddSchedule
            schedForm={schedForm}
            toggleSchedForm={toggleSchedForm}
            handleFormChange={handleFormChange}
            scheduleMark={scheduleMark}
          />
          )}
          {showSetting&&(
            <ScheduleSetting 
              toggleSetting={toggleSetting}
            />
          )}

          <h1 className="w-fit custom-font text-6xl text-center font-extrabold text-[#2B2C34] pointer-events-auto my-2">
            My
            <span className="text-[#6246EA] font-extrabold text-7xl">
              Schedule
            </span>
          </h1>

          {/* Main container */}
          <div className="flex flex-row w-full h-[calc(100vh-7rem)] overflow-hidden border border-orange-400">
            {/* Schedule scroll area (both horizontal & vertical) */}
            <div className="flex-1 overflow-auto border bg-white border-blue-400 pointer-events-auto scrollbar-thin scrollbar-thumb-[#6246EA]/80 scrollbar-track-transparent mr-4">
              {/* Full grid content (can overflow in both directions) */}
              <div className="min-w-max min-h-max">
                {/* Days Header */}
                <div className="bg-white pl-[100px] mb-5 grid grid-cols-7 sticky top-0 z-20">
                  {Day.map((d, i) => (
                    <div key={i} className="border-b border-l border-red-400">
                      <h1 className="text-center custom-font text-2xl font-bold text-[#2B2C34]">{d.day}</h1>
                    </div>
                  ))}
                </div>

                {/* Grid area */}
                <div className="flex">
                  {/* Time Column (sticky left) */}
                  <div className="bg-white border-t grid border-gray-300 grid-rows-24 sticky left-0 z-10">
                    {hours12.map((t, i) => (
                      <div
                        key={i}
                        className="relative w-[100px] text-xs flex items-center justify-center border-b border-gray-300"
                      >
                        <h1 className="absolute -top-[9px] text-[12px] bg-white">{t.time}</h1>
                      </div>
                    ))}
                  </div>

                  {/* Schedule Grid */}
                  <div className="bg-[#D1D1E9]10 border-t border-l border-gray-300 grid grid-cols-7 grid-rows-24 relative">
                  {/* Always show empty grid cells */}
                  {Array.from({ length: 7 * 24 }).map((_, i) => (
                    <div
                      key={`cell-${i}`}
                      className="border-r border-b border-gray-300 min-w-[200px] min-h-[100px]"
                    />
                  ))}

                  {/* Then overlay schedules using absolute positioning inside the relative parent */}
                  {sched.map((s, i) => (
                    <div
                      key={`sched-${i}`}
                      className="absolute p-2"
                      style={{
                        top: `${s.rowStart * 100}px`,
                        left: `${s.column * 200}px`,
                        height: `${(s.rowEnd - s.rowStart) * 100}px`,
                        width: `200px`,
                      }}
                    >
                      <div className="flex flex-col gap-1 h-full border-2 border-[#6246EA] bg-[#D1D1E9] rounded-md overflow-auto scrollbar-none py-2 px-4">
                        <h3 className="text-2xl font-bold text-[#2B2C34] custom-font text-center">
                          {s.title}
                        </h3>
                        { s.description && s.description.trim() !== "" && (
                          <p className="text-sm text-[#2B2C34] break-words mb-[6px] text-justify">{s.description}</p>
                        )}
                        <p className="text-sm text-[#2B2C34] text-center font-semibold">
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
              <button className="normal-button pointer-events-auto" onClick={toggleSchedForm}>
                Add
              </button>
              <button className="normal-button pointer-events-auto" onClick={toggleSetting}>Settings</button>
              <button className="normal-button pointer-events-auto">Download</button>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}

export default App;
