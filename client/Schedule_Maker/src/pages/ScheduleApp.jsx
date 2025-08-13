import Squares from "../components/ui/Squares/Squares";
import { Day } from "../data/day";
import AddSchedule from "../forms/addSchedule";
import ScheduleSetting from "../forms/ScheduleSetting";
import { useSchedule } from "../context/ScheduleContext";
import { useSetting } from "../context/SettingsContext";

function ScheduleApp() {

  // Context provider for schedule
  const {
    defaultWorkingHour,
    sched,
    startTime,
    endTime,
    overTime,
    underTime,
    showForm,
    toggleSchedForm,
  } = useSchedule();

  // Context provider for schedule
  const {
    timeformat,
    showSetting,
    toggleSetting
  } = useSetting()

  // download handler
  const downloadSchedule = async () => {
    try {
      const res = await fetch("http://localhost:4000/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "schedule.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <>
      <main className="h-screen w-full bg-[#FFFFFE] relative">
        {/* Hoverable background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Squares
            speed={0.3}
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
            <AddSchedule />
          )}
          {showSetting && (
            <ScheduleSetting />
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
                style={{ minHeight: `${defaultWorkingHour * 80}px` }}
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
                      gridTemplateRows: `repeat(${((defaultWorkingHour + 1) + (overTime + underTime)) - underTime}, minmax(0, 1fr))`,
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
  )
}

export default ScheduleApp
