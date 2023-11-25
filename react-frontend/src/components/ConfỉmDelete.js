import React from "react";
import { request } from "../axios_helper";
import { toast } from "react-toastify";
function ConfirmDelete({field, id, closeConfirmDeleteModal}) {
  const handleDelete = () => {
    request("DELETE", `/api/v1/${field}/${id}`)
      .then((response) => {
        if (response.data.status === "200") {
          toast.success(response.data.message);
          closeConfirmDeleteModal();
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning("Có lỗi xảy ra trong quá trình xóa");
      });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeConfirmDeleteModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4">
            Bạn có chắc chắn muốn xóa không?
          </p>
          <div className="flex flex-row justify-evenly">
            <button
              className="bg-red-500 text-white p-2 rounded mt-4"
              onClick={handleDelete}
            >
              Xác nhận
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded mt-4"
              onClick={closeConfirmDeleteModal}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmDelete;
