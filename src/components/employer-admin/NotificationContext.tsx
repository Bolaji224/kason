import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { httpGetWithToken } from "../../utils/http_utils";
import { AppContext } from "../../global/state";

interface Notification {
  id: number;
  applicantName: string;
  jobTitle: string;
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
  refreshNotifications: () => void;
}

const STORAGE_KEY = "employer_read_notification_ids";

const getReadIds = (): Set<number> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveReadIds = (ids: Set<number>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {}
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllAsRead: () => {},
  markAsRead: () => {},
  refreshNotifications: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const readIdsRef = useRef<Set<number>>(getReadIds());

  const fetchAndBuild = useCallback(async () => {
    try {
      const response = await httpGetWithToken("employer/applications");
      const applications: any[] = response.data || [];

      const built: Notification[] = applications.map((app: any) => {
        // app.user is the candidate who applied — NOT the logged-in employer
        const candidateName =
          app.user?.name ||
          app.user?.full_name ||
          "Unknown Applicant";

        return {
          id: app.id,
          applicantName: candidateName,
          jobTitle: app.job?.title || app.job_title || "Unknown Job",
          timestamp: app.created_at || new Date().toISOString(),
          read: readIdsRef.current.has(app.id),
        };
      });

      built.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setNotifications(built);
    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchAndBuild();
    const interval = setInterval(fetchAndBuild, 30_000);
    return () => clearInterval(interval);
  }, [fetchAndBuild]);

  const markAsRead = (id: number) => {
    readIdsRef.current.add(id);
    saveReadIds(readIdsRef.current);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    notifications.forEach((n) => readIdsRef.current.add(n.id));
    saveReadIds(readIdsRef.current);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllAsRead,
        markAsRead,
        refreshNotifications: fetchAndBuild,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};