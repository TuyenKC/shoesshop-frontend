import React, { useEffect, useState } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";

function AddToCart({
  user,
  product,
  handleOpenAddToCart,
  handleCloseAddToCart,
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(window.localStorage.getItem("cartId"));
  useEffect(() => {
    const selectedItem = product.itemList.find(
      (item) => item.size === selectedSize
    );
    setQuantityInStock(selectedItem ? selectedItem.quantityInStock : 0);
    setQuantity(1);
  }, [selectedSize]);
  const handleAddToCart = () => {
    if (quantityInStock > 0 && quantity > 0) {
      const cartItem = {
        cartId: cartId,
        productId: product.id,
        size: selectedSize,
        quantity: quantity,
        quantityInStock: quantityInStock,
      };
      request("POST", "/api/v1/cartitem", cartItem)
        .then((response) => {
          if (response.data.status === "200") {
            handleCloseAddToCart();
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          toast.warning("Thêm vào giỏ hàng thất bại");
        });
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={handleCloseAddToCart}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4">
            Chọn kích cỡ và số lượng sản phẩm
          </p>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="mb-4"
          >
            <option value="">Chọn kích cỡ</option>
            {product.itemList.map((item) => {
              if (item.quantityInStock > 0) {
                return (
                  <option key={item.size} value={item.size}>
                    {item.size}
                  </option>
                );
              }
            })}
          </select>
          <p className="font-bold">
            {" "}
            Số lượng hàng còn trong kho: {quantityInStock}
          </p>
          <div className="flex items-center">
            <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              onClick={() =>
                setQuantity(Math.min(quantityInStock, quantity + 1))
              }
            >
              +
            </button>
          </div>

          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
