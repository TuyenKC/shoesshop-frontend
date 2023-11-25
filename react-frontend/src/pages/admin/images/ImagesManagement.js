import React from "react";
import ImagesList from "./ImagesList";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import Error403 from "../../Error403";

function ImagesManagement() {
    const { user, handleLogin, handleLogout } = useAuth(); 
    if (user.role !== "ROLE_STORE_OWNER" && user.role !== "ROLE_MODERATOR_INVENTORY") {
        return <Error403/>;
    }
    return (

        <div className="w-full h-screen flex">
        <SideBarHome
            user={user}
            handleLoginSuccess={handleLogin}
            handleLogout={handleLogout}
        />
        <ImagesList user={user}></ImagesList>
    </div>
    );
  }
  
  export default ImagesManagement;  
  
  
  
  
  