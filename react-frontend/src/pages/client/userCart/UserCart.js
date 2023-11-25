import React from "react";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import CartDetail from "./CartDetail";
import Error403 from "../../Error403";
function UserCart(){
    const { user, handleLogin, handleLogout } = useAuth(); 
    if (user.role !== "ROLE_USER") {
        return <Error403/>;
    }
    return(
        <div className="w-full h-screen flex">
            <SideBarHome
                user={user}
                handleLoginSuccess={handleLogin}
                handleLogout={handleLogout}
            />
            <CartDetail user={user}></CartDetail>
        </div>
    )
}
export default UserCart;