import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
//import { useNavigate } from 'react-router-dom';

export const InventoryContext = createContext();

const InventoryContextProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [products,setProducts] = useState([]);
    const [numOfItems,setNumOfItems] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [Loading,setLoading] = useState(false);

    const [inventoryId,setInventoryId] = useState(null);

    async function getLoggedUserInventory(){
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
    setInventoryId(data.cartId);
    setLoading(false);
    return data
 } catch (error) {
    console.log(error,"error from get logged user function")
    setLoading(false);
}
}
//const navigate = useNavigate();

useEffect(function(){
    if(token !== null){
        getLoggedUserInventory();
       }
},[token]);


     
     async function addProductToInventory(productId){
        if(!token){
                return { status: "unauthorized", message: "Please log in first" };       
        }
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
            getLoggedUserInventory();
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
        <InventoryContext.Provider value={
           {addProductToInventory,
            getLoggedUserInventory,
            updateProductQnty,
            removeProduct,
            clearCart,
            products,
            totalPrice,
            inventoryId,
            numOfItems,
            Loading,
            token
           }
        }>
           {children}
        </InventoryContext.Provider>
         )
}
export default InventoryContextProvider
