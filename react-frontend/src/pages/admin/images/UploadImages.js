import axios, { Axios } from "axios";
import React, { useState, useEffect } from "react";
import {toast} from "react-toastify";
import { request } from "../../../axios_helper";
function UploadImages({user, handleCloseUploadImages}){
    const [selectedFile, setSelectedFile] = useState();
    const [usersId, setUsersId] = useState();
    const handleChangeFile = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(event.target.files[0])
    }
    useEffect(() => {
        request("GET", `/api/v1/users/username/${user.username}`, {})
          .then((response) => {
                setUsersId(response.data.data.id);
          })
          .catch((error) => {
            toast.warning("Không lấy được thông tin người dùng");
          });
      },[])
    const addImages = (url) => {
        const data = {
            title : selectedFile.name,
            link: url,
            size: selectedFile.size,
            type: selectedFile.type,
            usersId: usersId
        }
        request("POST","/api/v1/images",data)
        .then((response) => {
            if (response.data.status === "200") {
                toast.success(response.data.message);
                handleCloseUploadImages();
              } else {
                toast.warning(response.data.message);
              }
            
        })
        .catch((error) => {
            console.log("Lỗi khi gọi API: " + error)
        })
    }
    const handleUploadFile = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset","yfikq9fv");
        axios.post("https://api.cloudinary.com/v1_1/dq7affw3h/image/upload", formData)
            .then( (response) => {
                console.log(response.data.url);
                addImages(response.data.url);
            })
            .catch( (error) => {
                toast.error("Upload hình ảnh thất bại");
            })
    }
    return(
        <>
            
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px] flex flex-col">
            <button className="text-white text-xl place-self-end" onClick={handleCloseUploadImages}>
            X
            </button>
            
            <div className="bg-white border rounded border-blue-400">
            <p className="text-xl text-center mt-2 font-bold">Thêm hình ảnh</p>
            <input className="p-2" type="file" onChange={handleChangeFile}/>
            <button onClick={handleUploadFile} className="bg-blue-500 text-white p-2 rounded mt-4">Upload Images</button>
            </div>    
            
            </div>
            </div>
            
        </>
    )
}
export default UploadImages;