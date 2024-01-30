import HomePage from "./pages/HomePage";
import LoginButton from "./pages/LoginPage"
import { useAuth0 } from "@auth0/auth0-react";
import './index.css';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      {isAuthenticated ? <HomePage/> : <LoginButton/>}
    </>
  )
}

export default App
