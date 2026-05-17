import React, { createContext, useContext, useState } from "react";


interface JobNotificationContextType {
    newJobsCount: number;
    setNewJobsCount: (count: number) => void;
    jobAlerts: any[];
    setJobAlerts: (alerts: any[]) => void;
}

const JobNotificationContext = createContext<JobNotificationContextType>({
    newJobsCount: 0,
    setNewJobsCount: () => {},
    jobAlerts: [],
    setJobAlerts: () => {},
});

export const JobNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [newJobsCount, setNewJobsCount] = useState(0);
    const [jobAlerts, setJobAlerts] = useState<any[]>([]);

    return (
        <JobNotificationContext.Provider value={{ newJobsCount, setNewJobsCount, jobAlerts, setJobAlerts }}>
            {children}
        </JobNotificationContext.Provider>
    );
};

export const useJobNotifications = () => useContext(JobNotificationContext);