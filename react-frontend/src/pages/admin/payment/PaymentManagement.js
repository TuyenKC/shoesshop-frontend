import React from "react";
import PaymentList from "./PaymentList";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import Error403 from "../../Error403";
function PaymentManagement() {
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
        <PaymentList></PaymentList>
    </div>
    );
  }
  
  export default PaymentManagement;  
  
  
  
  
  