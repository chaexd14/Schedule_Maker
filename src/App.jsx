import "./App.css";
import Squares from "./components/ui/Squares/Squares";
import { Times } from "./data/time";
import { Day } from "./data/day";
import { useState } from "react";

function App() {
  const [schedForm, setschedForm] = useState(false);
  const [sched, setSched] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [day, setDay] = useState(1)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)



  const toggleForm = () => {
    setschedForm((prev) => !prev);
  }

  const scheduleMark = (e) => {
    e.preventDefault();

    setSched([
      ...sched, {
        title,
        description,
        column: day,
        rowStart: start,
        rowEnd: end
      }
    ])
    console.log(title, description ,day, start, end);
  }

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
        <section className="relative z-10 h-screen w-full flex flex-col px-10 py-5 gap-3 pointer-events-none">
          <div className="h-fit w-full flex justify-center">
            <h1 className="custom-font text-6xl text-center font-extrabold text-[#2B2C34] pointer-events-auto">
              My{" "}
              <span className="text-[#6246EA] font-extrabold text-7xl">
                Schedule
              </span>
            </h1>
          </div>

          <div className="flex-1 flex flex-row gap-10 min-h-0">
            <div className="flex-1 border-4 bg-white/70 border-[#2B2C34] rounded-lg pt-8 px-14 box-border flex flex-col min-h-0 pointer-events-auto gap-2">
              <div className="h-fit w-full">
                <ul className="w-full flex justify-between text-center pl-[100px] pr-[20px]">
                  {Day.map((d, i) => (
                    <li
                      className="w-full custom-font text-[26px] font-semibold text-[#2B2C34] border border-red-400"
                      key={i}
                    >
                      {d.day}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 overflow-auto scrollbar scrollbar-thumb-[#6246EA] scrollbar-track-transparent border-t-4 border-x-4 border-[#2B2C34] rounded-t-md">
                <div className="h-[1500px] bg-white flex flex-row py-6">
                  <div className=" w-[100px] grid grid-rows-24 ">
                    {Times.map((t, i) => (
                      <div key={i} className="relative h-full text-center ">
                        <p className="w-full absolute top-0 translate-y-[-60%] text-[12px]">
                          {t.time}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="h-full w-full grid grid-rows-24 grid-cols-7 grid-flow-col border-t border-l border-gray-300">
                    {sched.map((s,i)=>(
                      <div
                        key={i}
                        className="border-2 border-[#6246EA] bg-[#D1D1E9]/20 h-full flex flex-col items-center justify-center overflow-hidden rounded-lg p-5"
                        style={{
                          gridColumnStart: s.column,
                          gridRowStart: s.rowStart + 1,
                          gridRowEnd: s.rowEnd + 1,
                        }}
                      >
                        <h3 className="text-xl font-semibold text-[#2B2C34] custom-font">{s.title}</h3>
                        <p className="text-sm text-[#2B2C34]">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-fit flex flex-col gap-3 border border-blue-400">
              <button
                className="normal-button pointer-events-auto"
                onClick={toggleForm}
              >
                Add
              </button>
              <button className="normal-button pointer-events-auto">
                Settings
              </button>
              <button className="normal-button pointer-events-auto">
                Download
              </button>
            </div>
          </div>

          {schedForm && (
            <div className="absolute h-full w-full bg-[#D1D1E9]/50 border border-red-400 top-0 left-0">
              <div className="h-full w-full flex justify-center items-center">
                <form className="flex flex-col gap-3 bg-white w-[400px] border-2 border-[#2B2C34] rounded-lg py-8 px-10 pointer-events-auto"
                  onSubmit={scheduleMark}
                >
                  <h1 className="custom-font text-3xl font-bold text-[#2B2C34] text-center">
                    Add
                    <span className="text-[#6246EA] text-5xl">Schedule</span>
                  </h1>

                  <div className="flex flex-col">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-input" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      required />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="form-label">Description</label>
                    <textarea className="form-input h-[70px] resize-none" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>                  

                  <div className="flex flex-col">
                    <label className="form-label">Day</label>
                    <select className="form-input px-2" 
                      value={day} 
                      onChange={(e) =>setDay(parseInt(e.target.value))}>
                      {Day.map((d,i) =>(
                        <option key={i} value={d.value}>{d.day}</option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full flex justify-center items-center gap-2">
                    <div className="w-full flex flex-col">
                      <label className="form-label">Start</label>
                      <select id="" className="form-input px-2" 
                        value={start}
                        onChange={(e) =>setStart(parseInt(e.target.value))}>
                        {Times.map((t,i) =>(
                          <option key={i} value={t.value}>{t.time}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full flex flex-col">
                      <label className="form-label">End</label>
                      <select id="" className="w-full form-input px-2" 
                        value={end}
                        onChange={(e) =>setEnd(parseInt(e.target.value))}>
                        {Times.map((t,i) =>(
                          <option key={i} value={t.value}>{t.time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 items-center">
                    <button type="submit" className="text-lg normal-button">
                      Add
                    </button>

                    <button
                      className="bg-transparent font-bold text-[#2B2C34] normal-button"
                      onClick={toggleForm}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
