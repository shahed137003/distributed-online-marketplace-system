import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [products,setProducts] = useState([]);
    const [numOfItems,setNumOfItems] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [Loading,setLoading] = useState(false);

    const [cartId,setCartId] = useState(null);

    async function getLoggedUserCart(){
        setLoading(true);
        try {

        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
    setProducts(data.data.products);
    setNumOfItems(data.numOfCartItems);
    setTotalPrice(data.data.totalCartPrice);
    setCartId(data.cartId);
    setLoading(false);
    return data
 } catch (error) {
    console.log(error,"error from get logged user function")
    setLoading(false);
}
}

useEffect(function(){
    if(token !== null){
        getLoggedUserCart();
       }
},[token]);
     
     async function addProductToCart(productId){
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId:productId
                },
                {
                    headers:{
                        token:localStorage.getItem("token")
                       }
                }
            )
            getLoggedUserCart();
            return data;
            
        } catch (error) {
            console.log(error,"error from add product to cart context");
        }
    }

    async function updateProductQnty(productId,count){
      try {
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },
        {
        headers:{
            token:localStorage.getItem("token") 
        }
    });
    setNumOfItems(data.numOfCartItems);
    setProducts(data.data.products);
    setTotalPrice(data.data.totalCartPrice);
      } catch (error) {
        console.log(error,"Error from update product function");
      }
    }

    async function removeProduct(productId){
        try{
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:{
                token:localStorage.getItem("token")
            }
          });
          setNumOfItems(data.numOfCartItems);
          setProducts(data.data.products);
          setTotalPrice(data.data.totalCartPrice);
        }catch(error){
            console.log(error,"error from removeItem in context");
        }
    }

    async function clearCart(){
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                 
                headers:{
                   token:localStorage.getItem("token")
                }
                 
            }
                );
          setNumOfItems(data.numOfCartItems);
          setProducts([]);
          setTotalPrice(data.data.totalCartPrice);
        } catch (error) {
            console.log(error,"error from clear cart in context");
            
        }
    }



    return (
        <CartContext.Provider value={
           {addProductToCart,
            getLoggedUserCart,
            updateProductQnty,
            removeProduct,
            clearCart,
            products,
            totalPrice,
            cartId,
            numOfItems,
            Loading,
            token
           }
        }>
           {children}
        </CartContext.Provider>
         )
}
export default CartContextProvider