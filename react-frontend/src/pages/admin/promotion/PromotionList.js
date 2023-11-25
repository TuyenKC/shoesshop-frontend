import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddPromotion from "./AddPromotion";
import EditPromotion from "./EditPromotion";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function PromotionList() {
  const [isAddPromotionModalOpen, setAddPromotionModal] = useState(false);
  const [isEditPromotionModalOpen, setEditPromotionModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterPromotionList, setFilterPromotionList] = useState([]);
  const [selectedPromotionName, setSelectedPromotionName] = useState("");
  const [selectedPromotionType, setSelectedPromotionType] = useState("Tất cả");
  const [selectedPromotionExpired, setSelectedPromotionExpired] =
    useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [editPromotion, setEditPromotion] = useState();
  const [promotions, setPromotions] = useState([]);
  const openEditPromotionModel = () => {
    setEditPromotionModal(true);
  };
  const closeEditPromotionModal = () => {
    setEditPromotionModal(false);
  };
  const openAddPromotionModel = () => {
    setAddPromotionModal(true);
  };
  const closeAddPromotionModal = () => {
    setAddPromotionModal(false);
  };
  const updateEditPromotion = (promotion) => {
    setEditPromotionModal(true);
    setEditPromotion(promotion);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (promotion) => {
    setConfirmDeleteModal(true);
    setEditPromotion(promotion);
  };
  const getPromotionList = () => {
    request("GET", "/api/v1/promotion", {})
      .then((response) => {
        if (response.data.status === "200") {
          setPromotions(response.data.data);
          setFilterPromotionList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getPromotionList();
  }, [isConfirmDeleteOpen]);
  const handleFilter = () => {
    let filterList = [];
    promotions.forEach((promotion) => {
      if (
        (promotion.promotionName.toLowerCase().includes(selectedPromotionName.toLowerCase()) ||
          selectedPromotionName === "Tất cả") &&
        (selectedStatus === "Tất cả" || promotion.status === selectedStatus) &&
        (selectedPromotionType === "Tất cả" ||
          promotion.promotionType === selectedPromotionType) &&
        (selectedPromotionExpired === "Tất cả" ||
          (selectedPromotionExpired === "Expired" &&
            new Date(promotion.expiredDate).getTime() > new Date().getTime()) ||
          (selectedPromotionExpired === "NonExpired" &&
            new Date(promotion.expiredDate).getTime() <= new Date().getTime()))
      ) {
        filterList.push(promotion);
      }
    });
    setFilterPromotionList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [
    selectedPromotionName,
    selectedStatus,
    selectedPromotionType,
    selectedPromotionExpired,
  ]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">
        Danh sách chương trình khuyến mại
      </h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddPromotionModel}
      >
        Thêm chương trình khuyến mại
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên khuyến mại"
            value={selectedPromotionName}
            onChange={(e) => setSelectedPromotionName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn loại giảm giá</p>
          <select
            value={selectedPromotionType}
            onChange={(e) => setSelectedPromotionType(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="%">%</option>
            <option value="VND">VND</option>
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
        <div className="flex flex-col">
          <p className="font-bold">Lọc ngày</p>
          <select
            value={selectedPromotionExpired}
            onChange={(e) => setSelectedPromotionExpired(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Expired">Chưa kết thúc</option>
            <option value="NonExpired">Đã kết thúc</option>
          </select>
        </div>
      </div>
      <table className="m-2 border-collapse border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2 border-collapse border">STT</th>
            <th className="p-2 border-collapse border">Tên</th>
            <th className="p-2 border-collapse border">Mô tả</th>
            <th className="p-2 border-collapse border">Mã giảm giá</th>
            <th className="p-2 border-collapse border">Loại giảm giá</th>
            <th className="p-2 border-collapse border">Giá trị giảm</th>
            <th className="p-2 border-collapse border">Ngày bắt đầu</th>
            <th className="p-2 border-collapse border">Ngày kết thúc</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterPromotionList &&
            filterPromotionList.map((promotion, index) => (
              <tr className="bg-gray-100" key={promotion.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.promotionName}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.description}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.discountCode}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.promotionType}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.discountValue}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.startDate}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {promotion.expiredDate}
                </td>

                <td
                  className={
                    promotion.status === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {promotion.status}
                </td>
                <td className="pt-3 flex justify-center hover:cursor-pointer">
                  <div
                    onClick={() => updateEditPromotion(promotion)}
                    className="hover:cursor-pointer"
                  >
                    <IconEdit />
                  </div>
                  <div
                    onClick={() => openConfirmDeleteModal(promotion)}
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
      {isAddPromotionModalOpen && (
        <AddPromotion
          openAddPromotionModel={openAddPromotionModel}
          closeAddPromotionModal={closeAddPromotionModal}
          getPromotionList={getPromotionList}
        />
      )}
      {isEditPromotionModalOpen && (
        <EditPromotion
          openEditPromotionModel={openEditPromotionModel}
          closeEditPromotionModal={closeEditPromotionModal}
          editPromotion={editPromotion}
          getPromotionList={getPromotionList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="promotion"
          id={editPromotion.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}

export default PromotionList;
