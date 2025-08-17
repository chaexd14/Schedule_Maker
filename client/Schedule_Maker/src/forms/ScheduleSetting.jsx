import { useState } from "react";
import { useSetting } from "../context/SettingsContext";

function ScheduleSetting() {
  const {
    toggleSetting,
    applySettings
  } = useSetting()
  
  const [clockType, setclockType] = useState("12"); // default
  const [timeIncrement, setTimeIncrement] = useState("hour")

  const handleSubmit = (e) => {
    e.preventDefault();
    applySettings(clockType, timeIncrement);
  };

  return (
    <>
      <div className="absolute h-full w-full bg-[#D1D1E9]/50 z-50 border border-red-400 pointer-events-auto">
        <div className="flex items-center justify-center w-full h-full">
          <form className="flex flex-col gap-3 bg-white w-[400px] border-2 border-[#2B2C34] rounded-lg py-8 px-10 pointer-events-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="custom-font text-3xl font-bold text-[#2B2C34] text-center">
              Change
              <span className="text-[#6246EA] text-5xl">Settings</span>
            </h1>

            <div className="flex flex-col">
              <label className="form-label">Clock Type</label>
              <select className="w-full px-2 form-input"
                value={clockType}
                onChange={(e) => setclockType(e.target.value)}
              >
                <option value="24">24 Hour</option>
                <option value="12">12 Hour</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="form-label">Time Increment</label>
              <select className="w-full px-2 form-input"
                value={timeIncrement}
                onChange={(e) => setTimeIncrement(e.target.value)}
              >
                <option value="hour">1 Hour</option>
                <option value="minute30">30 Minutes</option>
                <option value="minute15">15 Minutes</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-2">
              <button type="submit" className="text-lg normal-button">
                Apply
              </button>

              <button
                className="bg-transparent font-bold text-[#2B2C34] normal-button"
                onClick={toggleSetting}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ScheduleSetting;
