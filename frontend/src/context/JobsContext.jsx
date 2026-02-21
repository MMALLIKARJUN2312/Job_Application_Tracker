import {createContext, useContext, useState} from 'react'

const JobsContext = createContext(null);

export const JobsProvider = ({children}) => {
    const [jobs, setJobs] = useState([]);

    return (
        <JobsContext.Provider value = {{jobs, setJobs}}>
            {children}
        </JobsContext.Provider>
    )
}

export const Jobs = () => {
    const context = useContext();

    if (!context) {
        throw new Error("useJobs must be used inside JobsProvider")
    }

    return context;
}