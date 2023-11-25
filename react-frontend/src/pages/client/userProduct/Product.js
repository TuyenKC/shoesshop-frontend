import React from "react";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import ProductList from "./ProductList";
function Product() {
    const { user, handleLogin, handleLogout } = useAuth(); 

    return (
        <div className="w-full h-screen flex">
            <SideBarHome
                user={user}
                handleLoginSuccess={handleLogin}
                handleLogout={handleLogout}
            />
            <ProductList user={user}></ProductList>
        </div>
        

    );
}

export default Product;
