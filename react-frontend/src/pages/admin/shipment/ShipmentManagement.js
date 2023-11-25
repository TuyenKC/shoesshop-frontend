import React from "react";
import ShipmentList from "./ShipmentList";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import Error403 from "../../Error403";
function ShipmentManagement() {
    const { user, handleLogin, handleLogout } = useAuth(); 
    if (user.role !== "ROLE_STORE_OWNER" && user.role !== "ROLE_INVENTORY_STAFF") {
        return <Error403/>;
    }
    return (

        <div className="w-full h-screen flex">
        <SideBarHome
            user={user}
            handleLoginSuccess={handleLogin}
            handleLogout={handleLogout}
        />
        <ShipmentList></ShipmentList>
    </div>
    );
  }
  
  export default ShipmentManagement;  
  
  
  
  
  