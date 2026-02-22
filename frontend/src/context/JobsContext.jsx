import { createContext, useContext, useState } from "react";

// Create Context 

const JobsContext = createContext(null);

// Provider Component 

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
};

// Custom Hook

export const useJobs = () => {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("useJobs must be used inside JobsProvider");
  }

  return context;
};