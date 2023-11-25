import React from "react";
import { Link } from "react-router-dom";
function Error403() {
  return (
    <>
      <p className="text-center font-semibold">
        403 Not Authorized - Bạn không có quyền sử dụng chức năng này
      </p>
      <Link to="/">
        <button className="p-1 border rounded-md bg-green-700 ml-[40%] text-white font-semibold">
          Quay lại trang chủ
        </button>
      </Link>
    </>
  );
}
export default Error403;
