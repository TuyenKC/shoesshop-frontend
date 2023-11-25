import React, { useState } from "react";
import { request } from "../../../axios_helper";
import { validateBrandName } from "../../../components/Validate";
import { toast } from "react-toastify";
function EditBrand({
  closeEditBrandModal,
  openEditBrandModal,
  editBrand,
  getBrandList,
}) {
  const [name, setName] = useState(editBrand.brandName);
  const [description, setDescription] = useState(editBrand.description);
  const [status, setStatus] = useState(editBrand.status);
  const handleEditBrand = () => {
    if (validateBrandName(name)) {
      const data = {
        brandName: name,
        description: description,
        status: status,
      };
      request("PUT", `/api/v1/brand/${editBrand.id}`, data)
        .then((response) => {
          if (response.data.status === "200") {
            getBrandList();
            closeEditBrandModal();
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API: " + error);
        });
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeEditBrandModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">
            Chỉnh sửa nhãn hiệu
          </p>
          <p className="font-bold">Tên nhãn hiệu</p>
          <input
            type="text"
            placeholder="Tên nhãn hiệu"
            value={name}
            onChange={handleNameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Mô tả</p>
          <input
            type="text"
            placeholder="Mô tả"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Trạng thái</p>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleEditBrand}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditBrand;
