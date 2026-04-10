import { createContext, useState } from "react";

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

