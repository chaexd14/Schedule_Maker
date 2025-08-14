import "../App.css";
import ScheduleTemplate from "../template/scheduleTemplate";
import Squares from "../components/ui/Squares/Squares";
function DownloadSchedule() {
  return (
    <>
      <div
        className="relative flex flex-col items-center justify-end"
        id="pdf-wrapper"
        style={{
          width: "1754px",
          height: "1240px",
          backgroundColor: "#FFFFFE",
          overflow: "visible",
        }}
      >
        <div className="absolute inset-0 z-0 w-full h-full">
          <Squares
            speed={0}
            squareSize={70}
            direction="diagonal"
            borderColor="#D1D1E9"
            hoverFillColor="#D1D1E9"
          />
        </div>

        <h1 className="top-[30px] absolute w-full custom-font text-8xl text-center font-extrabold text-[#2B2C34] pointer-events-auto my-2">
          Your
          <span className="text-[#6246EA] font-extrabold text-9xl">Title</span>
        </h1>

        <div
          className="flex flex-col items-start justify-end h-full"
          style={{
            transform: "scale(0.9)",
          }}
        >
          <div className="flex justify-between w-full px-20">
            <h3 className="bg-white">
              Made with: <span className="font-semibold">MySchedule.app</span>
            </h3>
            <h3 className="bg-white">
              Date: <span className="font-semibold">8/15/25</span>
            </h3>
          </div>
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
