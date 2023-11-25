import React, { useEffect, useState } from "react";
import { request } from "../../../axios_helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateAddressReceiver, validateNameReceiver, validatePhone, validatePayment, validatePromotion, validateShipment } from "../../../components/Validate";
function MakeOrder({ user, cartItemList, handleCloseMakeOrder }) {
  const navigate = useNavigate();
  const [usersId, setUsersId] = useState(user.usersId);
  const [nameReceiver, setNameReceiver] = useState("");
  const [phoneReceiver, setPhoneReceiver] = useState("");
  const [addressReceiver, setAddressReceiver] = useState("");
  const [note, setNote] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [promotionType, setPromotionType] = useState("VND");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState("");
  const [shipmentCost, setShipmentCost] = useState(0);
  const paymentStatus = "Chưa thanh toán";
  const [payments, setPayments] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [totalPay, setTotalPay] = useState(0);

  useEffect(() => {
    let sum = 0;
    cartItemList.forEach((element) => {
      sum += element.salePrice * element.quantity;
    });
    setTotalPrice(sum);
    setTotalPay(sum);
  }, []);
  useEffect(() => {
    if (selectedPromotion) {
      const selectedPromotionData = promotions.find(
        (promotion) => promotion.id === selectedPromotion
      );
      if (selectedPromotionData) {
        const calculatedDiscountValue =
          selectedPromotionData.promotionType === "VND"
            ? Math.min(selectedPromotionData.discountValue, totalPrice)
            : (selectedPromotionData.discountValue / 100) * totalPrice;
        setDiscountValue(calculatedDiscountValue);
      }
    }
  }, [selectedPromotion, promotions, totalPrice]);
  useEffect(() => {
    let calculatedTotalPay = totalPrice - discountValue + shipmentCost;
    setTotalPay(calculatedTotalPay);
  }, [discountValue, shipmentCost]);
  useEffect(() => {
    request("GET", "/api/v1/promotion/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          setPromotions(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  useEffect(() => {
    request("GET", "/api/v1/shipment/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          setShipments(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  useEffect(() => {
    request("GET", "/api/v1/payment/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          setPayments(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  const handleMakeOrders = () => {
    if(validateNameReceiver(nameReceiver) && validateAddressReceiver(addressReceiver) &&
      validatePhone(phoneReceiver) && validatePromotion(selectedPromotion) &&
      validateShipment(selectedShipment) && validatePayment(selectedPayment)){
      let selectedPaymentName = "";
      payments.forEach((payment) => {
        if (payment.id === selectedPayment)
          selectedPaymentName = payment.paymentName;
      });
      let data = {
        nameReceiver: nameReceiver,
        phoneReceiver: phoneReceiver,
        addressReceiver: addressReceiver,
        note: note,
        paymentId: selectedPayment,
        promotionId: selectedPromotion,
        shipmentId: selectedShipment,
        usersId: usersId,
        ordersItems: cartItemList,
        shipmentCost: shipmentCost,
        discountValue: discountValue,
        paymentStatus: paymentStatus,
        totalPrice: totalPrice,
        totalPay: totalPay,
      };
      if (selectedPaymentName === "COD") {
        request("POST", "/api/v1/orders?action=make", data)
          .then((response) => {
            if (response.data.status === "200") {
              toast.success("Đặt hàng thành công");
              handleCloseMakeOrder();
              navigate("/");            
            } else {
              toast.warning(response.data.message);
            }
           
          })
          .catch((error) => {
            toast.error("Đặt hàng thất bại. Vui lòng thử lại");
            console.log("Lỗi khi gọi API: " + error);
          });
      } else if (selectedPaymentName === "VNPAY") {
        const dataToSave = JSON.stringify(data);
        window.localStorage.setItem("order", dataToSave);
        request(
          "POST",
          `/api/v1/vnpay/submitOrder?amount=${totalPay}&orderInfo=ordershoesshop`,
          {}
        )
          .then((response) => {
            console.log(response.data.data);
            window.location.href = response.data.data;
          })
          .catch((error) => {
            toast.error("Lỗi kết nối với VNPAY. Vui lòng thử lại");
            console.log("Lỗi khi gọi API: " + error);
          });
      }
    }
  };

  const handleChangePromotion = (event) => {
    let id = event.target.value;
    setSelectedPromotion(id);
    if(id === ""){
      setPromotionType("VND");
      setDiscountValue(0);
    }else{
      let foundPromotionType = promotions.find(
        (promotion) => promotion.id === id
      ).promotionType;
      setPromotionType(foundPromotionType);
    } 
  };
  const handleChangeShipment = (event) => {
    let id = event.target.value;
    setSelectedShipment(id);
    if(id === ""){
      setShipmentCost(0);
    }else{
      let shipmentCost = shipments.find(
        (shipment) => shipment.id === id
      ).shipmentCost;
      setShipmentCost(shipmentCost);
    }
  };
  return (
    <div className="fixed inset-0 overflow-y-scroll bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center items-center h-screen flex-col mt-[250px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={handleCloseMakeOrder}
        >
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
                onChange={(e) => setNameReceiver(e.target.value)}
                className="w-full mb-4 px-2 border border-gray-400 rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <p>Số điện thoại người nhận</p>
              <input
                type="number"
                placeholder="+84"
                onChange={(e) => setPhoneReceiver(e.target.value)}
                className="w-full mb-4 px-2 border border-gray-400 rounded"
                required
              />
            </div>
          </div>

          <p>Địa chỉ người nhận</p>
          <input
            type="text"
            placeholder="Địa chỉ người nhận"
            onChange={(e) => setAddressReceiver(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
            required
          />
          <p>Ghi chú</p>
          <input
            type="text"
            placeholder="Ghi chú"
            onChange={(e) => setNote(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />

          <div className="flex flex-col">
            <p className="font-bold">Chọn khuyến mãi</p>
            <select
              value={selectedPromotion}
              onChange={(e) => handleChangePromotion(e)}
              className="w-full mb-4 px-2 border border-gray-400 rounded"
            >
              <option value="">Chọn khuyến mãi</option>
              {promotions.map((promotion) => (
                <option key={promotion.id} value={promotion.id}>
                  {promotion.promotionName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Chọn phương thức vận chuyển</p>
            <select
              value={selectedShipment}
              onChange={(e) => handleChangeShipment(e)}
              className="w-full mb-4 px-2 border border-gray-400 rounded"
            >
              <option value="">Chọn phương thức vận chuyển</option>
              {shipments.map((shipment) => (
                <option key={shipment.id} value={shipment.id}>
                  {shipment.shipmentUnit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Chọn phương thức thanh toán</p>
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-full mb-4 px-2 border border-gray-400 rounded"
            >
              <option value="">Chọn phương thức thanh toán</option>
              {payments &&
                payments.map((payment) => (
                  <option key={payment.id} value={payment.id}>
                    {payment.paymentName}
                  </option>
                ))}
            </select>
            <p className="font-bold">Sản phẩm</p>
            {cartItemList.map((cartItem) => (
              <div className="flex flex-row gap-5">
                <img
                  className="h-20 w-18 object-cover"
                  src={cartItem.urlImagesList[0]}
                  alt=""
                />

                <div className="flex flex-col">
                  <p>{cartItem.productName}</p>
                  <p>
                    Kích cỡ: {cartItem.size} Số lượng: {cartItem.quantity}
                  </p>
                </div>
                <p>Đơn giá: {cartItem.salePrice}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Tổng tiền sản phẩm</p>
            <p className="font-bold">{totalPrice}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Tiền vận chuyển</p>
            <p className="font-bold">{shipmentCost}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Giá được giảm</p>
            <p className="font-bold">-{discountValue}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold text-red-400">Thành tiền</p>
            <p className="font-bold text-red-400">{totalPay}</p>
          </div>
          <button
            onClick={handleMakeOrders}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
export default MakeOrder;
