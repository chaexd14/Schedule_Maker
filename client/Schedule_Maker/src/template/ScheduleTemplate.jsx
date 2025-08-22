import "../App.css";
import { Day } from "../data/day";
import { useSchedule } from "../context/ScheduleContext";
import { useSetting } from "../context/SettingsContext";
import { useEffect } from "react";

function ScheduleTemplate() {
  const { defaultWorkingHour, sched, startTime, endTime, overTime, underTime } = useSchedule();
  
  const { timeIncrement } = useSetting();

  const totalRows = defaultWorkingHour + 1 + (overTime + underTime) - underTime;

  // Total number of rows in the grid
  useEffect(() => {
    console.log("Total rows:", totalRows);
  }, [totalRows]);

  return (
    <>
      <div
        className="bg-white border-2 border-[#2B2C34] z-50 rounded-md"
        id="schedule-container"
        style={{
          width: "1920px",
          height: "1080px",
          backgroundColor: "#FFFFFE",
          transform: "scale(0.95)",
        }}
      >
        <section className="z-50 flex flex-col items-center justify-center w-full h-full">
          <div className="flex w-full h-full overflow-visible">
            <div className="flex-1 inter-events-auto scrollbar-thin scrollbar-thumb-[#6246EA]/80 scrollbar-track-transparent">
              {/* Full grid content */}
              <div className="flex flex-col w-full h-full gap-3 p-0 m-0">
                {/* Days Header */}
                <div className="flex flex-row items-center w-full pl-[180px]">

                  <div
                    className="sticky top-0 z-20 grid w-full grid-cols-7 "
                    style={{ height: "50px" }}
                  >
                    {Day.map((d, i) => (
                      <div
                        key={i}
                        className="px-2 py-3 border-b border-l border-gray-300"
                      >
                        <h1 className="text-center custom-font text-2xl font-bold text-[#2B2C34]">
                          {d.day}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid area */}
                <div className="flex flex-row justify-center items-center h-[calc(100%-50px)]">
                  {/* Time Column */}
                  <div
                    className="sticky z-10 w-[180px] border-t border-gray-300"
                    style={{
                      display: "grid",
                      gridTemplateRows: `repeat(${totalRows}, 1fr)`,
                      height: "100%",
                    }}
                  >
                    {timeIncrement
                      .slice(
                        startTime,
                        endTime < defaultWorkingHour
                          ? defaultWorkingHour + 1
                          : endTime + 1 + underTime
                      )
                      .map((t, i) => (
                        <div
                          key={i}
                          className="w-[180px] text-xs flex  items-center justify-center gap-2 border-b border-gray-200"
                        >
                          <h1 className="text-[14px] bg-white font-semibold">
                            {t.time1}
                          </h1>
                          <span className="font-semibold">-</span>
                          <h1 className="text-[14px] bg-white font-semibold">
                            {t.time2}
                          </h1>
                        </div>
                      ))}
                  </div>

                  {/* Schedule Grid */}
                  <div
                    className="w-full h-full bg-[#D1D1E9]10 relative border-t border-gray-300"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gridTemplateRows: `repeat(${totalRows}, 1fr)`,
                    }}
                  >
                    {/* Empty grid cells */}
                    {Array.from({ length: 7 * totalRows }).map((_, i) => (
                      <div
                        key={`cell-${i}`}
                        className="w-full h-full border-b border-l border-gray-200"
                      />
                    ))}

                    {/* Event overlays */}
                    {sched.map((s, i) => (
                      <div
                        key={i}
                        className="absolute p-2"
                        style={{
                          top: `calc((100% / ${totalRows}) * ${
                            s.rowStart - startTime
                          })`,
                          height: `calc((100% / ${totalRows}) * ${
                            s.rowEnd - s.rowStart
                          })`,
                          left: `calc((100% / 7) * ${s.column})`,
                          width: `calc(100% / 7)`,
                        }}
                      >
                        <div className="flex flex-col justify-start h-full border-2 border-[#6246EA] bg-[#D1D1E9] rounded-md overflow-auto scrollbar-none py-[8px] px-4">
                          <div className="flex flex-col h-full">
                            <h3
                              className="text-[16px] text-[#2B2C34] text-center h-fit"
                              style={{
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              {s.title}
                            </h3>
                            {s.description && s.description.trim() !== "" && (
                              <p className="text-sm text-[#2B2C34] break-words text-justify h-fit my-2">
                                {s.description}
                              </p>
                            )}
                            <p
                              className="text-[12px] text-[#2B2C34] text-center h-full"
                              style={{
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              {s.starttime.time1} - {s.endtime.time1}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ScheduleTemplate;
