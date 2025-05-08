import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from "react-spinners";
import './AllOrders.css'

const AllOrders = () => {
    const {id} = jwtDecode(localStorage.getItem("token"));
   
 
    const {isLoading,data} = useQuery({
        queryKey: ["allOrders"],
        queryFn: getAllOrders
      })
      
 
    async function getAllOrders(){
     return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    }
 
    if(isLoading){
        return <>
        <div className="d-flex justify-content-center align-items-center allOrdersMainEmpty" >
        <PacmanLoader color="#8B5CF6" />
        </div>

        </>
      }
      return (
        <div className="mx-auto allOrdersMain overflow-hidden">
            {data?.data.map(function(order,idx){return <div key={idx} className="separateOrder  mt-5 container border rounded-5">
                <h4 className="text-light p-2">Total Order Price: {order.totalOrderPrice} EGP</h4>
                <h4 className="text-light px-2">Payment Method Type: {order.paymentMethodType} </h4>
                
              
           
            </div>})}
        </div>
      )
 }
 
 export default AllOrders