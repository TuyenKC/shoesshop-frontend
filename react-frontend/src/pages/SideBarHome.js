import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import IconHome from "../static/icons/IconHome";
import IconBrand from "../static/icons/IconBrand";
import IconCategory from "../static/icons/IconCategory";
import IconCart from "../static/icons/IconCart";
import IconChangePassword from "../static/icons/IconChangePassword";
import IconHistory from "../static/icons/IconHistory";
import IconImage from "../static/icons/IconImage";
import IconLogout from "../static/icons/IconLogout";
import IconOrder from "../static/icons/IconOrder";
import IconPayment from "../static/icons/IconPayment";
import IconProduct from "../static/icons/IconProduct";
import IconProfile from "../static/icons/IconProfile";
import IconPromotion from "../static/icons/IconPromotion";
import IconRegister from "../static/icons/IconRegister";
import IconShipment from "../static/icons/IconShipment";
import IconStatistics from "../static/icons/IconStatistics";
import IconUsers from "../static/icons/IconUsers";
import IconLogin from "../static/icons/IconLogin";
import "../index.css";
function SideBarHome({ user, handleLoginSuccess, handleLogout }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };


  return (
    <div className="w-[40px] fixed h-screen bg-slate-300">
      {user.role === "guest" ? (
        <ul>
          <li className="sidebar-icon">
            <Link to="/">
              <IconHome />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/product">
              <IconProduct />
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
      {user.role === "ROLE_USER" ? (
        <ul>
          <li className="sidebar-icon">
            <Link to="/">
              <IconHome />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/product">
              <IconProduct />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/cart">
              <IconCart />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/orderhistory">
              <IconHistory />
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
      {user.role === "ROLE_MODERATOR_SALES" ? (
        <ul>
          <li className="sidebar-icon">
            <Link to="/">
              <IconHome />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/orders">
              <IconOrder />
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
      {user.role === "ROLE_MODERATOR_INVENTORY" ? (
        <ul>
          <li className="sidebar-icon">
            <Link to="/">
              <IconHome />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/product">
              <IconProduct />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/brand">
              <IconBrand />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/category">
              <IconCategory />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/images">
              <IconImage />
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
      {user.role === "ROLE_STORE_OWNER" ? (
        <ul>
          <li className="sidebar-icon">
            <Link to="/">
              <IconHome />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/statistic">
              <IconStatistics />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/product">
              <IconProduct />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/brand">
              <IconBrand />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/category">
              <IconCategory />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/orders">
              <IconOrder />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/images">
              <IconImage />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/promotion">
              <IconPromotion />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/shipment">
              <IconShipment />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/payment">
              <IconPayment />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/manage/user">
              <IconUsers />
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}

      {user.isLogined ? (
        <ul className="sidebar-bottom">
          <li className="sidebar-icon">
            <Link to="/changepassword">
              <IconChangePassword />
            </Link>
          </li>
          <li className="sidebar-icon">
            <Link to="/profile">
              <IconProfile />
            </Link>
          </li>
          <li className="sidebar-icon" onClick={handleLogout}>
            <IconLogout />
          </li>
        </ul>
      ) : (
        <ul className="sidebar-bottom">
          <li className="sidebar-icon" onClick={openLoginModal}>
            <IconLogin />
          </li>
          <li className="sidebar-icon" onClick={openRegisterModal}>
            <IconRegister />
          </li>
        </ul>
      )}
      {isLoginModalOpen && (
        <Login
          closeLoginModal={closeLoginModal}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
      {isRegisterModalOpen && (
        <Register closeRegisterModal={closeRegisterModal} />
      )}
    </div>
  );
}

export default SideBarHome;
