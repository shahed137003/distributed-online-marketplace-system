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
import Register from './components/Register';
import Itemdetails from './components/Itemdetails';
import Createitem from './components/Createitem';
import Cart from './components/Cart';
import LoginF from './components/LoginF';
const App=()=>{
  return (
    
  <>
  
    <NavBar></NavBar>
   
    <Routes>
    
      <Route path='/' element={<Home ></Home>}> </Route>
      <Route path='/home' element={<Home ></Home>}> </Route>
      <Route path='/Explore' element={<Explore></Explore>}> </Route>
      <Route path='/createItem' element={<Createitem></Createitem>}> </Route>
      <Route path='/login' element={<LoginF></LoginF>}> </Route>
      <Route path='/register' element={<Register></Register>}> </Route>
      <Route path='/itemdetails' element={<Itemdetails></Itemdetails>}> </Route>
      <Route path='/researchresults' element={<Searchresults></Searchresults>}> </Route>
      <Route path='/cart' element={<Cart></Cart>}> </Route>
    </Routes>
 
    </>
      )
  
  
}
export default App
