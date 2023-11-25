import React, { useEffect, useState } from "react";
import UploadImages from "./UploadImages";
import { request } from "../../../axios_helper";
import {toast} from "react-toastify";
function ImagesList({ user }) {
  const [images, setImages] = useState([]);
  const [isUploadImagesOpen, setUploadImagesOpen] = useState(false);

  useEffect(() => {
    request("GET", "/api/v1/images", {})
      .then((response) => {
        if (response.data.status === "200") {
          setImages(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, [isUploadImagesOpen]);
  const handleOpenUploadImages = () => {
    setUploadImagesOpen(true);
  };
  const handleCloseUploadImages = () => {
    setUploadImagesOpen(false);
  };
  return (
    <>
      <div className="ml-[40px] p-2">
        <h2 className="p-2 text-2xl font-semibold">
          Danh sách hình ảnh đã upload
        </h2>
        <button
          className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
          onClick={handleOpenUploadImages}
        >
          Thêm hình ảnh
        </button>
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div className="flex flex-col">
              <img
                className="w-40 h-40 hover:scale-110 duration-300"
                key={index}
                src={image.link}
              />
              <p className="font-bold">{image.title}</p>
            </div>
          ))}
        </div>
      </div>
      {isUploadImagesOpen && (
        <UploadImages
          user={user}
          handleCloseUploadImages={handleCloseUploadImages}
        ></UploadImages>
      )}
    </>
  );
}
export default ImagesList;
