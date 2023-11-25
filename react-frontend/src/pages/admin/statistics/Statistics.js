import React from "react";
import SideBarHome from "../../SideBarHome";
import { useAuth } from "../../AuthProvider";
import StatisticsViewCard from "../../../components/StatisticViewCard";
import IconProduct from "../../../static/icons/IconProduct";
import IconBrand from "../../../static/icons/IconBrand";
import IconCategory from "../../../static/icons/IconCategory";
import IconUsers from "../../../static/icons/IconUsers";
import Error403 from "../../Error403";
import { Link } from "react-router-dom";
import IconOrder from "../../../static/icons/IconOrder";
function Statistics() {
  const fieldList = [
    { name: "product", icon: IconProduct },
    { name: "brand", icon: IconBrand },
    { name: "category", icon: IconCategory },
    { name: "users", icon: IconUsers },
    { name: "orders", icon: IconOrder },
  ];

  const { user, handleLogin, handleLogout } = useAuth();

  if (user.role !== "ROLE_STORE_OWNER") {
    return <Error403/>;
  }

  return (
    <div className="w-full h-screen flex">
      <SideBarHome
        user={user}
        handleLoginSuccess={handleLogin}
        handleLogout={handleLogout}
      />

      <div className="ml-[50px] mt-4">
        <div className="flex flex-row">
          {fieldList.map((field, index) => (
            <StatisticsViewCard key={index} field={field} />
          ))}
        </div>
        <Link to="/manage/statistic/revenue">
          <button className="mt-2 p-2 border rounded-md bg-green-700 text-white">
            Thống kê doanh thu
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Statistics;
