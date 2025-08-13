import { Times } from "../data/time";
import { Day } from "../data/day";
import { useSchedule } from "../context/ScheduleContext";

function AddSchedule() {
  const {
    schedForm,
    handleFormChange,
    toggleSchedForm,
    scheduleMark,
    showForm,
  } = useSchedule();

  if (!showForm) return null;
  
  return (
    <>
      <div className="absolute h-full w-full bg-[#D1D1E9]/50 z-50 border border-red-400 pointer-events-auto">
        <div className="flex items-center justify-center w-full h-full">
          <form
            className="flex flex-col gap-3 bg-white w-[400px] border-2 border-[#2B2C34] rounded-lg py-8 px-10 pointer-events-auto"
            onSubmit={scheduleMark}
          >
            <h1 className="custom-font text-3xl font-bold text-[#2B2C34] text-center">
              Add
              <span className="text-[#6246EA] text-5xl">Schedule</span>
            </h1>

            <div className="flex flex-col">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={schedForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="form-label">Description</label>
              <textarea
                className="form-input h-[70px] resize-none"
                value={schedForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="form-label">Day</label>
              <select
                className="px-2 form-input"
                value={schedForm.day}
                onChange={(e) =>
                  handleFormChange("day", parseInt(e.target.value))
                }
              >
                {Day.map((d, i) => (
                  <option key={i} value={d.value}>
                    {d.day}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center w-full gap-2">
              <div className="flex flex-col w-full">
                <label className="form-label">Start</label>
                <select
                  id=""
                  className="px-2 form-input"
                  value={schedForm.start}
                  onChange={(e) =>
                    handleFormChange("start", parseInt(e.target.value))
                  }
                >
                  {Times.map((t, i) => (
                    <option key={i} value={t.value}>
                      {t.time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className="form-label">End</label>
                <select
                  id=""
                  className="w-full px-2 form-input"
                  value={schedForm.end}
                  onChange={(e) =>
                    handleFormChange("end", parseInt(e.target.value))
                  }
                >
                  {Times.map((t, i) => (
                    <option key={i} value={t.value}>
                      {t.time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button type="submit" className="text-lg normal-button">
                Add
              </button>

              <button
                className="bg-transparent font-bold text-[#2B2C34] normal-button"
                onClick={toggleSchedForm}
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

export default AddSchedule;
