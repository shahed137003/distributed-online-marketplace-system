import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import { PacmanLoader } from "react-spinners";
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';
import { useContext, useState } from "react";
import './AllOrders.css'

const AllOrders = () => {
    const {id} = jwtDecode(localStorage.getItem("token"));
   
    // Pagination state
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 2;
     

    const {isLoading,data} = useQuery({
        queryKey: ["allOrders"],
        queryFn: getAllOrders
      })

      const totalPages = Math.ceil(data?.data.length / itemsPerPage);
    
      const paginatedOrders = data?.data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      
 
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
        <div className="mx-auto allOrdersMain p-4">
            {paginatedOrders.map(function(order,idx){return <div key={idx} className="separateOrder  mt-5 container border rounded-5 position-relative">
                <h5 className="text-light p-2">Total Order Price: {order.totalOrderPrice} EGP</h5>
                <h5 className="text-light px-2">Payment Method Type: {order.paymentMethodType} </h5>
                <h5  className="text-light p-2">Created at: {order.createdAt}</h5>
                <div className="paymentStatus">
                <span className="text-light p-2">Payment Status:</span> {order.isPaid?<Badge bg="success" className="allOrdersBadge"> Successful</Badge>:<Badge bg="secondary">Pending</Badge>}  
                </div>
                <div className="deliveryStatus">
                <span className="text-light p-2">Delivery Status:</span>{order.isDelivered?<Badge bg="success" className="allOrdersBadge"> Successful</Badge>:<Badge bg="secondary">Pending</Badge>} 
                </div>
            </div>})}
             {/* Pagination controls */}
          {totalPages > 1 && (
            <Pagination className="mt-5 justify-content-center customPag">
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </div>
      )
 }
 
 export default AllOrders