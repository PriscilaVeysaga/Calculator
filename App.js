import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import Home from './src/screens/Home';
import { dark, light } from './src/themes';

export default function App() {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme = {theme}>
      <Home toggleTheme = {toggleTheme} />
    </ThemeProvider>
  );
}
