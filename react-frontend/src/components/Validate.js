import { toast } from "react-toastify";

export const validateNameReceiver = (nameReceiver) => {
  if (nameReceiver === "") {
    toast.warning("Tên người nhận không được để trống");
    return false;
  }
  return true;
};

export const validateAddressReceiver = (addressReceiver) => {
  if (addressReceiver === "") {
    toast.warning("Địa chỉ người nhận không được để trống");
    return false;
  }
  return true;
};

export const validatePhone = (phone) => {
  if (phone.length !== 10 || !phone.startsWith("0")) {
    toast.warning("Số điện thoại không hợp lệ");
    return false;
  }
  return true;
};

export const validatePromotion = (promotion) => {
  if (promotion === "") {
    toast.warning("Vui lòng chọn khuyến mại");
    return false;
  }
  return true;
};

export const validateShipment = (shipment) => {
  if (shipment === "") {
    toast.warning("Vui lòng chọn đơn vị vận chuyển");
    return false;
  }
  return true;
};

export const validatePayment = (payment) => {
  if (payment === "") {
    toast.warning("Vui lòng chọn phương thức thanh toán");
    return false;
  }
  return true;
};
export const validateItemList = (itemList) => {
  if (itemList.length <= 0) {
    toast.warning("Vui lòng thêm sản phẩm");
    return false;
  }
  return true;
};
export const validateUsername = (username) => {
  if (username.length <= 0) {
    toast.warning("Vui lòng nhập tên tài khoản");
    return false;
  }
  return true;
};
export const validatePassword = (password) => {
  if (password.length <= 0) {
    toast.warning("Trường mật khẩu bị trống");
    return false;
  }
  if (password.length < 6) {
    toast.warning("Mật khẩu phải >= 6 ký tự");
    return false;
  }
  return true;
};
export const validatePaymentName = (paymentName) => {
  if (paymentName === "") {
    toast.warning("Vui lòng nhập tên phương thức thanh toán");
    return false;
  }
  return true;
};
export const validateShipmentName = (shipmentName) => {
  if (shipmentName === "") {
    toast.warning("Vui lòng nhập tên phương thức vận chuyển");
    return false;
  }
  return true;
};
export const validateShipmentCost = (shipmentName) => {
  if (shipmentName < 0) {
    toast.warning("Chi phí vận chuyển >= 0");
    return false;
  }
  return true;
};
export const validateBrandName = (brandName) => {
  if (brandName === "") {
    toast.warning("Vui lòng nhập tên nhãn hiệu");
    return false;
  }
  return true;
};
export const validateCategoryName = (categoryName) => {
  if (categoryName === "") {
    toast.warning("Vui lòng nhập tên danh mục");
    return false;
  }
  return true;
};
export const validatePromotionName = (promotionName) => {
  if (promotionName === "") {
    toast.warning("Vui lòng nhập tên khuyến mại");
    return false;
  }
  return true;
};
export const validatePromotionCode = (promotionCode) => {
  if (promotionCode === "") {
    toast.warning("Vui lòng nhập mã khuyến mại");
    return false;
  }
  return true;
};
export const validateDiscountValue = (promotionType, discountValue) => {
  if (promotionType === "%" && (discountValue > 100 || discountValue < 0)) {
    toast.warning("Giá trị khuyến mại >= 0 và <= 100 %");
    return false;
  }
  return true;
};
export const validateDate = (startDate, endDate) => {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();
  if (isNaN(startDateTime)) {
    toast.warning("Thời gian bắt đầu không hợp lệ");
    return false;
  }
  if (isNaN(endDateTime)) {
    toast.warning("Thời gian kết thúc không hợp lệ");
    return false;
  }
  if (startDateTime >= endDateTime) {
    toast.warning("Thời gian kết thúc phải xa hơn thời gian bắt đầu");
    return false;
  }
  return true;
};
export const validateProductName = (productName) => {
  if (productName === "") {
    toast.warning("Vui lòng nhập tên sản phẩm");
    return false;
  }
  return true;
};
export const validatePrice = (price) => {
  if (price < 0) {
    toast.warning("Giá gốc >= 0");
    return false;
  }
  return true;
};
export const validateSalePrice = (salePrice) => {
  if (salePrice < 0) {
    toast.warning("Giá sale >= 0");
    return false;
  }
  return true;
};
export const validateBrand = (brand) => {
  if (brand === "") {
    toast.warning("Vui lòng chọn nhãn hiệu");
    return false;
  }
  return true;
};
export const validateCategory = (category) => {
  if (category.length <= 0) {
    toast.warning("Vui lòng chọn danh mục");
    return false;
  }
  return true;
};
export const validateImages = (images) => {
  if (images.length <= 0) {
    toast.warning("Vui lòng chọn hình ảnh");
    return false;
  }
  return true;
};
