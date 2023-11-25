import React from "react";
import CategoryList from "./CategoryList";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import Error403 from "../../Error403";
function CategoryManagement() {
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
        <CategoryList></CategoryList>
    </div>
    );
  }
  
  export default CategoryManagement;  
  
  
  
  
  