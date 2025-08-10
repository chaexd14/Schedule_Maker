import "./App.css";


import ScheduleApp from "./pages/ScheduleApp";
import ScheduleTemplate from "./template/scheduleTemplate";
import PrintSchedule from "./pages/PrintSchedule";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/print-schedule" element={<ScheduleTemplate />} />
        <Route path="/" element={<ScheduleApp />}/>
      </Routes>

 

    </>
  );
}

export default App;
