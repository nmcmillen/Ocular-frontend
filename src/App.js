import logo from './logo.svg';
import './App.css';
import HomeNavbar from "./components/HomeNavbar";
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  return (
    <div>
      <HomeNavbar />
      <LoginModal/>
      <SignupModal/>
    </div>
  );
}

export default App;
