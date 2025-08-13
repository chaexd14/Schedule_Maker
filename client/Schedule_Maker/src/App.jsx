import "./App.css";
import ScheduleApp from "./pages/ScheduleApp";
import DownloadSchedule from "./pages/DownloadSchedule";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScheduleProvider } from "./context/ScheduleContext";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  return (
    <BrowserRouter>
      <ScheduleProvider>
        <SettingsProvider>
          <Routes>
            <Route path="/" element={<ScheduleApp />} />
            <Route path="/print-schedule" element={<DownloadSchedule />} />
          </Routes>
        </SettingsProvider>
      </ScheduleProvider>
    </BrowserRouter>
  );
}

export default App;
