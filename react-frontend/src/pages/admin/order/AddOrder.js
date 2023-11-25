import React, { useEffect, useState } from "react";
import { request } from "../../../axios_helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validateAddressReceiver,
  validateNameReceiver,
  validatePhone,
  validatePayment,
  validatePromotion,
  validateShipment,
  validateItemList,
} from "../../../components/Validate";

function AddOrder({ user, closeAddOrderModal }) {
  const navigate = useNavigate();
  const [usersId, setUsersId] = useState("");
  const [nameReceiver, setNameReceiver] = useState("");
  const [phoneReceiver, setPhoneReceiver] = useState("");
  const [addressReceiver, setAddressReceiver] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [note, setNote] = useState("");
  const [promotionType, setPromotionType] = useState("VND");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState("");
  const [shipmentCost, setShipmentCost] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectItem, setSelectedItem] = useState([]);
  const [ordersItemList, setOrdersItemList] = useState([]);
  const paymentStatus = "Chưa thanh toán";
  const [payments, setPayments] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [totalPay, setTotalPay] = useState(0);
  useEffect(() => {
    request("GET", `/api/v1/users/username/${user.username}`, {})
      .then((response) => {
        setUsersId(response.data.data.id);
      })
      .catch((error) => {
        toast.warning("Không lấy được giỏ hàng người dùng");
      });
  }, []);
  useEffect(() => {
    let sum = 0;
    ordersItemList.forEach((element) => {
      sum += element.salePrice * element.quantity;
    });
    setTotalPrice(sum);
    setTotalPay(sum);
  }, [ordersItemList]);
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
    request("GET", "/api/v1/product/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          setProducts(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
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
  const handleAddOrders = () => {
    if (
      validateNameReceiver(nameReceiver) &&
      validateAddressReceiver(addressReceiver) &&
      validatePhone(phoneReceiver) &&
      validatePromotion(selectedPromotion) &&
      validateShipment(selectedShipment) &&
      validatePayment(selectedPayment) &&
      validateItemList(ordersItemList)
    ) {
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
        ordersItems: ordersItemList,
        shipmentCost: shipmentCost,
        discountValue: discountValue,
        paymentStatus: paymentStatus,
        totalPrice: totalPrice,
        totalPay: totalPay,
      };
      if (selectedPaymentName === "COD") {
        request("POST", "/api/v1/orders?action=add", data)
          .then((response) => {
            if (response.data.status === "200") {
              closeAddOrderModal();
              navigate("/manage/orders");
              toast.success(response.data.message);
            } else {
              toast.warning(response.data.message);
            }
          })
          .catch((error) => {
            toast.error("Đặt hàng thất bại. Vui lòng thử lại");
            console.log("Lỗi khi gọi API: " + error);
          });
      } else if (selectedPaymentName === "VNPAY") {
        toast.error("Chưa hỗ trợ cho việc thêm đơn hàng");
      }
    }
  };
  const handleChangePromotion = (event) => {
    let id = event.target.value;
    setSelectedPromotion(id);
    if (id === "") {
      setPromotionType("VND");
      setDiscountValue(0);
    } else {
      let foundPromotionType = promotions.find(
        (promotion) => promotion.id === id
      ).promotionType;
      setPromotionType(foundPromotionType);
    }
  };
  const handleChangeShipment = (event) => {
    let id = event.target.value;
    setSelectedShipment(id);
    if (id === "") {
      setShipmentCost(0);
    } else {
      let shipmentCost = shipments.find(
        (shipment) => shipment.id === id
      ).shipmentCost;
      setShipmentCost(shipmentCost);
    }
  };
  const handleSelectedItem = (itemId, productId, size, salePrice) => {
    if (selectItem.includes(itemId)) {
      setSelectedItem(selectItem.filter((id) => id !== itemId));
      setOrdersItemList(
        ordersItemList.filter(
          (item) => item.productId !== productId || item.size !== size
        )
      );
    } else {
      setSelectedItem([...selectItem, itemId]);
      setOrdersItemList([
        ...ordersItemList,
        {
          productId: productId,
          size: size,
          quantity: 1,
          salePrice: salePrice,
        },
      ]);
    }
  };
  return (
    <div className="fixed inset-0 overflow-y-scroll bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center items-center h-screen flex-col mt-[250px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeAddOrderModal}
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
              />
            </div>
            <div className="flex flex-col">
              <p>Số điện thoại người nhận</p>
              <input
                type="number"
                placeholder="+84"
                onChange={(e) => setPhoneReceiver(e.target.value)}
                className="w-full mb-4 px-2 border border-gray-400 rounded"
              />
            </div>
          </div>
          <p>Địa chỉ người nhận</p>
          <input
            type="text"
            placeholder="Địa chỉ người nhận"
            onChange={(e) => setAddressReceiver(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />
          <p>Ghi chú</p>
          <input
            type="text"
            placeholder="Ghi chú"
            onChange={(e) => setNote(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400 rounded"
          />
          <p className="font-bold">Chọn sản phẩm cho đơn hàng</p>
          <div className="flex flex-col h-[100px] overflow-y-auto">
            {products &&
              products.map((product) =>
                product.itemList.map((item) =>
                  item.quantityInStock > 0 ? (
                    <div key={item.id} className="flex flex-row">
                      <input
                        type="checkbox"
                        checked={selectItem.includes(item.id)}
                        onChange={() =>
                          handleSelectedItem(
                            item.id,
                            product.id,
                            item.size,
                            product.salePrice
                          )
                        }
                      />
                      <p className="ml-2">
                        {product.productName} Kích cỡ:{item.size}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )
                )
              )}
          </div>
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
            onClick={handleAddOrders}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Tạo đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddOrder;
