import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar'
import Home from './Pages/Home'

function App() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
export default App
