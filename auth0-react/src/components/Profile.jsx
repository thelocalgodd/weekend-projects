import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name}
            className="rounded-full w-20 h-20 mx-auto" 
        />
        <h2 className="mx-auto flex justify-center w-fit mt-2">{user.name}</h2>
        <p className="mx-auto flex justify-center w-fit mt-2">{user.email}</p>
      </div>
    )
  );
};

export default Profile;