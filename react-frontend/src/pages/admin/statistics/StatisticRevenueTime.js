import React, {useState} from "react";
import { request } from "../../../axios_helper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validateDate } from "../../../components/Validate";
import BarChart from "../../../components/BarChart";
import {format} from "date-fns";
import {toast} from "react-toastify";
function StatisticsRevenueTime({handleCloseRevenueTime}) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenueList, setRevenueList] = useState([]);
    const formatDate = (date) => {
      return format(date, "yyyy-MM-dd");
    };
    const handleStatisticRevenueDate = () => {
      if(validateDate(startDate, endDate)){
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        request("GET",`/api/v1/orders/revenuedate?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,{})
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
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={handleCloseRevenueTime}>
          X
        </button>
        <div className="bg-white p-2 rounded">
            <p className="text-xl text-center mb-4 font-bold">Thống kê doanh thu theo ngày</p>
        <div className="w-full mb-4 px-2">
          <label htmlFor="startDate">Chọn ngày bắt đầu</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="ml-2 p-1 border border-gray-400 rounded-full"
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày bắt đầu" 
            aria-label="Ngày bắt đầu"
          />
          </div>

          <div className="w-full mb-4 px-2">
          <label htmlFor="expiredDate">Chọn ngày kết thúc</label>
          <DatePicker
            id="expiredDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="ml-2 p-1 border border-gray-400 rounded-full"
            placeholderText="Chọn ngày kết thúc" 
            aria-label="Ngày kết thúc"
          />
          </div>
          <button onClick={handleStatisticRevenueDate} className="bg-blue-500 text-white p-2 rounded mt-4">
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
export default StatisticsRevenueTime;