import React, { useState } from "react";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import StatisticsRevenueTime from "./StatisticRevenueTime";
import StatisticsRevenueBrand from "./StatisticRevenueBrand";
import StatisticsRevenueProduct from "./StatisticRevenueProduct";
import Error403 from "../../Error403";
function StatisticsRevenue() {
    const { user, handleLogin, handleLogout } = useAuth();
    const [isRevenueTimeOpen, setRevenueTime] = useState(false);
    const [isRevenueProductOpen, setRevenueProduct] = useState(false);
    const [isRevenueBrandOpen, setRevenueBrand] = useState(false);
    if (user.role !== "ROLE_STORE_OWNER") {
        return <Error403/>;
    }
    const handleOpenRevenueTime = () => {
        setRevenueTime(true);
    }
    const handleOpenRevenueProduct = () => {
        setRevenueProduct(true);
    }
    const handleOpenRevenueBrand = () => {
        setRevenueBrand(true);
    }
    const handleCloseRevenueTime = () => {
        setRevenueTime(false);
    }
    const handleCloseRevenueProduct = () => {
        setRevenueProduct(false);
    }
    const handleCloseRevenueBrand = () => {
        setRevenueBrand(false);
    }
    if (user.role !== "ROLE_STORE_OWNER") {
        return <p className="text-center font-semibold">403 Not Authorized</p>;
    }
    return(
    <div className="w-full h-screen flex">
    <SideBarHome
        user={user}
        handleLoginSuccess={handleLogin}
        handleLogout={handleLogout}
    />
    <div className="ml-[50px] mt-4">
        <p className="p-2 text-2xl font-semibold">Thống kê doanh thu</p>  
        <button onClick={handleOpenRevenueTime} className="mt-2 p-2 border rounded-md bg-green-700 text-white mr-2">Thống kê theo thời gian</button>
        <button onClick={handleOpenRevenueProduct} className="mt-2 p-2 border rounded-md bg-green-700 text-white mr-2">Thống kê theo sản phẩm</button>
        <button onClick={handleOpenRevenueBrand} className="mt-2 p-2 border rounded-md bg-green-700 text-white mr-2">Thống kê theo nhãn hiệu</button>
    </div>
    {isRevenueTimeOpen && <StatisticsRevenueTime handleCloseRevenueTime = {handleCloseRevenueTime}></StatisticsRevenueTime>}
    {isRevenueBrandOpen && <StatisticsRevenueBrand handleCloseRevenueBrand = {handleCloseRevenueBrand}></StatisticsRevenueBrand>}
    {isRevenueProductOpen && <StatisticsRevenueProduct handleCloseRevenueProduct = {handleCloseRevenueProduct}></StatisticsRevenueProduct>}

    </div>
    )

}

export default StatisticsRevenue;