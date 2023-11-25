import React from "react";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import OrderHistoryList from "./OrderHistoryList";
import Error403 from "../../Error403";
function OrderHistory(){
    const { user, handleLogin, handleLogout } = useAuth(); 
    if (user.role !== "ROLE_USER") {
        return <Error403/>;
    }
    return (
        <div className="w-full h-screen flex">
            <SideBarHome
                user={user}
                handleLoginSuccess={handleLogin}
                handleLogout={handleLogout}
            />
            <OrderHistoryList user={user}></OrderHistoryList>
        </div>
        

    );
}
export default OrderHistory;