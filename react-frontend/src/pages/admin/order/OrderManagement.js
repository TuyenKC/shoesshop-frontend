import React from "react";
import OrderList from "./OrderList";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import Error403 from "../../Error403";
function OrderManagement() {
    const { user, handleLogin, handleLogout } = useAuth(); 
    if (user.role !== "ROLE_STORE_OWNER" && user.role !== "ROLE_MODERATOR_SALES") {
        return <Error403/>;
    }
    return (

        <div className="w-full h-screen flex">
        <SideBarHome
            user={user}
            handleLoginSuccess={handleLogin}
            handleLogout={handleLogout}
        />
        <OrderList user={user}></OrderList>
    </div>
    );
  }
  
  export default OrderManagement;  
  
  
  
  
  