import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./Home";
import Product from "../pages/client/userProduct/Product";
import Cart from "../pages/client/userCart/UserCart";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import OrderHistory from "../pages/client/userOrder/OrderHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./AuthProvider";
import BrandManagement from "./admin/brand/BrandManagement";
import CategoryManagement from "./admin/category/CategoryManagement";
import PaymentManagement from "./admin/payment/PaymentManagement";
import ShipmentManagement from "./admin/shipment/ShipmentManagement";
import ProductManagement from "./admin/product/ProductManagement";
import PromotionManagement from "./admin/promotion/PromotionManagement";
import OrderManagement from "./admin/order/OrderManagement";
import UserManagement from "./admin/user/UserManagement";
import ImagesManagement from "./admin/images/ImagesManagement";
import PaymentStatus from "../pages/client/userOrder/PaymentStatus";
import DetailProduct from "../pages/client/userProduct/DetailProduct";
import Statistics from "../pages/admin/statistics/Statistics";
import StatisticsRevenue from "../pages/admin/statistics/StatisticsRevenue";
function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          ></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/changepassword" element={<ChangePassword/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/product/:id" element={<DetailProduct/>}></Route>
          <Route path="/orderhistory" element={<OrderHistory/>}></Route>
          <Route path="/manage/brand" element={<BrandManagement/>}></Route>
          <Route path="/manage/category" element={<CategoryManagement/>}></Route>
          <Route path="/manage/payment" element={<PaymentManagement/>}></Route>
          <Route path="/manage/shipment" element={<ShipmentManagement/>}></Route>
          <Route path="/manage/product" element={<ProductManagement/>}></Route>
          <Route path="/manage/promotion" element={<PromotionManagement/>}></Route>
          <Route path="/manage/user" element={<UserManagement/>}></Route>
          <Route path="/manage/orders" element={<OrderManagement/>}></Route>
          <Route path="/manage/images" element={<ImagesManagement/>}></Route>
          <Route path="/manage/statistic" element={<Statistics/>}></Route>
          <Route path="/manage/statistic/revenue" element={<StatisticsRevenue/>}></Route>
          <Route path="/payment-status" element={<PaymentStatus/>}></Route>

          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
