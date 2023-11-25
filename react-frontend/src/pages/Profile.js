import React, { useEffect, useState } from "react";
import SideBarHome from "./SideBarHome";
import { request } from "../axios_helper";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

function Profile() {
  const { user, handleLogin, handleLogout } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    request("GET", `/api/v1/users/profile/${user.username}`, {})
      .then((response) => {
        const dataUser = response.data.data;
        setId(dataUser.id);
        setEmail(dataUser.email === null ? "" : dataUser.email);
        setPhone(dataUser.phone === null ? "" : dataUser.phone);
        setAddress(dataUser.address === null ? "" : dataUser.address);
        setFullname(dataUser.fullname === null ? "" : dataUser.fullname);
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Không lấy được thông tin người dùng");
      });
  }, []);
  const handleUpdateProfile = () => {
    if (!email.endsWith("@gmail.com")) {
      toast.warning("Địa chỉ email không hợp lệ");
    }else if(phone.length !== 10 || !phone.startsWith("0")){
      toast.warning("Số điện thoại không hợp lệ");
    }
     else {
      const data = {
        email: email,
        phone: phone,
        address: address,
        fullname: fullname,
      };
      request("PUT", "/api/v1/users/" + id + "/updateprofile", data)
        .then((response) => {
          if (response.data.status === "200") {
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          toast.warning("Cập nhật thông tin thất bại");
        });
    }
  };
  return (
    <div>
      <SideBarHome
        user={user}
        handleLoginSuccess={handleLogin}
        handleLogout={handleLogout}
      />
      <div className="flex justify-center items-center h-screen">
        <div className="p-2 border border-blue-300 rounded">
          <h2 className="font-bold text-center">Thông tin cá nhân</h2>
          <p>Tên tài khoản</p>
          <input
            type="text"
            placeholder="Tên tài khoản"
            value={username}
            disabled
            className="w-full mb-4 px-2 border border-gray-400 bg-slate-300 rounded"
          />
          <p>Tên đầy đủ</p>
          <input
            type="text"
            placeholder="Tên đầy đủ"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />
          <p>Địa chỉ Email</p>
          <input
            type="email"
            placeholder="Địa chỉ Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />
          <p>Số điện thoại</p>
          <input
            type="number"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />
          <p>Địa chỉ</p>
          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />

          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleUpdateProfile}
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
