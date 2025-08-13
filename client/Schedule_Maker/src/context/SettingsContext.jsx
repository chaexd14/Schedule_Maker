import { createContext, useState, useContext } from "react";
import { hours12 } from "../data/12hour";
import { hours24 } from "../data/24hour";

const SettingsContext = createContext()

export function useSetting() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }){
  const [showSetting, setshowSetting] = useState(false);
  const [timeformat, settimeformat] = useState(hours12);
  
  const applySettings = (selectedFormat) => {
    settimeformat(selectedFormat === "12" ? hours12 : hours24);
    toggleSetting();
  };

  const toggleSetting = () => {
    setshowSetting((prev) => !prev);
  };
  
  return(
    <SettingsContext.Provider 
      value={{
        showSetting,
        timeformat,
        toggleSetting,
        applySettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}


