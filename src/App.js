import './App.css';
import HomeNavbar from "./components/HomeNavbar";
import PostLayout from './components/PostLayout';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <div>
      <GlobalProvider>
        <NavBar />
        <Outlet />
      </GlobalProvider>
        {/* <HomeNavbar /> my custom navbar */}
        {/* <PostLayout /> my post layout */}

    </div>
  );
}

export default App;
