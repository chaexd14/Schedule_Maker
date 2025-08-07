import "./App.css";
import Squares from "./components/ui/Squares/Squares";
import { Times } from "./data/time";
import { hours12 } from "./data/12hour";
import { hours24 } from "./data/24hour";
import { Day } from "./data/day";
import { useState } from "react";
import AddSchedule from "./forms/addSchedule";
import ScheduleSetting from "./forms/ScheduleSetting";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

function App() {
  const scheduleRef = useRef(null);
  const [showForm, setshowForm] = useState(false);
  const [showSetting, setshowSetting] = useState(false);
  const [sched, setSched] = useState([]);
  const [timeformat, settimeformat] = useState(hours12);
  const [lowestStart, setLowestStart] = useState(0);
  const [highestStart, sethighestStart] = useState(16);
  const [calculatedHighest, setCalculatedHighest] = useState(16);

  const defaultWorkingHour = 16;
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(16);
  const [totalWorkingHour, setTotalWorkingHour] = useState(0);
  const [overTime, setOverTime] = useState(0);
  const [underTime, setUnderTime] = useState(0);

  const [schedForm, setschedForm] = useState({
    title: "",
    description: "",
    day: 0,
    start: 0,
    end: 1,
  });

  const applySettings = (selectedFormat) => {
    settimeformat(selectedFormat === "12" ? hours12 : hours24);

    toggleSetting();
  };

  const handleFormChange = (key, value) => {
    setschedForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSchedForm = () => {
    setshowForm((prev) => !prev);
  };

  const toggleSetting = () => {
    setshowSetting((prev) => !prev);
  };

  const scheduleMark = (e) => {
    e.preventDefault();

    const startTimeObj = Times.find((t) => t.value === schedForm.start);
    const endTimeObj = Times.find((t) => t.value === schedForm.end);

    const newSchedule = {
      title: schedForm.title,
      description: schedForm.description,
      starttime: startTimeObj,
      endtime: endTimeObj,
      column: schedForm.day,
      rowStart: schedForm.start,
      rowEnd: schedForm.end,
    };

    const updatedSched = [...sched, newSchedule];
    setSched(updatedSched);
    console.log(schedForm);

    const allStartValues = updatedSched.map((s) => s.rowStart);
    const allEndValues = updatedSched.map((s) => s.rowEnd);

    const lowestStart = Math.min(...allStartValues);
    const highestEnd = Math.max(...allEndValues);

    const lowestStartTime = Math.min(...allStartValues);
    const highestEndTime = Math.max(...allEndValues);

    let totalWorkingHour = highestEndTime - lowestStartTime;

    let overTime = totalWorkingHour - defaultWorkingHour;
    let underTime = defaultWorkingHour - totalWorkingHour;

    if (underTime <= 0) {
      underTime = 0;
    } else if (overTime <= 0) {
      overTime = 0;
    }

    // setter
    setStartTime(lowestStart);
    setEndTime(highestEnd);
    setTotalWorkingHour(totalWorkingHour);
    setOverTime(overTime);
    setUnderTime(underTime);

    console.log("Accumulated working hour", totalWorkingHour);
    console.log("Lowest start time", lowestStartTime);
    console.log("Highest end time", highestEndTime);
    console.log("Over time", overTime);
    console.log("Undert time", underTime);

    setschedForm({ title: "", description: "", day: 0, start: 0, end: 1 });
    toggleSchedForm();
  };

  const applyComputedStyles = (source, target) => {
    const computed = getComputedStyle(source);
    for (let prop of computed) {
      target.style.setProperty(prop, computed.getPropertyValue(prop), computed.getPropertyPriority(prop));
    }

    for (let i = 0; i < source.children.length; i++) {
      applyComputedStyles(source.children[i], target.children[i]);
    }
  };


  // download handler
  const downloadSchedule = async () => {
    if (!scheduleRef.current) return;

    const original = scheduleRef.current;

    const clone = original.cloneNode(true);
    applyComputedStyles(original, clone); // Apply full style cascade

    // Remove sticky from clone
    clone.querySelectorAll("[class*='sticky']").forEach((el) => {
      el.style.position = "static";
      el.style.top = "unset";
      el.style.zIndex = "0";
      el.style.backgroundColor = "#ffffff";
    });

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "-9999";
    container.style.backgroundColor = "#ffffff";
    container.style.width = original.scrollWidth + "px";
    container.style.height = original.scrollHeight + "px";
    container.style.padding = "0";
    container.style.margin = "0";
    container.style.fontFamily = "Arial, sans-serif"; // Force matching font
    container.appendChild(clone);
    document.body.appendChild(container);

    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(container, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const canvasRatio = canvas.width / canvas.height;
    const pageRatio = pageWidth / pageHeight;

    let renderWidth = pageWidth;
    let renderHeight = pageHeight;

    if (canvasRatio > pageRatio) {
      renderHeight = renderWidth / canvasRatio;
    } else {
      renderWidth = renderHeight * canvasRatio;
    }

    const xOffset = (pageWidth - renderWidth) / 2;
    const yOffset = (pageHeight - renderHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, renderWidth, renderHeight);
    pdf.save("schedule.pdf");
  };


  return (
    <>
      <main className="h-screen w-full bg-[#FFFFFE] relative">
        {/* Hoverable background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Squares
            speed={0.2}
            squareSize={40}
            direction="diagonal"
            borderColor="#D1D1E9"
            hoverFillColor="#D1D1E9"
          />
        </div>

        {/* Main content — allow hover to pass through */}
        <section className="relative z-10 flex flex-col items-center w-full h-screen px-10 pointer-events-none">
          {/* Forms */}
          {showForm && (
            <AddSchedule
              schedForm={schedForm}
              toggleSchedForm={toggleSchedForm}
              handleFormChange={handleFormChange}
              scheduleMark={scheduleMark}
            />
          )}
          {showSetting && (
            <ScheduleSetting
              toggleSetting={toggleSetting}
              applySettings={applySettings}
            />
          )}

          <h1 className="w-fit custom-font text-6xl text-center font-extrabold text-[#2B2C34] pointer-events-auto my-2">
            My
            <span className="text-[#6246EA] font-extrabold text-7xl">
              Schedule
            </span>
          </h1>

          {/* Main container */}
          <div className="flex flex-row w-full h-[calc(100vh-7rem)] overflow-hidden">
            {/* Schedule scroll area (both horizontal & vertical) */}
            <div className="flex-1 overflow-auto border-2 rounded-md bg-white border-[#2B2C34]  pointer-events-auto scrollbar-thin scrollbar-thumb-[#6246EA]/80 scrollbar-track-transparent mr-4">
              {/* Full grid content (can overflow in both directions) */}
              <div
                className="p-0 m-0 min-w-max min-h-max"
                ref={scheduleRef}
                style={{ minHeight: `${calculatedHighest * 80}px` }}
              >
                {/* Days Header */}
                <div className="bg-white pl-[100px] mb-3 grid grid-cols-7 sticky top-0 z-20">
                  {Day.map((d, i) => (
                    <div
                      key={i}
                      className="px-2 py-3 border-b border-l border-gray-300 "
                    >
                      <h1 className="text-center custom-font text-2xl font-bold text-[#2B2C34]">
                        {d.day}
                      </h1>
                    </div>
                  ))}
                </div>

                {/* Grid area */}
                <div className="flex">
                  {/* Time Column (sticky left) */}
                  <div
                    className="sticky left-0 z-10 bg-white border-t border-gray-300"
                    style={{
                      display: "grid",
                      gridTemplateRows: `repeat(${(defaultWorkingHour + 1) + (overTime + underTime) -underTime}, minmax(0, 1fr))`,
                    }}
                  >
                    {timeformat
                      .slice(
                        startTime,  
                        endTime < 16 ? 16 + 1 : endTime + 1 + underTime
                      )
                      .map((t, i) => (
                        <div
                          key={i}
                          className="relative w-[100px] text-xs flex items-center justify-center border-b border-gray-300"
                        >
                          <h1 className="absolute -top-[9px] text-[12px] bg-white">
                            {t.time}
                          </h1>
                        </div>
                      ))}
                  </div>

                  {/* Schedule Grid */}
                  <div
                    className="w-full bg-[#D1D1E9]10 border-t border-gray-300 relative"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                      gridTemplateRows: `repeat(${(defaultWorkingHour + 1) + (overTime + underTime) -underTime}, minmax(0, 1fr))`,
                    }}
                  >
                    {/* Always show empty grid cells */}
                    {Array.from({
                      length: 7 * ((defaultWorkingHour + 1) + (overTime + underTime) -underTime),
                    }).map((_, i) => (
                      <div
                        key={`cell-${i}`}
                        className="border-l border-b border-gray-300 min-w-[200px] min-h-[80px]"
                      />
                    ))}

                    {/* Then overlay schedules using absolute positioning inside the relative parent */}
                    {sched.map((s, i) => (
                      <div
                        key={i}
                        className="absolute p-1 border border-red-400"
                        style={{
                          top: `${(s.rowStart - startTime) * 80}px`,
                          left: `calc((100% / 7) * ${s.column})`,
                          height: `${(s.rowEnd - s.rowStart) * 80}px`,
                          width: `calc(100% / 7)`,
                        }}
                      >
                        <div className="flex flex-col gap-[2px] h-full border-2 border-[#6246EA] bg-[#D1D1E9] rounded-md overflow-auto scrollbar-none py-[2px] px-2">
                          <h3
                            className="text-[16px] text-[#2B2C34] text-center"
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {s.title}
                          </h3>
                          {s.description && s.description.trim() !== "" && (
                            <p className="text-sm text-[#2B2C34] break-words mb-[6px] text-justify">
                              {s.description}
                            </p>
                          )}
                          <p
                            className="text-[12px] text-[#2B2C34] text-center"
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
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
            <div className="flex flex-col gap-5 p-2 w-fit h-fit">
              <button
                className="pointer-events-auto normal-button"
                onClick={toggleSchedForm}
              >
                Add
              </button>
              <button
                className="pointer-events-auto normal-button"
                onClick={toggleSetting}
              >
                Settings
              </button>
              <button
                className="pointer-events-auto normal-button"
                onClick={downloadSchedule}
              >
                Download
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
