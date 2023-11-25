import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddShipment from "./AddShipment";
import EditShipment from "./EditShipment";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function ShipmentList() {
  const [isAddShipmentModalOpen, setAddShipmentModal] = useState(false);
  const [isEditShipmentModalOpen, setEditShipmentModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterShipmentList, setFilterShipmentList] = useState([]);
  const [selectedShipmentName, setSelectedShipmentName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [editShipment, setEditShipment] = useState();
  const [shipments, setShipments] = useState([]);
  const openEditShipmentModel = () => {
    setEditShipmentModal(true);
  };
  const closeEditShipmentModal = () => {
    setEditShipmentModal(false);
  };
  const openAddShipmentModel = () => {
    setAddShipmentModal(true);
  };
  const closeAddShipmentModal = () => {
    setAddShipmentModal(false);
  };
  const updateEditShipment = (shipment) => {
    setEditShipmentModal(true);
    setEditShipment(shipment);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (shipment) => {
    setConfirmDeleteModal(true);
    setEditShipment(shipment);
  };
  const getShipmentList = () => {
    request("GET", "/api/v1/shipment", {})
      .then((response) => {
        if (response.data.status === "200") {
          setShipments(response.data.data);
          setFilterShipmentList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getShipmentList();
  }, [isConfirmDeleteOpen]);
  const handleFilter = () => {
    let filterList = [];
    shipments.forEach((shipment) => {
      if (
        (shipment.shipmentUnit.toLowerCase().includes(selectedShipmentName.toLowerCase()) ||
          selectedShipmentName === "Tất cả") &&
        (selectedStatus === "Tất cả" || shipment.status === selectedStatus)
      ) {
        filterList.push(shipment);
      }
    });
    setFilterShipmentList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedShipmentName, selectedStatus]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">
        Danh sách phương thức vận chuyển
      </h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddShipmentModel}
      >
        Thêm phương thức vận chuyển
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên"
            value={selectedShipmentName}
            onChange={(e) => setSelectedShipmentName(e.target.value)}
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
            <th className="p-2 border-collapse border">Chi phí</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterShipmentList &&
            filterShipmentList.map((shipment, index) => (
              <tr className="bg-gray-100" key={shipment.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {shipment.shipmentUnit}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {shipment.description}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {shipment.shipmentCost}
                </td>
                <td
                  className={
                    shipment.status === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {shipment.status}
                </td>
                <td className="pt-3 flex justify-center hover:cursor-pointer">
                  <div
                    onClick={() => updateEditShipment(shipment)}
                    className="hover:cursor-pointer"
                  >
                    <IconEdit />
                  </div>
                  <div
                    onClick={() => openConfirmDeleteModal(shipment)}
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
      {isAddShipmentModalOpen && (
        <AddShipment
          openAddShipmentModel={openAddShipmentModel}
          closeAddShipmentModal={closeAddShipmentModal}
          getShipmentList={getShipmentList}
        />
      )}
      {isEditShipmentModalOpen && (
        <EditShipment
          openEditShipmentModel={openEditShipmentModel}
          closeEditShipmentModal={closeEditShipmentModal}
          editShipment={editShipment}
          getShipmentList={getShipmentList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="shipment"
          id={editShipment.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}

export default ShipmentList;
