import { useLocalStorageState } from './localStorageState';

const FONT_MAP = {
  serif: 'Georgia, serif',
  sans: 'Inter, system-ui, sans-serif',
  nunito: "'Nunito', system-ui, sans-serif",
  merriweather: "'Merriweather', serif",
};

export function useReaderSettings() {
  const [fontSize, setFontSize] = useLocalStorageState(1.8, 'reader-font-size');
  const [fontFamily, setFontFamily] = useLocalStorageState(
    'poppins',
    'reader-font-family',
  );

  return {
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    fontCss: FONT_MAP[fontFamily],
  };
}
