import { Route, Routes } from 'react-router-dom'
import MainPage from './components/mainPage/mainPage'
import Navbar from './components/__utils/UI-Elements/navbar/navbar'
import { UserProvider } from './components/__utils/hooks/username-context'
import './App.css'




function App() {

  // const [username, setUsername] = useState<string | undefined>()

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path="/boards" element={<MainPage />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
