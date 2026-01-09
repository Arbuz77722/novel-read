// import { useState, useEffect } from 'react';

// const STORAGE_KEY = 'notification_settings';

// const DEFAULT_SETTINGS = {
//   soundEnabled: true,
//   counterEnabled: true,
// };

// function sanitizeSettings(saved) {
//   return {
//     soundEnabled:
//       typeof saved.soundEnabled === 'boolean'
//         ? saved.soundEnabled
//         : DEFAULT_SETTINGS.soundEnabled,

//     counterEnabled:
//       typeof saved.counterEnabled === 'boolean'
//         ? saved.counterEnabled
//         : DEFAULT_SETTINGS.counterEnabled,
//   };
// }

// export function useNotificationSettings() {
//   const [settings, setSettings] = useState(() => {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return DEFAULT_SETTINGS;

//     try {
//       const parsed = JSON.parse(raw);
//       return sanitizeSettings(parsed);
//     } catch {
//       return DEFAULT_SETTINGS;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
//   }, [settings]);

//   return { settings, setSettings };
// }
