import { createContext, useState, useContext } from "react";
import { Times } from "../data/time";
import { useEffect } from "react";

const ScheduleContext = createContext();

export function useSchedule() {
  return useContext(ScheduleContext);
}

export function ScheduleProvider({ children }) {
  const defaultWorkingHour = 16;

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(16);
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

    console.log(sched)
    setStartTime(lowestStartTime);
    setEndTime(highestEndTime);
    setTotalWorkingHour(total);
    setOverTime(over);
    setUnderTime(under);

    setschedForm({ title: "", description: "", day: 0, start: 0, end: 1 });
    toggleSchedForm();

  };

  useEffect(() => {
    const saved = localStorage.getItem("schedData");
    if (saved) {
      setSched(JSON.parse(saved));
    }
  }, []);

  // Save data to localStorage whenever sched changes
  useEffect(() => {
    if (sched.length > 0) {
      localStorage.setItem("schedData", JSON.stringify(sched));
    }
  }, [sched]);

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
