import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import HomeNavbar from "./components/HomeNavbar";
// import PostLayout from './components/PostLayout';
// import NavBar from './components/NavBar';
import { GlobalProvider } from "./context/GlobalState";
import HomeSignedIn from "./pages/HomeSignedIn";
import HomePage from "./pages/HomePage";
// import Profile from "./components/user/Profile";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path='/' element={<HomePage />} />
          <Route path="feed" element={<HomeSignedIn />} />
          <Route path='profile' element= {<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;


// <HomeNavbar />
// <PostLayout />
// <NavBar />
// <Outlet />
