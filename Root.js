import React from 'react'
import App  from './App'
import { ThemeProvider } from './src/providers/ThemeProvider'

const Root = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default Root
