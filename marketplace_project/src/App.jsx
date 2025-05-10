import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import Searchresults from './components/Searchresults';
import Explore from './components/Explore';
import Register from './components/Register/Register';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import AllOrders from './components/AllOrders/AllOrders';
import Createitem from './components/Createitem/Createitem';
import CartContextProvider from './context/CartContext'
import AuthContextProvider from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import UserProfile from './components/UserProfile/UserProfile';
import UserContextProvider from './context/userContext';  

//import Balance from './components/Balance/Balance';

import '@fortawesome/fontawesome-free/css/all.min.css';
import  InventoryContextProvider  from './context/InventoryContext';
import EditProfile from './components/EditProfile/EditProfile';
//import Checkout from './components/Checkout/Checkout';
//import Gateway from './components/Gateway/Gateway';




const App=()=>{
  return (
    
  <>
   
   <AuthContextProvider>
  <CartContextProvider>
  <InventoryContextProvider>
    <NavBar />
    </InventoryContextProvider>
  </CartContextProvider>
</AuthContextProvider>
    
    <Routes>
      <Route path='/' element={<Home ></Home>}> </Route>
      <Route path='/home' element={<UserContextProvider><Home></Home></UserContextProvider>}> </Route>
      <Route path='/Explore' element={<Explore></Explore>}> </Route>
      <Route path='/createItem' element={<Createitem></Createitem>}> </Route>
      <Route path='/login' element={<AuthContextProvider><Login></Login></AuthContextProvider>}> </Route>
      <Route path='/register' element={<Register></Register>}> </Route>
      <Route path='/Previous orders' element={<AllOrders></AllOrders>}> </Route>
      {/* <Route path='/payment' element={<Checkout></Checkout>}> </Route> */}
      {/* <Route path='/gateway' element={<Gateway></Gateway>}> </Route> */}
      <Route path='/itemdetails/:product_id' element={<AuthContextProvider><CartContextProvider><ItemDetails></ItemDetails></CartContextProvider></AuthContextProvider>}> </Route>
      <Route path='/researchresults' element={<Searchresults></Searchresults>}> </Route>
      <Route path='/cart' element={<AuthContextProvider><CartContextProvider><Cart></Cart></CartContextProvider></AuthContextProvider>}> </Route>
      {/* <Route path='/balance' element={<AuthContextProvider><CartContextProvider><Balance></Balance></CartContextProvider></AuthContextProvider>}> </Route> */}
      <Route path='/userProfile/:user_id' element={<AuthContextProvider><UserContextProvider><InventoryContextProvider><UserProfile></UserProfile></InventoryContextProvider></UserContextProvider></AuthContextProvider>}> </Route>
      <Route path='/editProfile' element={<AuthContextProvider><InventoryContextProvider><EditProfile></EditProfile></InventoryContextProvider></AuthContextProvider>}> </Route>


    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
      )
  
  
}
export default App