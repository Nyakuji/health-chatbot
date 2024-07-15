import React, { createContext, useState, useContext, useMemo } from 'react'
import propTypes from 'prop-types'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'

const ThemeContext = createContext({ mode: 'light', toggleTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light')

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === 'light' ? 'light' : 'dark',
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: propTypes.node.isRequired,
}
