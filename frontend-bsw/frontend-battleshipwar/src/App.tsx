import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './components/__utils/hooks/username-context'
import MainPage from './components/mainPage/mainPage'
import Navbar from './components/__utils/UI-Elements/navbar/navbar'
import './App.css'
import BoardAttackers from './components/boards/attackers/board-attackers'
import BoardDefenders from './components/boards/defenders/board-defenders'



function App() {

  // const [username, setUsername] = useState<string | undefined>()

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path="/boards-attackers/:roomid" element={<BoardAttackers />} />
          <Route path="/boards-defenders/:roomid" element={<BoardDefenders />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
