import React, { useState } from "react";
import { request } from "../axios_helper";
import { setAuthToken } from "../axios_helper";
import Logo from "../static/images/logo.jpg";
import {toast} from "react-toastify";
import "../index.css";
function Login({ closeLoginModal, handleLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setMessage("");
  };

  const handleLogin = () => {
    if(username === ""){
      setMessage("Tên đăng nhập bị trống");
    }
    else if(password === ""){
      setMessage("Mật khẩu bị trống");
    }else{
      const loginData = {
        username: username,
        password: password,
      };
      
      request("POST", "/api/v1/auth/login", loginData)
        .then((response) => {
          if(response.data.status === "200"){
            setAuthToken(response.data.data.token)
            closeLoginModal();
            handleLoginSuccess(response);
            toast.success("Đăng nhập thành công");
          }else{
            setMessage(response.data.message);
          }
        })
        .catch((error) => {
          setMessage("Lỗi khi kết nối đến server");
          console.log(error);
        });
    }
    
  };

  return (
    <div className="modal">
      <div className="modal-container w-[500px]">
        <button className="modal-icon-close" onClick={closeLoginModal}>
          X
        </button>
        <div className="flex flex-col bg-white p-2 rounded-full">
        <p className="text-xl text-center font-bold">Đăng nhập</p>
        <div className="flex flex-row">
        <div className="p-2">
            <img className="logo" src={Logo} alt=""/>
        </div>
        <div className="flex flex-col justify-center">
          
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={handleUsernameChange}
            className="input-form"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={handlePasswordChange}
            className="input-form"
          />
          <p className="w-[180px] message-danger">{message}</p>
          <button className="button-submit" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>    
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
