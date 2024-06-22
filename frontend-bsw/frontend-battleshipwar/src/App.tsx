import { Route, Routes } from 'react-router-dom'
import MainPage from './components/mainPage/mainPage'

import './App.css'
import Navbar from './components/__utils/UI-Elements/navbar/navbar'



function App() {

  // const [username, setUsername] = useState<string | undefined>()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/boards" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
