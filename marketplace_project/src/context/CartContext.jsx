import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [items, setProducts] = useState([]);
    const [numberofItems, setNumOfItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [shoppingCartId, setCartId] = useState(null);

    const navigate = useNavigate();

    async function getLoggedUserCart() {
        setLoading(true);
        try {
            const { data } = await axios.get("https://localhost:7161/api/ShoppingCart/user", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(data.items);
            setNumOfItems(data.numberofItems);
            setTotalPrice(data.totalPrice);
            setCartId(data.shoppingCartId);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error, "Error from get logged user function");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token !== null) {
            getLoggedUserCart();
        }
    }, [token]);

    async function addProductToCart(productId) {
        if (!token) {
            return { status: "unauthorized", message: "Please log in first" };
        }
        setLoading(true);
        try {
            const { data } = await axios.post("https://localhost:7161/api/ShoppingCart/product", {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'productId': productId
                    }
                });
            getLoggedUserCart(); // Update cart after adding product
            return data;
        } catch (error) {
            console.log(error, "Error from add product to cart context");
        } finally {
            setLoading(false);
        }
    }

    async function updateProductQnty(productId, quantity) {
        setLoading(true); // Start loading
    
        try {
            const { data } = await axios.put(`https://localhost:7161/api/ShoppingCart/product`, {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'quantity': quantity.toString(),
                        'productId': productId.toString()
                    }
                });
    
            // تحديث القيم بدون إعادة تحميل الصفحة بالكامل
            setNumOfItems(data.numberofItems);
            setProducts(data.items);
            setTotalPrice(data.totalPrice);
    
            // بعد التحديث بنجاح، يمكنك إجراء إعادة تحميل الصفحة
            window.location.reload(); // إعادة تحميل الصفحة
        } catch (error) {
            console.log(error, "Error from update product function");
        } finally {
            setLoading(false); // Stop loading
        }
    }

    async function removeProduct(productId) {
        setLoading(true); // Start loading
    
        try {
            const { data } = await axios.delete(`https://localhost:7161/api/ShoppingCart/product/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // تحديث القيم
            setNumOfItems(data.numberofItems);
            setProducts(data.items);
            setTotalPrice(data.totalPrice);
    
            window.location.reload();
        } catch (error) {
            console.log(error, "Error from removeItem in context");
        } finally {
            setLoading(false); // Stop loading
        }
    }
    

    async function clearCart() {
        setLoading(true); // Start loading
    
        try {
            const { data } = await axios.delete(`https://localhost:7161/api/ShoppingCart/user/clear`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setNumOfItems(data.numberofItems);
            setProducts([]);
            setTotalPrice(data.totalPrice);
    
            window.location.reload();
        } catch (error) {
            console.log(error, "Error from clear cart in context");
        } finally {
            setLoading(false); // Stop loading
        }
    }
    

    return (
        <CartContext.Provider value={{
            addProductToCart,
            getLoggedUserCart,
            updateProductQnty,
            removeProduct,
            clearCart,
            items,
            totalPrice,
            shoppingCartId,
            numberofItems,
            loading,
            token
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
