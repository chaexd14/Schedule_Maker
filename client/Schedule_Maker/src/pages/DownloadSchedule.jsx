import "../App.css";
import ScheduleTemplate from "../template/scheduleTemplate";

function DownloadSchedule() {

  return (
    <>
      <div
        className="flex items-center justify-center"
        id="pdf-wrapper"
        style={{
          width: "1754px",
          height: "1240px",
          backgroundColor: "#FFFFFE",
          overflow: "visible",
        }}
      >
        <div className="w-max h-fit"
          style={{
            transform: "scale(0.9)",
          }}
        >
          
          <h1 className="w-full custom-font text-7xl text-center font-extrabold text-[#2B2C34] pointer-events-auto my-2">
          Your
          <span className="text-[#6246EA] font-extrabold text-8xl">
            Schedule
          </span>
        </h1>

        <div className="flex items-center justify-center h-fit">
            <div
              style={{
                width: "1920px",
                height: "1080px",
              }}
            >
              <ScheduleTemplate />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadSchedule;
