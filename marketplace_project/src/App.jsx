import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import NavBar from './components/NavBar';
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import Searchresults from './components/Searchresults';
import Explore from './components/Explore';
import Register from './components/Register/Register';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Createitem from './components/Createitem';
import Cart from './components/Cart';
import Login from './components/Login/Login';
// import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import { Toaster } from 'react-hot-toast';

const App=()=>{
  return (
    
  <>
   
    <NavBar></NavBar>
    
    <Routes>
      <Route path='/' element={<Home ></Home>}> </Route>
      <Route path='/home' element={<Home ></Home>}> </Route>
      <Route path='/Explore' element={<Explore></Explore>}> </Route>
      <Route path='/createItem' element={<Createitem></Createitem>}> </Route>
      <Route path='/login' element={<Login></Login>}> </Route>
      <Route path='/register' element={<Register></Register>}> </Route>
      <Route path='/itemdetails' element={<ItemDetails></ItemDetails>}> </Route>
      <Route path='/researchresults' element={<Searchresults></Searchresults>}> </Route>
      <Route path='/cart' element={<Cart></Cart>}> </Route>
    </Routes>
    
   {/* <Toaster/> */}
    </>
      )
  
  
}
export default App
