import React, { useState, useEffect, useContext } from "react";

const OnlineStatusContext = React.createContext();

export function useOnlineStatus() {
  return useContext(OnlineStatusContext);
}

export const OnlineStatusProvider = ({ children }) => {
  const [onlineStatus, setOnlineStatus] = useState();

  useEffect(() => {
    setInterval(() => {
      const online = navigator.onLine;
      if(typeof online === "boolean"){
        setOnlineStatus(online);
      }
    }, 2000);
  }, []);

  return onlineStatus != null && (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};