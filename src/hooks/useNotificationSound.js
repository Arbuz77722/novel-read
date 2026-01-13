import { useEffect, useRef } from 'react';

export function useNotificationSound(count, soundEnabled) {
  const audioRef = useRef(null);
  const prevCountRef = useRef(count);
  const mountedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/notification.wav');
    audioRef.current.volume = 0.6;
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevCountRef.current = count;
      return;
    }

    if (!soundEnabled) return;
    if (typeof count !== 'number') return;
    if (!audioRef.current) return;

    if (count > prevCountRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    prevCountRef.current = count;
  }, [count, soundEnabled]);
}
