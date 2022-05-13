import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import HomeSignedIn from "./pages/HomeSignedIn";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path='/' element={<HomePage />} />
          <Route path="feed" element={<HomeSignedIn />} />
          <Route path='profile' element= {<MyProfile />} />
          <Route path='userprofile/:username' element= {<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
