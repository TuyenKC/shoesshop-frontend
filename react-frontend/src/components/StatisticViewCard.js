import React, { useEffect, useState } from "react";
import { request } from "../axios_helper";
function StatisticsViewCard({ field }) {
    const IconComponent = field.icon;
    const transName = {
        "product": "sản phẩm",
        "brand": "nhãn hiệu",
        "category": "danh mục",
        "users": "người dùng",
        "orders": "đơn hàng"
    }
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        request("GET",`/api/v1/${field.name}`,{})
        .then((response) => {
            setQuantity(response.data.data.length)
        })
        .catch((error) => {
            console.log("Lỗi khi gọi API: " + error)
        })      
    })
    return (
        <div className="flex flex-row border rounded-lg ring-green-700 ring-2 mr-4">
            <div className="flex flex-row">
                <IconComponent/>
                <div className="flex flex-col">
                    <p className="font-bold">Số lượng {transName[field.name]}</p>
                    <p className="semi-bold">{quantity}</p>
                </div>
            </div>
        </div>
    );
}

export default StatisticsViewCard;
