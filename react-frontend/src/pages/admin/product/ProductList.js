import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function ProductList() {
  const [isAddProductModalOpen, setAddProductModal] = useState(false);
  const [isEditProductModalOpen, setEditProductModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterProductList, setFilterProductList] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedBrandName, setSelectedBrandName] = useState("Tất cả");
  const [selectedCategoryName, setSelectedCategoryName] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedInStockStatus, setSelectedInStockStatus] = useState("Tất cả");
  const [editProduct, setEditProduct] = useState();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const openEditProductModel = () => {
    setEditProductModal(true);
  };
  const closeEditProductModal = () => {
    setEditProductModal(false);
  };
  const openAddProductModel = () => {
    setAddProductModal(true);
  };
  const closeAddProductModal = () => {
    setAddProductModal(false);
  };
  const updateEditProduct = (product) => {
    setEditProductModal(true);
    setEditProduct(product);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (product) => {
    setConfirmDeleteModal(true);
    setEditProduct(product);
  };
  useEffect(() => {
    request("GET", "/api/v1/brand", {})
      .then((response) => {
        if (response.data.status === "200") {
          setBrands(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API lấy danh sách brand: " + error);
      });
  }, []);
  useEffect(() => {
    request("GET", "/api/v1/category", {})
      .then((response) => {
        if (response.data.status === "200") {
          setCategories(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API lấy danh sách category: " + error);
      });
  }, []);
  const getProductList = () => {
    request("GET", "/api/v1/product", {})
      .then((response) => {
        if (response.data.status === "200") {
          setProducts(response.data.data);
          setFilterProductList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getProductList();
  }, [isConfirmDeleteOpen]);
  const inStockCheck = (itemList) => {
    return itemList.some((item) => item.quantityInStock > 0);
  };
  const handleFilter = () => {
    console.log(selectedInStockStatus);
    let filterList = [];
    products.forEach((product) => {
      if (
        (product.productName.toLowerCase().includes(selectedProductName.toLowerCase()) ||
          selectedProductName === "Tất cả") &&
        (selectedStatus === "Tất cả" || product.status === selectedStatus) &&
        (selectedBrandName === "Tất cả" ||
          product.brandName === selectedBrandName) &&
        (selectedInStockStatus === "Tất cả" ||
          (selectedInStockStatus === "InStock" &&
            inStockCheck(product.itemList)) ||
          (selectedInStockStatus === "NonStock" &&
            !inStockCheck(product.itemList))) &&
        (selectedCategoryName === "Tất cả" ||
          product.categoryListName.includes(selectedCategoryName))
      ) {
        filterList.push(product);
      }
    });
    setFilterProductList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [
    selectedProductName,
    selectedStatus,
    selectedBrandName,
    selectedCategoryName,
    selectedInStockStatus,
  ]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">Danh sách sản phẩm</h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddProductModel}
      >
        Thêm sản phẩm
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={selectedProductName}
            onChange={(e) => setSelectedProductName(e.target.value)}
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
        <div className="flex flex-col">
          <p className="font-bold">Chọn nhãn hiệu</p>
          <select
            value={selectedBrandName}
            onChange={(e) => setSelectedBrandName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            {brands &&
              brands.map((brand) => (
                <option key={brand.brandName} value={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn danh mục</p>
          <select
            value={selectedCategoryName}
            onChange={(e) => setSelectedCategoryName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            {categories &&
              categories.map((category) => (
                <option
                  key={category.categoryName}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Tình trạng hàng trong kho</p>
          <select
            value={selectedInStockStatus}
            onChange={(e) => setSelectedInStockStatus(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="InStock">Còn hàng</option>
            <option value="NonStock">Hết hàng</option>
          </select>
        </div>
      </div>
      <table className="m-2 border-collapse border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2 border-collapse border">STT</th>
            <th className="p-2 border-collapse border">Tên</th>
            <th className="p-2 border-collapse border">Mô tả</th>
            <th className="p-2 border-collapse border">Giá gốc</th>
            <th className="p-2 border-collapse border">Giá sale</th>
            <th className="p-2 border-collapse border">Nhãn hiệu</th>
            <th className="p-2 border-collapse border">Danh mục</th>
            <th className="p-2 border-collapse border">Hình ảnh</th>
            <th className="p-2 border-collapse border">Hàng trong kho</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterProductList &&
            filterProductList.map((product, index) => (
              <tr className="bg-gray-100" key={product.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.productName}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.description}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.price}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.salePrice}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.brandName}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.categoryListName.map((categoryname) => (
                    <p>{categoryname}</p>
                  ))}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  <div className="grid grid-cols-2 gap-2">
                    {product.imagesList.map((image) => (
                      <div key={image.id}>
                        <img
                          className="w-20 h-auto"
                          src={image.link}
                          alt={image.title}
                        />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {product.itemList.map((item) => {
                    if (item.quantityInStock > 0)
                      return (
                        <p>
                          {item.size}: {item.quantityInStock}
                        </p>
                      );
                  })}
                </td>

                <td
                  className={
                    product.status === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {product.status}
                </td>
                <td className="pt-3 flex justify-center hover:cursor-pointer">
                  <div
                    onClick={() => updateEditProduct(product)}
                    className="hover:cursor-pointer"
                  >
                    <IconEdit />
                  </div>
                  <div
                    onClick={() => openConfirmDeleteModal(product)}
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
      {isAddProductModalOpen && (
        <AddProduct
          openAddProductModel={openAddProductModel}
          closeAddProductModal={closeAddProductModal}
          getProductList={getProductList}
        />
      )}
      {isEditProductModalOpen && (
        <EditProduct
          openEditProductModel={openEditProductModel}
          closeEditProductModal={closeEditProductModal}
          editProduct={editProduct}
          getProductList={getProductList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="product"
          id={editProduct.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}
export default ProductList;
