import { createContext, useContext, useEffect, useState } from 'react';

const NotificationSettingsContext = createContext();

const STORAGE_KEY = 'notification_settings';

export function NotificationSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          soundEnabled: true,
          counterEnabled: true,
        };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <NotificationSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </NotificationSettingsContext.Provider>
  );
}

export function useNotificationSettings() {
  const context = useContext(NotificationSettingsContext);
  if (!context)
    throw new Error(
      'useNotificationSettings must be used inside NotificationSettingsProvider'
    );
  return context;
}
