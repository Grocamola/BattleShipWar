import { Route, Routes } from 'react-router-dom'
import MainPage from './components/mainPage/mainPage'

import './App.css'
import Navbar from './components/__utils/UI-Elements/navbar/navbar'


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
