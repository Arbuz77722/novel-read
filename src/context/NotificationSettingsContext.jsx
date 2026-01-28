import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorageState } from '../hooks/localStorageState';

const NotificationSettingsContext = createContext();

const STORAGE_KEY = 'notification_settings';

export function NotificationSettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorageState(
    {
      soundEnabled: true,
      counterEnabled: true,
    },
    STORAGE_KEY,
  );
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
      'useNotificationSettings must be used inside NotificationSettingsProvider',
    );
  return context;
}
