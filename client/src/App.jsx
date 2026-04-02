import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect, useRef } from 'react'
import { getCurrentUser } from './services/api'

export const serverUrl = "http://localhost:8000"


function App() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;
    getCurrentUser();
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App