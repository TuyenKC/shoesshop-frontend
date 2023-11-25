import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function CategoryList() {
  const [isAddCategoryModalOpen, setAddCategoryModal] = useState(false);
  const [isEditCategoryModalOpen, setEditCategoryModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [editCategory, setEditCategory] = useState();
  const [categorys, setCategorys] = useState([]);
  const openEditCategoryModel = () => {
    setEditCategoryModal(true);
  };
  const closeEditCategoryModal = () => {
    setEditCategoryModal(false);
  };
  const openAddCategoryModel = () => {
    setAddCategoryModal(true);
  };
  const closeAddCategoryModal = () => {
    setAddCategoryModal(false);
  };
  const updateEditCategory = (category) => {
    setEditCategoryModal(true);
    setEditCategory(category);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (category) => {
    setConfirmDeleteModal(true);
    setEditCategory(category);
  };
  const getCategoryList = () => {
    request("GET", "/api/v1/category", {})
      .then((response) => {
        if (response.data.status === "200") {
          setCategorys(response.data.data);
          setFilterCategoryList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getCategoryList();
  }, [isConfirmDeleteOpen]);
  const handleFilter = () => {
    let filterList = [];
    categorys.forEach((category) => {
      if (
        (category.categoryName.toLowerCase().includes(selectedCategoryName.toLowerCase()) ||
          selectedCategoryName === "Tất cả") &&
        (selectedStatus === "Tất cả" || category.status === selectedStatus)
      ) {
        filterList.push(category);
      }
    });
    setFilterCategoryList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedCategoryName, selectedStatus]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">Danh sách danh mục</h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddCategoryModel}
      >
        Thêm danh mục
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên danh mục"
            value={selectedCategoryName}
            onChange={(e) => setSelectedCategoryName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          />
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
            <th className="p-2 border-collapse border">Tên</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterCategoryList &&
            filterCategoryList.map((category, index) => (
              <tr className="bg-gray-100" key={category.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {category.categoryName}
                </td>
                <td
                  className={
                    category.status === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {category.status}
                </td>
                <td className="pt-3 flex justify-center hover:cursor-pointer">
                  <div
                    onClick={() => updateEditCategory(category)}
                    className="hover:cursor-pointer"
                  >
                    <IconEdit />
                  </div>
                  <div
                    onClick={() => openConfirmDeleteModal(category)}
                    className="hover:cursor-pointer"
                  >
                    <IconDelete />
                  </div>
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
      {isAddCategoryModalOpen && (
        <AddCategory
          openAddCategoryModel={openAddCategoryModel}
          closeAddCategoryModal={closeAddCategoryModal}
          getCategoryList={getCategoryList}
        />
      )}
      {isEditCategoryModalOpen && (
        <EditCategory
          openEditCategoryModel={openEditCategoryModel}
          closeEditCategoryModal={closeEditCategoryModal}
          editCategory={editCategory}
          getCategoryList={getCategoryList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="category"
          id={editCategory.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}

export default CategoryList;
