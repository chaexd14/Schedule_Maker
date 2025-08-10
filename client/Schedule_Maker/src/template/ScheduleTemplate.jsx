import "../App.css"
import { Day } from "../data/day"
import { hours12 } from "../data/12hour";

function ScheduleTemplate() {
  
    const sched = ([]);
    const timeformat = hours12
    const defaultWorkingHour = 8
    const startTime = 0
    const endTime = 3
    const totalWorkingHour = 3
    const overTime = 0
    const underTime = 13
    
  return (
    <>
    <div
    className="border border-blue-400 h-fit"
 id="pdf-wrapper"
  style={{
    width: '1754px',
    height: '1240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFE',
    overflow: 'hidden',
  }}
    >
      <div className={` bg-[#FFFFFE]`}
    id="schedule-container"
    style={{
      width: '1920px',
      height: '1080px',
      transform: 'scale(0.95)',
      backgroundColor: '#FFFFFE',
    }}
      >
        <section className="flex flex-col items-center justify-center w-full h-full border border-blue-400">
          <div className="flex w-full h-full overflow-hidden border border-red-400">
            <div className={`flex-1 overflow-auto border-2 rounded-md bg-white border-[#2B2C34]  pointer-events-auto scrollbar-thin scrollbar-thumb-[#6246EA]/80 scrollbar-track-transparent`}
            >
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
                        endTime < defaultWorkingHour ? defaultWorkingHour + 1 : endTime + 1 + underTime
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
                        className="border-l border-b border-gray-300 min-w-[200px] min-h-[75px]"
                      />
                    ))}

                    {/* Then overlay schedules using absolute positioning inside the relative parent */}
                    {sched.map((s, i) => (
                      <div
                        key={i}
                        className="absolute p-1 border border-red-400"
                        style={{
                          top: `${(s.rowStart - startTime) * 75}px`,
                          left: `calc((100% / 7) * ${s.column})`,
                          height: `${(s.rowEnd - s.rowStart) * 75}px`,
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
          </div>
        </section>
      </div>
      </div>
    </>
  )
}

export default ScheduleTemplate
