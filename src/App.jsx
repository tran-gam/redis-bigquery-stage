import { useState } from 'react'
import "./css/App.css"
import Home from "./pages/Home"
import { Routes, Route } from 'react-router-dom'
import Race from "./components/Race"
import Bookmarks from './pages/Bookmarks'
import NavBar from './components/NavBar'


function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>  
    </div>
  );
}

export default App
