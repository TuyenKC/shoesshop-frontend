import React, { useEffect, useState } from "react";
import { request } from "../../../axios_helper";
import { useNavigate  } from "react-router-dom";
import {toast} from "react-toastify";
import RateProduct from "../userRate/RateProduct";
function DetailOrder({user, order, handleCloseDetailOrder}){
    const [isRateProductOpen, setRateProductOpen] = useState(false);
    const [selectedOrdersItem, setSelectedOrdersItem] = useState();
    const handleCloseRateProduct = () =>{
        setRateProductOpen(false);
        handleCloseDetailOrder();  
    }
    const handleOpenRateProduct = (item) =>{
        setRateProductOpen(true);
        setSelectedOrdersItem(item);
    }
    return(
        <div className="fixed inset-0 overflow-y-scroll bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="flex justify-center items-center h-screen flex-col mt-[180px]">
            <button className="text-white text-xl place-self-end" onClick={handleCloseDetailOrder} >
                X
            </button>
            <div className="p-2 border border-blue-300 rounded bg-white">
            
            <h2 className="font-bold text-center">Thông tin đơn hàng</h2>
            
            <div className="flex flex-row gap-1">
                <div className="flex flex-col">
                <p>Tên người nhận</p>
            <input
            type="text"
            placeholder="Tên người nhận"
            value={order.nameReceiver}
            disabled
            className="w-full mb-4 px-2 border border-gray-400 rounded"
        />
                </div>
                <div className="flex flex-col">
                <p>Số điện thoại người nhận</p>
                <input
                type="number"
                placeholder="+84"
                value={order.phoneReceiver}
                disabled
                className="w-full mb-4 px-2 border border-gray-400 rounded"
            /> 
                </div>
        
            </div>
            
        <p>Địa chỉ người nhận</p>
            <input
            type="text"
            placeholder="Địa chỉ người nhận"
            value={order.addressReceiver}
            disabled
            className="w-full mb-4 px-2 border border-gray-400 rounded"
        />
        <p>Ghi chú</p>
            <input
            type="text"
            placeholder="Ghi chú"
            value={order.note}
            disabled
            className="w-full mb-4 px-2 border border-gray-400 rounded"
        />  
        
        <div className="flex flex-col">
        <p className="font-bold">Mã khuyến mãi: {order.promotionName}</p>
    </div>
    <div className="flex flex-col">
            <p className="font-bold">Phương thức vận chuyển: {order.shipmentUnit}</p>
            <p className="font-bold"></p>

        </div>
        <div className="flex flex-col">
            <p className="font-bold">Phương thức thanh toán: {order.paymentName}</p>
        <p className="font-bold">Sản phẩm</p>
        {
            order.ordersItems.map(ordersItem => 
                <div className="flex flex-row gap-5">
            <img className="h-20 w-18 object-cover" src={ordersItem.urlImagesList[0]} alt=""/>

            <div className="flex flex-col">
            <p>{ordersItem.productName}</p>
            <p>Kích cỡ: {ordersItem.size} Số lượng: {ordersItem.quantity}</p>
            </div>
            <div className="flex flex-col">
            <p>Đơn giá: {ordersItem.salePrice}</p>
            { order.status === "Giao thành công" && ordersItem.statusRate === "Chưa đánh giá" ? <button onClick={() => handleOpenRateProduct(ordersItem)}  className="p-1 bg-blue-400 text-white rounded">Đánh giá sản phẩm</button> : <></>}
            { order.status === "Giao thành công" && ordersItem.statusRate !== "Chưa đánh giá" ? <button  className="p-1 bg-gray-400 text-white rounded">Đã đánh giá </button> : <></>}
            
            </div>
            
            
        </div> )
        }    
        </div>
            <div className="flex flex-row justify-between">
                <p className="font-bold">Tổng tiền sản phẩm</p>
                <p className="font-bold">{order.totalPrice}</p>       
            </div>
            <div className="flex flex-row justify-between">
            <p className="font-bold">Tiền vận chuyển</p>
            <p className="font-bold">{order.shipmentCost}</p>       
        </div>
            <div className="flex flex-row justify-between">
            <p className="font-bold">Giá được giảm</p>
            <p className="font-bold">-{order.discountValue}</p>       
        </div>
        <div className="flex flex-row justify-between">
        <p className="font-bold text-red-400">Thành tiền</p>
        <p className="font-bold text-red-400">{order.totalPay}</p>       
        </div>
        <hr></hr>
        <div className="flex flex-row justify-between">
            <p className="font-bold">Trạng thái đơn hàng</p>
            <p className="font-bold">{order.status}</p>       
        </div>
        </div>
        </div>
        {isRateProductOpen && <RateProduct user = {user} selectedOrdersItem = {selectedOrdersItem} handleCloseRateProduct = {handleCloseRateProduct}></RateProduct>}
        </div>
        
        )
}
export default DetailOrder;