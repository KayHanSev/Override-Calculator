import { useState } from 'react'
import Override from './pages/override'
import { ScoreProvider } from './contexts/scoreContext'

function App() {

  return (
    <>
      <ScoreProvider>
        <Override />
      </ScoreProvider>
    </>
  )
}

export default App
