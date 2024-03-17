/** This is the actual top level component, doesn't do much cause it doesn't have to */

import { CssBaseline } from '@mui/material'
import './App.css'
import Navbar from './Navbar'
import Tracker from './Tracker'
function App() {

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Tracker />
    </>
  )
}

export default App
