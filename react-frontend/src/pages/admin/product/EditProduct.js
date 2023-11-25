import React, {useState,useEffect} from "react";
import { request } from "../../../axios_helper";
import {toast} from "react-toastify";
import {
  validateBrand,
  validateCategory,
  validateProductName,
  validateImages,
  validatePrice,
  validateSalePrice,
} from "../../../components/Validate";
function EditProduct({closeEditProductModal, openEditProductModal, editProduct, getProductList}) {
    const [name, setName] = useState(editProduct.productName);
    const [description, setDescription] = useState(editProduct.description);
    const [price, setPrice] = useState(editProduct.price);
    const [salePrice, setSalePrice] = useState(editProduct.salePrice);
    const [brandId, setBrandId] = useState(editProduct.brandId);
    const [brands, setBrands] = useState();
    const [imagesList,setImagesList] = useState([]);
    const [selectedImages,setSelectedImages] = useState([]);
    const [categoryListName, setCategoryListName] = useState(editProduct.categoryListName)
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const sizes = ["VN_33","VN_34","VN_35","VN_36", "VN_37", "VN_38", "VN_39","VN_40","VN_41","VN_42","VN_43"];
    const [status, setStatus] = useState(editProduct.status);
    useEffect(() => {
      let imagesIdList = [];
      editProduct.imagesList.forEach(
        (image) => {
          imagesIdList.push(image.id);
        }
      )
      setSelectedImages(imagesIdList);
    },[imagesList])
    useEffect(() => {
      sizes.forEach((size) => {
        items[size] = 0;
      });
      editProduct.itemList.forEach((item) => {
        if (items.hasOwnProperty(item.size)) {
          items[item.size] = item.quantityInStock;
        }
      });
    },[]);
    
    const itemList = [];
        for (const size in items) {
            itemList.push({
              size: size,
              quantityInStock: items[size]
            });
        }
    const handleEditProduct = () => {
      if (
        validateProductName(name) &&
        validateCategory(categoryListName) &&
        validateBrand(brandId) &&
        validatePrice(price) &&
        validateSalePrice(salePrice) &&
        validateImages(selectedImages)
      ) {
        const data = {
          productId: editProduct.id,
          productName : name,
          description: description,
          price: price,
          salePrice: salePrice,
          totalView: editProduct.totalView,
          totalSold: editProduct.totalSold,
          createdAt: editProduct.createdAt,
          modifiedAt: editProduct.modifiedAt,
          categoryListName: categoryListName,
          itemList:itemList,
          imagesIdList: selectedImages,
          brandId: brandId,
          status: status
        }
        request("PUT",`/api/v1/product/${editProduct.id}`,data)
        .then((response) => {
          if(response.data.status === "200"){
            getProductList();
            closeEditProductModal();
            toast.success(response.data.message);
          }else{
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API: " + error)
        })
      }
    }
    useEffect(() => {
      request("GET", "/api/v1/brand/valid", {})  
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
      request("GET", "/api/v1/category/valid", {})  
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
    useEffect(() => {
      request("GET","/api/v1/images",{})
      .then((response) => {
        if (response.data.status === "200") {
          setImagesList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
          console.log("Lỗi khi gọi API: " + error)
      })
  },[])
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
      const handlePriceChange = (event) => {
        setPrice(event.target.value);
      };
      const handleSalePriceChange = (event) => {
        setSalePrice(event.target.value);
      };
      const handleBrandIdChange = (event) => {
        setBrandId(event.target.value);
      }
      const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };
      const handleCategoryChange = (event) => {
        const categoryName = event.target.value;
        if (event.target.checked) {
          setCategoryListName([...categoryListName, categoryName]);
        } else {
          setCategoryListName(categoryListName.filter((name) => name !== categoryName));
        }
      };
      const handleItemChange = (size, quantity) => {
        setItems({
          ...items,
          [size]: quantity,
        });
      };
      const handleImageSelection = (imageId) => {
        if (selectedImages.includes(imageId)) {
          setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
          setSelectedImages([...selectedImages, imageId]);
        }
      };
    return (
        <div className="fixed inset-0 overflow-y-scroll bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end mt-[600px]" onClick={closeEditProductModal}>
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">Chỉnh sửa sản phẩm</p>
          <p className="font-bold">Tên sản phẩm</p>
          <input
            type="text"
            placeholder="Tên nhãn hiệu"
            value={name}
            onChange={handleNameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Mô tả</p>
          <input
            type="text"
            placeholder="Mô tả"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Giá gốc</p>
          <input
          type="number"
          placeholder="Giá gốc"
          value={price}
          onChange={handlePriceChange}
          className="w-full mb-4 px-2 border border-gray-400"
        />
        <p className="font-bold">Giá sale</p>
        <input
          type="number"
          placeholder="Giá sale"
          value={salePrice}
          onChange={handleSalePriceChange}
          className="w-full mb-4 px-2 border border-gray-400"
        />
        <p className="font-bold">Chọn nhãn hiệu</p>
        <select
        value={brandId}
        onChange={handleBrandIdChange}
        className="w-full mb-4 px-2 border border-gray-400"
      >
        <option value="">Chọn Brand</option>
        {brands && brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.brandName}
          </option>
        ))}
      </select>
      <p className="font-bold">Chọn danh mục</p>
        {categories.map((category) => (
          <label key={category.id} className="block">
            <input
              type="checkbox"
              value={category.categoryName}
              checked={categoryListName.includes(category.categoryName)}
              onChange={handleCategoryChange}
            />
            {category.categoryName}
          </label>
        ))}
        <p className="font-bold">Chọn hình ảnh</p>
        <div className="max-h-[130px] overflow-y-auto">
        <div className="grid grid-cols-5 gap-4">
        {imagesList.map((image) => (
          <div key={image.id}>
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => handleImageSelection(image.id)}
            />
            <img src={image.link} alt={image.title} />
          </div>
        ))}
        </div>
        </div>
        <p className="font-bold">Số lượng hàng trong kho</p>
          {sizes.map((size) => (
            <div key={size} className="flex items-center mb-2">
              <label className="mr-2">{size}:</label>
              <input
                type="number"
                value={items[size] || 0}
                onChange={(e) => handleItemChange(size, e.target.value)}
                className="px-2 border border-gray-400"
              />
            </div>
          ))}
          <p className="font-bold">Trạng thái</p>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
          <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={handleEditProduct}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
    );
}
export default EditProduct