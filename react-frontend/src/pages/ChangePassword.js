import React, { useState } from "react";
import SideBarHome from "./SideBarHome";
import { request } from "../axios_helper";
import { useAuth } from "./AuthProvider";
import { toast } from 'react-toastify';
function ChangePassword() {
  const {user, handleLogin, handleLogout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = () => {
    if(newPassword === ""){
      toast.warning("Mật khẩu cũ không được để trống");
    }else if(newPassword === ""){
      toast.warning("Mật khẩu mới không được để trống");
    }else if(newPassword.length < 6){
      toast.warning("Mật khẩu mới phải >= 6 ký tự");
    }
    else if (newPassword !== confirmNewPassword) {
      toast.warning("Mật khẩu mới và xác nhận mật khẩu mới không khớp");
    } else {
        const data = {
            oldPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmNewPassword
        }
        request("PUT", `/api/v1/auth/${user.username}/changepassword`, data )
        .then((response) => {
          if(response.data.status === "200"){
            toast.success("Cập nhật mật khẩu thành công");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
          }else{
            toast.warning(response.data.message);
          }
          
        })
        .catch((error) => {
          toast.error("Cập nhật mật khẩu thất bại");
        });
    }
  };

  return (
    <div>
      <SideBarHome user={user} handleLoginSuccess={handleLogin} handleLogout={handleLogout} />
      <div className="flex justify-center items-center h-screen">
          <div className="p-2 border border-blue-300 rounded">
        <h2 className="font-bold">Thay đổi mật khẩu</h2>
        <div className="mt-2 flex justify-evenly">
          <label>Mật khẩu hiện tại:</label>
          <input
            className="ml-2 pl-1 border border-gray-400 rounded"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mt-2 flex justify-evenly">
          <label>Mật khẩu mới:</label>
          <input
          className="ml-2 pl-1 border border-gray-400 rounded"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Xác nhận mật khẩu mới:</label>
          <input
          className="ml-2 pl-1 border border-gray-400 mt-2 rounded"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={handleChangePassword}>Đổi mật khẩu</button>
      </div>
      </div>
    </div>
  );
}

export default ChangePassword;
