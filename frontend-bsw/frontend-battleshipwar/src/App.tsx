import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './components/__utils/hooks/username-context'
import MainPage from './components/mainPage/mainPage'
import Navbar from './components/__utils/UI-Elements/navbar/navbar'
import './App.css'
import MainBoard from './components/boards/mainBoard'



function App() {

  // const [username, setUsername] = useState<string | undefined>()

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path="/boards/:roomid" element={<MainBoard />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
