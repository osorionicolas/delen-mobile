import React, { createContext, useState } from "react"
import { useColorScheme } from 'react-native'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(useColorScheme())
  const isDarkMode = theme === 'dark'

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
