import React from "react";
import SideBarHome from "./SideBarHome";
import { useAuth } from "./AuthProvider";
import TopProductList from "../pages/client/userProduct/TopProductList";
import SliderImages from "../components/SliderImages";
import banner1 from "../static/images/banner1.jpg";
import banner2 from "../static/images/banner2.jpg";
import banner3 from "../static/images/banner3.jpg";
function Home() {
  const { user, handleLogin, handleLogout } = useAuth();
  const images = [banner3, banner2, banner1];
  return (
    <>
      <div>
        <SideBarHome
          user={user}
          handleLoginSuccess={handleLogin}
          handleLogout={handleLogout}
        />
      </div>

      <div className="home-container">
        <div className="welcome-container">
          <p className="font-bold">Xin chào, {user.username}!</p>
        </div>
        <div>
          <SliderImages images={images}></SliderImages>
        </div>
        {(user.role === "guest" || user.role === "ROLE_USER") && (
          <>
            <hr className="mt-4 mb-4"></hr>
            <div>
              <p className="font-bold text-xl">
                Sản phẩm được đánh giá cao nhất
              </p>
              <TopProductList user={user} field="mostrate"></TopProductList>
            </div>
            <hr className="mt-4 mb-4"></hr>
            <div>
              <p className="font-bold text-xl">Sản phẩm được mua nhiều nhất</p>
              <TopProductList user={user} field="mostsold"></TopProductList>
            </div>
            <hr className="mt-4 mb-4"></hr>
            <div>
              <p className="font-bold text-xl">Sản phẩm được xem nhiều nhất</p>
              <TopProductList user={user} field="mostview"></TopProductList>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
