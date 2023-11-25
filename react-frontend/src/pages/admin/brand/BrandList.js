import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import { toast } from "react-toastify";
import IconEdit from "../../../static/icons/IconEdit";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconDelete from "../../../static/icons/IconDelete";
function BrandList() {
  const [isAddBrandModalOpen, setAddBrandModal] = useState(false);
  const [isEditBrandModalOpen, setEditBrandModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterBrandList, setFilterBrandList] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [editBrand, setEditBrand] = useState();
  const [brands, setBrands] = useState([]);
  const openEditBrandModal = () => {
    setEditBrandModal(true);
  };
  const closeEditBrandModal = () => {
    setEditBrandModal(false);
  };
  const openAddBrandModel = () => {
    setAddBrandModal(true);
  };
  const closeAddBrandModal = () => {
    setAddBrandModal(false);
  };
  const updateEditBrand = (brand) => {
    setEditBrandModal(true);
    setEditBrand(brand);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (brand) => {
    setConfirmDeleteModal(true);
    setEditBrand(brand);
  };
  const getBrandList = () => {
    request("GET", "/api/v1/brand", {})
      .then((response) => {
        if (response.data.status === "200") {
          setBrands(response.data.data);
          setFilterBrandList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getBrandList();
  }, [isConfirmDeleteOpen]);
  const handleFilter = () => {
    let filterList = [];
    brands.forEach((brand) => {
      if (
        (brand.brandName.toLowerCase().includes(selectedBrandName.toLowerCase()) ||
          selectedBrandName === "Tất cả") &&
        (selectedStatus === "Tất cả" || brand.status === selectedStatus)
      ) {
        filterList.push(brand);
      }
    });
    setFilterBrandList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedBrandName, selectedStatus]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">Danh sách thương hiệu</h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddBrandModel}
      >
        Thêm nhãn hiệu
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên nhãn hiệu"
            value={selectedBrandName}
            onChange={(e) => setSelectedBrandName(e.target.value)}
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
            <th className="p-2 border-collapse border">Mô tả</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterBrandList &&
            filterBrandList.map((brand, index) => (
              <tr className="bg-gray-100" key={brand.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {brand.brandName}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {brand.description}
                </td>
                <td
                  className={
                    brand.status === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {brand.status}
                </td>
                <td className="pt-3 flex justify-center">
                  <div
                    onClick={() => updateEditBrand(brand)}
                    className="hover:cursor-pointer"
                  >
                    <IconEdit />
                  </div>
                  <div
                    onClick={() => openConfirmDeleteModal(brand)}
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
      {isAddBrandModalOpen && (
        <AddBrand
          openAddBrandModel={openAddBrandModel}
          closeAddBrandModal={closeAddBrandModal}
          getBrandList={getBrandList}
        />
      )}
      {isEditBrandModalOpen && (
        <EditBrand
          openEditBrandModel={openEditBrandModal}
          closeEditBrandModal={closeEditBrandModal}
          editBrand={editBrand}
          getBrandList={getBrandList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="brand"
          id={editBrand.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}

export default BrandList;
