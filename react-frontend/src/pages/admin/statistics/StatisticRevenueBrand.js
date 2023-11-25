import React, {useState} from "react";
import { request } from "../../../axios_helper";
import {toast} from "react-toastify";
import BarChart from "../../../components/BarChart";
function StatisticsRevenueBrand({handleCloseRevenueBrand}) {
    const [brandName, setBrandName] = useState("");
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenueList, setRevenueList] = useState([]);
    const handleBrandNameChange = (event) => {
      setBrandName(event.target.value);
    }
    const handleStatisticRevenueBrand = () => {
      request("GET",`/api/v1/orders/revenuebrand/${brandName}`,{})
      .then((response) => {
        if(response.data.status === "200"){
          setTotalRevenue(response.data.data.totalRevenue);
          setRevenueList(response.data.data.revenueDateList);
          console.log(response);
        }else{
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error)
      })
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={handleCloseRevenueBrand}>
          X
        </button>
        <div className="bg-white p-2 rounded">
            <p className="text-xl text-center mb-4 font-bold">Thống kê doanh thu theo nhãn hiệu</p>
            <p className="font-bold">Tên nhãn hiệu</p>
            <input
            type="text"
            placeholder="Tên nhãn hiệu"
            value={brandName}
            onChange={handleBrandNameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <button onClick={handleStatisticRevenueBrand} className="bg-blue-500 text-white p-2 rounded mt-4">
          Thống kê
        </button>
        <p className="font-bold">Tổng doanh thu: {totalRevenue} </p>
        <div className="mt-4">
            {revenueList.length > 0 && <BarChart data={revenueList} />}
          </div>
        </div>
      </div>
    </div>
    );
}
export default StatisticsRevenueBrand;