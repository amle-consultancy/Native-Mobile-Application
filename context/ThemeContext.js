import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const lightColors = {
  primary: '#1E6FD9',
  primaryLight: '#E6F0FF',
  secondary: '#4A5568',
  accent: '#38B2AC',
  success: '#48BB78',
  warning: '#F6AD55',
  error: '#E53E3E',
  background: '#F7FAFC',
  cardBackground: '#FFFFFF',
  text: '#1A202C',
  textSecondary: '#718096',
  border: '#E2E8F0',
  placeholder: '#A0AEC0',
  inputBackground: '#FFFFFF',
  shadow: '#000000',
  white: '#FFFFFF',
  black: '#000000',
  tabBackground: '#FFFFFF',
};

const darkColors = {
  primary: '#60A5FA',
  primaryLight: '#2D3748',
  secondary: '#A0AEC0',
  accent: '#4FD1C5',
  success: '#68D391',
  warning: '#F6AD55',
  error: '#FC8181',
  background: '#1A202C',
  cardBackground: '#2D3748',
  text: '#F7FAFC',
  textSecondary: '#CBD5E0',
  border: '#4A5568',
  placeholder: '#718096',
  inputBackground: '#2D3748',
  shadow: '#000000',
  white: '#FFFFFF',
  black: '#000000',
  tabBackground: '#171923',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('light'); // Default to light

  // Initialize theme based on system preference when the app loads
  useEffect(() => {
    setTheme(systemColorScheme || 'light');
  }, [systemColorScheme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Use the appropriate color palette based on the current theme
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};