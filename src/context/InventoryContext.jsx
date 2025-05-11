import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const InventoryContext = createContext();

const InventoryContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [stockQuantity, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [inventoryId, setInventoryId] = useState(null);

async function getLoggedUserInventory(userId) {
  if (!token) return;
  setLoading(true);
  try {
    const response = await axios.get(`https://localhost:7161/api/Inventory/${userId}`);

  //  const data = response?.data;
    console.log(" Respnsssseeeeee:", response);

    // التعديل هنا، الوصول مباشرة إلى products
    setProducts(data?.products || []); // استخدام "products" مباشرة
    setNumOfItems(data?.stockQuantity || 0);
    setTotalPrice(data?.totalPrice || 0);  // تأكد من أن totalPrice موجود في الاستجابة
    setInventoryId(data?.inventoryId || null);
  } catch (error) {
    console.error("Error fetching inventory:", error);
  } finally {
    setLoading(false);
  }
}
  // useEffect(() => {
  //   if (token) {
  //     getLoggedUserInventory();
  //   }
  // }, [token]);

  async function addProductToInventory(productId) {
    if (!token) {
      return { status: "unauthorized", message: "Please log in first" };
    }
    try {
      await axios.post("https://localhost:7161/api/Product", { productId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await getLoggedUserInventory();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  async function updateProductQnty(productId, count) {
    try {
      const response = await axios.put(`https://localhost:7161/api/Product/${productId}`, { count }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data;
      setProducts(data.products || []);
      setNumOfItems(data.stockQuantity || 0);
      setTotalPrice(data.totalPrice || 0);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  async function removeProduct(productId) {
    try {
      const response = await axios.delete(`https://localhost:7161/api/Product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data;
      setProducts(data.products || []);
      setNumOfItems(data.stockQuantity || 0);
      setTotalPrice(data.totalPrice || 0);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }

  return (
    <InventoryContext.Provider
      value={{
        addProductToInventory,
        getLoggedUserInventory,
        updateProductQnty,
        removeProduct,
        products,
        totalPrice,
        inventoryId,
        stockQuantity,
        Loading,
        token
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContextProvider;
