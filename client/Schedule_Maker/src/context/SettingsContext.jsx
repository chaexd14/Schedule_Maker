import { createContext, useState, useContext } from "react";
import { hours12 } from "../data/12hour";
import { hours24 } from "../data/24hour";
import { Time_hour } from "../data/Time_hour";
import { Time_30mins } from "../data/Time_30mins";

import { Sample1 } from "../data/Sample1";
import { Sample2 } from "../data/Sample2";
import { Sample3 } from "../data/Sample3";

const SettingsContext = createContext()

export function useSetting() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }){
  const [showSetting, setshowSetting] = useState(false);
  const [clockType, setclockType] = useState(Sample1);
  const [timeIncrement, setTimeIncrement] = useState(Sample1);

  const applySettings = (selectedClockType,selectedTimeIncrement) => {
    // Clock type
    setclockType(selectedClockType === "12" ? hours12 : hours24);
    
    // Time increment
    if (selectedTimeIncrement === "hour") {
      setTimeIncrement(Sample1);
    } else if (selectedTimeIncrement === "minute30") {
      setTimeIncrement(Sample2);
    } else if (selectedTimeIncrement === "minute15") {
      setTimeIncrement(Sample3);
    }
      toggleSetting();
    };

  const toggleSetting = () => {
    setshowSetting((prev) => !prev);
  };
  
  return(
    <SettingsContext.Provider 
      value={{
        showSetting,
        clockType,
        timeIncrement,
        toggleSetting,
        applySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}


