import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/ProductList";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ecart from "./Pages/Ecart";
import Registeration from "./RegisterationsLogin/Registeration";
import Login from "./Login/Login";
import Header from "./headers_footer/header";
import ProductDetails from "./components/ProductDetails";
import OwnerDashboard from "./ownerDashboard";
import ItemHistory from "./itemhistory";
import Profile from "./RegisterationsLogin/Profile";
import WishList from "./components/WishList";
import Address from "./Login/Address";
import EditProfile from "./EditProfile";
import Adminlogin from "./Adminlogin";
import DBProducts from "./DBProducts";
import Custorders from "./DashboardADmin/Custorders";
import Productmanagment from "./Productmanagment";
import NavSliderDash from "./NavSliderDash";
import TlPrdctOrdrearn from "./DashboardADmin/TlPrdctOrdrearn";
import Navbar from "./headers_footer/navbar";
import Home from "./components/Home";
import Categorymangoes from "./Products/CategoryMangoes";
import Categorycarrot from "./Products/CategoryCarrot";
import Contactus from "./components/Contactus";
import VideoSliderComponent from "./videoslider";
import Pants from "./Products/CategoryLemon";
import Aboutus from "./components/about";
import Contactpage from "./components/Contactpage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Shipping from "./Pages/Shipping";
import AdminProfile from "./AdminProfile";
import { useState } from "react";
import ForgetPass from "./Login/forgetPass";
import AdminForget from "./AdminForget";
import AdminRegisteration from "./AdminRegisteration";
import AdminUpdate from "./AdminUpdate";
import DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard from "./Dashboard";
import Message from "./components/Message";
import CategoryJackfruit from "./Products/CategoryJackfruit";
import CategoryChilli from "./Products/CategoryChilli";
import CategoryMixed from "./Products/CategoryMixed";
import CategoryLemon from "./Products/CategoryLemon";
// import CategoryBitter from "./Products/CategoryBitter";
import CategoryGarlic from "./Products/CategoryGarlic";
import CategoryGhee from "./Products/CategoryGhee";
import Pickles from "./Products/Pickle";
import TermsCondition from "./Pages/TermsCondition";
import ReturnPolicy from "./Pages/ReturnPolicy";
import AdminUsers from "./AdminUsers";
import UsersDetails from "./UsersDetails";
import LineChart from "./DashboardADmin/LineChart";
import { BarChart, PieChart } from "recharts";
import TestimonialSlider from "./components/Testimonial";
import Cart from "./components/Cart";
import { Navigate } from "react-router-dom";
import Chilli from "./Products/CategoryChilli";


function App () {

const [isLoggedIn, setIsLoggedIn] = useState(false);

return (

<div className="App">

<Provider store={store}>

<Router>
<Routes>
<Route path="/Login" element={<Login />} />
<Route path="/ProductList" element={<ProductList />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/Ecart" element={<Ecart />} />
<Route path="/Registeration" element={<Registeration />} />
<Route path="/Header" element={<Header />} />
<Route path="/Adminlogin" element={<Adminlogin setIsLoggedIn={setIsLoggedIn} />} />
<Route path="/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard" element={<DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard />} />
<Route path="/OwnerDashboard" element={<OwnerDashboard />} />
<Route path="/ItemHistory" element={<ItemHistory />} />
<Route path="/WishList" element={<WishList />} />
<Route path="/Profile" element={<Profile />} />
<Route path="/Address" element={<Address />} />
<Route path="/EditProfile" element={<EditProfile />} />
<Route path="/Adminlogin" element={<Adminlogin />} />
<Route path="/DBProducts" element={ <DBProducts/>}/>
<Route path="/Custorders" element={<Custorders />} />
<Route path="/Productmanagment" element={<Productmanagment />} />
<Route path="/NavSliderDash" element={<NavSliderDash />} />
<Route path="/TlPrdctOrdrearn" element={<TlPrdctOrdrearn />} />
<Route path="/Navbar" element={<Navbar />} />
<Route path="/Categorymangoes" element={<Categorymangoes />} />
<Route path="/Categorycarrot" element={<Categorycarrot />} />
<Route path="/CategoryChilli" element={<CategoryChilli />} />
<Route path="/Pants" element={<Pants />} />
{/* <Route path="/CategoryBitter" element={<CategoryBitter />} /> */}
<Route path="/CategoryGarlic" element={<CategoryGarlic />} />
<Route path="/CategoryGhee" element={<CategoryGhee />} />
<Route path="/CategoryJackfruit" element={<CategoryJackfruit />} />
<Route path="/CategoryLemon" element={<CategoryLemon />} />
<Route path="/CategoryMixed" element={<CategoryMixed />} />
<Route path="/Pickles" element={<Pickles />} />
<Route path="/AdminForget" element={<AdminForget />} />
<Route path="/" element={<Home />} />
<Route path="/ForgetPass" element={<ForgetPass />} />
<Route path="/AdminRegisteration" element={<AdminRegisteration />} />
<Route path="/AdminUpdate" element={<AdminUpdate />} />
<Route path="/Contactus" element={<Contactus />} />
<Route path="/Message" element={<Message />} />
<Route path="/VideoSliderComponent" element={<VideoSliderComponent />} />
<Route path="/Aboutus" element={<Aboutus />} />
<Route path="/Contactpage" element={<Contactpage />} />
<Route path="/Shipping" element={<Shipping />} />
<Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
<Route path="/TermsCondition" element={<TermsCondition />} />
<Route path="/ReturnPolicy" element={<ReturnPolicy />} />
<Route path="/AdminProfile" element={<AdminProfile />} />
<Route path="/products/:category/:id" element={<ProductDetails />} />
<Route path="/AdminUsers" element={<AdminUsers />} />
<Route path="/UsersDetails" element={<UsersDetails />} />
<Route path="/LineChart" element={<LineChart />} />
<Route path="/BarChart" element={<BarChart />} />
<Route path="/PieChart" element={<PieChart />} />
<Route path="/TestimonialSlider" element={<TestimonialSlider />} />

</Routes>

</Router>

</Provider>

</div>

);

}

export default App;
