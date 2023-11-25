import React, { useEffect } from "react";
import { request } from "../../../axios_helper";
import { Link } from "react-router-dom";

function PaymentStatus() {
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get("paymentstatus");
  const savedData = window.localStorage.getItem("order");
  const data = savedData ? JSON.parse(savedData) : null;
  const handleAddOrder = () => {
    if (status === "1" && data !== null && data !== "null") {
      data["paymentStatus"] = "Đã thanh toán";
      request("POST", "/api/v1/orders?action=make", data)
        .then((response) => {})
        .catch((error) => {
          console.log("Loi khi goi API: " + error);
        });
    }
    window.localStorage.setItem("order", "null");
  };
  useEffect(() => {
    handleAddOrder();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="border rounded-md border-green-700">
          {status === "1" && data !== "null" && data !== null ? (
            <>
            <p className="p-4 font-bold text-green-500">
                Trạng thái thanh toán: Thành công
            </p>
            <p className="p-4 font-bold text-green-500">
                Đơn hàng đã được lưu
            </p>
            </>
          ) : (
            <p className="p-4 font-bold text-red-500">Trạng thái thanh toán: Thất bại</p>
          )}
          <Link to="/orderhistory">
            <button className="p-2 m-4 border rounded bg-green-500">
              Xem lịch sử đặt hàng
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default PaymentStatus;
