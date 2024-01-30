import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button
  className="text-xl bg-sky-100 p-2 rounded-full flex mx-auto w-fit my-2" 
  onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;