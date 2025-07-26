function ScheduleSetting({
  toggleSetting
}) {
  return (
    <>
      <div className="absolute h-full w-full bg-[#D1D1E9]/50 z-50 border border-red-400 pointer-events-auto">
        <div className="h-full w-full flex justify-center items-center">
          <form className="flex flex-col gap-3 bg-white w-[400px] border-2 border-[#2B2C34] rounded-lg py-8 px-10 pointer-events-auto">
            <h1 className="custom-font text-3xl font-bold text-[#2B2C34] text-center">
              Change
              <span className="text-[#6246EA] text-5xl">Settings</span>
            </h1>

            <div className="flex flex-col">
              <label className="form-label">Time Format</label>
              <select className="w-full form-input px-2">
                <option>24 Hour</option>
                <option>12 Hour</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-2 items-center">
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
