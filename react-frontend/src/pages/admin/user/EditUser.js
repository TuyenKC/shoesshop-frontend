import React, { useState } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";
function EditUser({
  closeEditUserModal,
  openEditUserModal,
  editUser,
  getUserList,
}) {
  const [username, setUserName] = useState(editUser.username);
  const [fullname, setFullName] = useState(editUser.fullname);
  const [email, setEmail] = useState(editUser.email);
  const [phone, setPhone] = useState(editUser.phone);
  const [address, setAddress] = useState(editUser.address);
  const [role, setRole] = useState(editUser.role);
  const [status, setStatus] = useState(editUser.status);
  const handleEditUser = () => {
    
      const data = {
        username: username,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        role: role,
        status: status,
      };
      request("PUT", `/api/v1/users/${editUser.id}`, data)
        .then((response) => {
          if (response.data.status === "200") {
            getUserList();
            closeEditUserModal();
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API: " + error);
        });
    
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
          onClick={closeEditUserModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4">Chỉnh sửa người dùng</p>
          <p className="font-semibold">Tên tài khoản</p>
          <input
            type="text"
            placeholder="Nhập vào tên tài khoản"
            value={username}
            disabled
            className="w-full mb-4 px-2 border border-gray-400 bg-gray-400"
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
            onClick={handleEditUser}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditUser;
