import React, { useState } from "react";
import { request } from "../../../axios_helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";
import {
  validatePromotionCode,
  validatePromotionName,
  validateDate,
  validateDiscountValue,
} from "../../../components/Validate";
function AddPromotion({
  closeAddPromotionModal,
  openAddPromotionModal,
  getPromotionList,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [promotionType, setPromotionType] = useState();
  const [discountValue, setDiscountValue] = useState(0);
  const [startDate, setStartDate] = useState();
  const [expiredDate, setExpiredDate] = useState();
  const [status, setStatus] = useState("Active");
  const handleSavePromotion = () => {
    if (
      validatePromotionCode(discountCode) &&
      validatePromotionName(name) &&
      validateDiscountValue(promotionType,discountValue) &&
      validateDate(startDate, expiredDate)
    ) {
      const data = {
        promotionName: name,
        description: description,
        discountCode: discountCode,
        promotionType: promotionType,
        discountValue: discountValue,
        startDate: startDate,
        expiredDate: expiredDate,
        status: status,
      };
      request("POST", "/api/v1/promotion", data)
        .then((response) => {
          if(response.data.status === "200"){
            getPromotionList();
            closeAddPromotionModal();
            toast.success(response.data.message);
          }else{
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
  const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
  };
  const handlePromotionTypeChange = (event) => {
    setPromotionType(event.target.value);
  };
  const handleDiscountValueChange = (event) => {
    setDiscountValue(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeAddPromotionModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">
            Thêm chương trình khuyến mại
          </p>
          <p className="font-bold">Tên chương trình khuyến mại</p>
          <input
            type="text"
            placeholder="Tên chương trình khuyến mại"
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
          <p className="font-bold">Mã giảm giá</p>
          <input
            type="text"
            placeholder="Mã giảm giá"
            value={discountCode}
            onChange={handleDiscountCodeChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Loại giảm giá</p>
          <select
            value={promotionType}
            onChange={handlePromotionTypeChange}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="%">%</option>
            <option value="VND">VND</option>
          </select>
          <p className="font-bold">Giá trị giảm</p>
          <input
            type="number"
            placeholder="Giá trị giảm"
            value={discountValue}
            onChange={handleDiscountValueChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Chọn ngày bắt đầu</p>
          <div className="w-full mb-4 px-2 border border-gray-400">
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày bắt đầu"
              aria-label="Ngày bắt đầu"
            />
          </div>
          <p className="font-bold">Chọn ngày kết thúc</p>
          <div className="w-full mb-4 px-2 border border-gray-400">
            <DatePicker
              id="expiredDate"
              selected={expiredDate}
              onChange={(date) => setExpiredDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày kết thúc"
              aria-label="Ngày kết thúc"
            />
          </div>
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
            onClick={handleSavePromotion}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddPromotion;
