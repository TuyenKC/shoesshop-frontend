import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function UserList() {
  const [isAddUserModalOpen, setAddUserModal] = useState(false);
  const [isEditUserModalOpen, setEditUserModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterUserList, setFilterUserList] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [editUser, setEditUser] = useState();
  const [users, setUsers] = useState([]);
  const role = {
    ROLE_USER: "Khách hàng",
    ROLE_MODERATOR_SALES: "Nhân viên bán hàng",
    ROLE_MODERATOR_INVENTORY: "Nhân viên kho",
    ROLE_STORE_OWNER: "Chủ cửa hàng",
  };
  const status = {
    true: "Active",
    false: "Disable",
  };
  const openEditUserModel = () => {
    setEditUserModal(true);
  };
  const closeEditUserModal = () => {
    setEditUserModal(false);
  };
  const openAddUserModel = () => {
    setAddUserModal(true);
  };
  const closeAddUserModal = () => {
    setAddUserModal(false);
  };
  const updateEditUser = (user) => {
    setEditUserModal(true);
    setEditUser(user);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (user) => {
    setConfirmDeleteModal(true);
    setEditUser(user);
  };
  const getUserList = () => {
    request("GET", "/api/v1/users", {})
      .then((response) => {
        if (response.data.status === "200") {
          setUsers(response.data.data);
          setFilterUserList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getUserList();
  }, [isConfirmDeleteOpen]);
  const handleFilter = () => {
    let filterList = [];
    users.forEach((user) => {
      if (
        (user.username.includes(selectedUserName) ||
          selectedUserName === "Tất cả") &&
        (selectedStatus === "Tất cả" ||
          (selectedStatus === "Active" && user.status === true) ||
          (selectedStatus === "Disabled" && user.status === false)) &&
        (selectedRole === "Tất cả" || user.role === selectedRole)
      ) {
        filterList.push(user);
      }
    });
    setFilterUserList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedUserName, selectedStatus, selectedRole]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">Danh sách người dùng</h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddUserModel}
      >
        Thêm người dùng
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">
            Tìm kiếm theo tên tài khoản:{" "}
          </p>
          <input
            type="text"
            placeholder="Nhập tên tài khoản"
            value={selectedUserName}
            onChange={(e) => setSelectedUserName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn chức vụ</p>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="ROLE_USER">Khách hàng</option>
            <option value="ROLE_MODERATOR_SALES">Nhân viên bán hàng</option>
            <option value="ROLE_MODERATOR_INVENTORY">Nhân viên kho</option>
            <option value="ROLE_STORE_OWNER">Chủ cửa hàng</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn trạng thái</p>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
      </div>
      <table className="m-2 border-collapse border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2 border-collapse border">STT</th>
            <th className="p-2 border-collapse border">Tên đầy đủ</th>
            <th className="p-2 border-collapse border">Tên tài khoản</th>
            <th className="p-2 border-collapse border">Email</th>
            <th className="p-2 border-collapse border">Số điện thoại</th>
            <th className="p-2 border-collapse border">Địa chỉ</th>
            <th className="p-2 border-collapse border">Chức vụ</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterUserList &&
            filterUserList.map((user, index) => (
              <tr className="bg-gray-100" key={user.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {user.fullname}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {user.username}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {user.email}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {user.phone}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {user.address}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {role[user.role]}
                </td>
                <td
                  className={
                    status[user.status] === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {status[user.status]}
                </td>
                {user.role !== "ROLE_STORE_OWNER" && (
                  <td className="pt-3 flex justify-center hover:cursor-pointer">
                    <div
                      onClick={() => updateEditUser(user)}
                      className="hover:cursor-pointer"
                    >
                      <IconEdit />
                    </div>
                    <div
                      onClick={() => openConfirmDeleteModal(user)}
                      className="hover:cursor-pointer"
                    >
                      <IconDelete />
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {isAddUserModalOpen && (
        <AddUser
          openAddUserModel={openAddUserModel}
          closeAddUserModal={closeAddUserModal}
          getUserList={getUserList}
        />
      )}
      {isEditUserModalOpen && (
        <EditUser
          openEditUserModel={openEditUserModel}
          closeEditUserModal={closeEditUserModal}
          editUser={editUser}
          getUserList={getUserList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="users"
          id={editUser.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}

export default UserList;
