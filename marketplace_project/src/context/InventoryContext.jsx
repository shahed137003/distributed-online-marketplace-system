import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
//import { useNavigate } from 'react-router-dom';

export const InventoryContext = createContext();

const InventoryContextProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [products,setProducts] = useState([]);
    const [stockQuantity,setNumOfItems] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [Loading,setLoading] = useState(false);

    const [inventoryId,setInventoryId] = useState(null);

    async function getLoggedUserInventory(){
        setLoading(true);
        try {
        const {data} = await axios.get("https://localhost:7161/api/Inventory",
        {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }
    );
    setProducts(data.products);
    setNumOfItems(data.stockQuantity);
    setTotalPrice(data.totalPrice);
    setInventoryId(data.inventoryId);
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
            const {data} = await axios.post("https://localhost:7161/api/Product",
                {
                    productId:productId
                },
                {
                    headers:{
                       'Authorization': `Bearer ${token}`
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
        const {data} = await axios.put(`https://localhost:7161/api/Product/${productId}`,{
            count:count
        },
        {
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });
    setNumOfItems(data.stockQuantity);
    setProducts(data.products);
    setTotalPrice(data.totalPrice);
      } catch (error) {
        console.log(error,"Error from update product function");
      }
    }

    async function removeProduct(productId){
        try{
          const {data} = await axios.delete(`https://localhost:7161/api/Product/${productId}`,{
            headers:{
               'Authorization': `Bearer ${token}`
            }
          });
          setNumOfItems(data.stockQuantity);
          setProducts(data.products);
          setTotalPrice(data.totalPrice);
        }catch(error){
            console.log(error,"error from removeItem in context");
        }
    }

    // async function clearCart(){
    //     try {
    //         const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                 
    //             headers:{
    //               'Authorization': `Bearer ${token}`
    //             }
                 
    //         }
    //             );
    //       setNumOfItems(data.stockQuantity);
    //       setProducts([]);
    //       setTotalPrice(data.totalPrice);
    //     } catch (error) {
    //         console.log(error,"error from clear cart in context");
            
    //     }
    // }



    return (
        <InventoryContext.Provider value={
           {addProductToInventory,
            getLoggedUserInventory,
            updateProductQnty,
            removeProduct,
         
            products,
            totalPrice,
            inventoryId,
            stockQuantity,
            Loading,
            token
           }
        }>
           {children}
        </InventoryContext.Provider>
         )
}
export default InventoryContextProvider