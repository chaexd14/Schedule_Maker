import { createContext, useState, useContext } from "react";
import { Times } from "../data/time";
import { useEffect } from "react";

const ScheduleContext = createContext();

export function useSchedule() {
  return useContext(ScheduleContext);
}

export function ScheduleProvider({ children }) {
  const defaultWorkingHour = 12;

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(12);
  const [totalWorkingHour, setTotalWorkingHour] = useState(0);
  const [overTime, setOverTime] = useState(0);
  const [underTime, setUnderTime] = useState(0);

  const [sched, setSched] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [schedForm, setschedForm] = useState({
    title: "",
    description: "",
    day: 0,
    start: 0,
    end: 1,
  });

  const toggleSchedForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormChange = (key, value) => {
    setschedForm((prev) => ({ ...prev, [key]: value }));
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

    const allStartValues = updatedSched.map((s) => s.rowStart);
    const allEndValues = updatedSched.map((s) => s.rowEnd);

    const lowestStartTime = Math.min(...allStartValues);
    const highestEndTime = Math.max(...allEndValues);

    let total = highestEndTime - lowestStartTime;
    let over = total - defaultWorkingHour;
    let under = defaultWorkingHour - total;

    if (under <= 0) under = 0;
    if (over <= 0) over = 0;

    setStartTime(lowestStartTime);
    setEndTime(highestEndTime);
    setTotalWorkingHour(total);
    setOverTime(over);
    setUnderTime(under);

    console.log(sched);
    console.log(
      `total: ${total} overtime: ${overTime} undertime: ${underTime}`
    );
    console.log(`total: ${total} overtime: ${over} undertime: ${under}`);

    setschedForm({ title: "", description: "", day: 0, start: 0, end: 1 });
    toggleSchedForm();
  };

  useEffect(() => {
    const saved = localStorage.getItem("schedData");
    if (saved) {
      setSched(JSON.parse(saved));
    }
  }, []);

  // Save data to localStorage whenever sched or time-related states change
  useEffect(() => {
    const savedData = localStorage.getItem("schedData");
    if (savedData) {
      const parsed = JSON.parse(savedData);

      setSched(Array.isArray(parsed.sched) ? parsed.sched : []);
      setStartTime(parsed.startTime ?? 0);
      setEndTime(parsed.endTime ?? 12);
      setTotalWorkingHour(parsed.totalWorkingHour ?? 0);
      setOverTime(parsed.overTime ?? 0);
      setUnderTime(parsed.underTime ?? 0);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      sched,
      startTime,
      endTime,
      totalWorkingHour,
      overTime,
      underTime,
    };
    localStorage.setItem("schedData", JSON.stringify(dataToSave));
  }, [sched, startTime, endTime, totalWorkingHour, overTime, underTime]);

  return (
    <ScheduleContext.Provider
      value={{
        defaultWorkingHour,
        schedForm,
        sched,
        startTime,
        endTime,
        totalWorkingHour,
        overTime,
        underTime,
        showForm,
        setSched,
        toggleSchedForm,
        handleFormChange,
        scheduleMark,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
