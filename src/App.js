import './App.css';
import HomeNavbar from "./components/HomeNavbar";
import PostLayout from './components/PostLayout';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { GlobalProvider } from './context/GlobalState';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <GlobalProvider>
        {/* <NavBar />
        <Outlet /> */}
        <HomeNavbar />
        <PostLayout />
      </GlobalProvider>

    </div>
  );
}

export default App;
