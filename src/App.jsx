import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import './App.css'
import Navbar from './Navbar'
import Tracker from './Tracker'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Tracker />
    </>
  )
}

export default App
