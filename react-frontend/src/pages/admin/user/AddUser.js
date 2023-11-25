import React, { useState } from "react";
import { request } from "../../../axios_helper";
import {
  validatePassword,
  validateUsername,
  validatePhone,
} from "../../../components/Validate";
import { toast } from "react-toastify";
function AddUser({ closeAddUserModal, openAddUserModal, getUserList }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [status, setStatus] = useState("true");
  const handleSaveUser = () => {
    if (
      validateUsername(username) &&
      validatePassword(password) &&
      validatePhone(phone)
    ) {
      const data = {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        role: role,
        status: status,
      };
      request("POST", "/api/v1/users", data)
        .then((response) => {
          if(response.data.status === "200"){
            getUserList();
            closeAddUserModal();
            toast.success(response.data.message);
          }else{
            toast.warning(response.data.message);
          }
          
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API: " + error);
        });
    }
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFullnameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeAddUserModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">Thêm người dùng</p>
          <p className="font-semibold">Tên tài khoản</p>
          <input
            type="text"
            placeholder="Nhập vào tên tài khoản"
            value={username}
            onChange={handleUserNameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-semibold">Mật khẩu</p>
          <input
            type="password"
            placeholder="Nhập vào mật khẩu"
            value={password}
            onChange={handlePasswordChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-semibold">Tên đầy đủ</p>
          <input
            type="text"
            placeholder="Nhập vào họ tên đầy đủ"
            value={fullname}
            onChange={handleFullnameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-semibold">Địa chỉ email</p>
          <input
            type="email"
            placeholder="Địa chỉ email"
            value={email}
            onChange={handleEmailChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-semibold">Số điện thoại</p>
          <input
            type="number"
            placeholder="Số điện thoại"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-semibold">Địa chỉ</p>
          <input
            type="text"
            placeholder="Nhập vào địa chỉ của bạn, chính xác đến số nhà"
            value={address}
            onChange={handleAddressChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-semibold">Trạng thái người dùng</p>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </select>
          <p className="font-semibold">Vai trò người dùng</p>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="ROLE_MODERATOR_INVENTORY">Nhân viên kho</option>
            <option value="ROLE_MODERATOR_SALES">Nhân viên bán hàng</option>
            <option value="ROLE_USER">Khách hàng</option>
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleSaveUser}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddUser;
