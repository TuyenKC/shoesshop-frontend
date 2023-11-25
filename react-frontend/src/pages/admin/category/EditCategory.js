import React, {useState} from "react";
import { request } from "../../../axios_helper";
import { validateCategoryName } from "../../../components/Validate";
import {toast} from "react-toastify";
function EditCategory({closeEditCategoryModal, openEditCategoryModal, editCategory, getCategoryList}) {
    const [name, setName] = useState(editCategory.categoryName);
    const [status, setStatus] = useState(editCategory.status);
    const handleEditCategory = () => {
      if(validateCategoryName(name)){
        const data = {
            categoryName : name,
            status: status
        }
        request("PUT",`/api/v1/category/${editCategory.id}`,data)
        .then((response) => {
          if(response.data.status === "200"){
            getCategoryList();
            closeEditCategoryModal();
            toast.success(response.data.message);
          }else{
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API: " + error)
        })
      }
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
      const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={closeEditCategoryModal}>
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">Chỉnh sửa danh mục</p>
          <p className="font-bold">Tên danh mục</p>
          <input
            type="text"
            placeholder="Tên danh mục"
            value={name}
            onChange={handleNameChange}
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
          <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={handleEditCategory}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
    );
}
export default EditCategory