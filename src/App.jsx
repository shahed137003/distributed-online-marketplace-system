import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home';
import Explore from './components/Explore';
import Register from './components/Register/Register';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import AllOrders from './components/AllOrders/AllOrders';
import Createitem from './components/Createitem/Createitem';
import Checkout from './components/Checkout/Checkout';
import Gateway from './components/Gateway/Gateway';
import Searchresults from './components/Searchresults';
import Footer from './components/Footer/Footer';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';
import UserContextProvider from './context/userContext';
import InventoryContextProvider from './context/InventoryContext';
import ItemcontextProvider from './context/Itemcontext';  // تأكد من استيراد ItemcontextProvider

const App = () => {
  return (
    <>
      {/* Wrap the main App with all the Context Providers */}
      <AuthContextProvider>
        <CartContextProvider>
          <InventoryContextProvider>
            <UserContextProvider>
              <ItemcontextProvider> {/* التأكد من Wrap المكونات داخل ItemcontextProvider */}
                {/* Navigation */}
                <NavBar />
                {/* Routes */}
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/Explore' element={<Explore />} />
                  <Route path='/createItem' element={<Createitem />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/Previous orders' element={<AllOrders />} />
                  <Route path='/payment' element={<Checkout />} />
                  <Route path='/gateway' element={<Gateway />} />
                  <Route path='/itemdetails/:product_id' element={<ItemDetails />} />
                  <Route path='/researchresults' element={<Searchresults />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/userProfile/:user_id' element={<UserProfile />} />
                  <Route path='/editProfile' element={<EditProfile />} />
                </Routes>
                <Footer />
              </ItemcontextProvider> {/* تأكد من إغلاق الـ ItemcontextProvider هنا */}
            </UserContextProvider>
          </InventoryContextProvider>
        </CartContextProvider>
      </AuthContextProvider>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
