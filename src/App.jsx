import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import './App.css'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <Navbar />
    </>
  )
}

export default App
