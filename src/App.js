// App.js
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import SessionInfo from "./pages/SessionInfo";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import authService from "./services/auth.service";
import AuthContext from "./context/AuthContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = authService.getCurrentUser().then(user => {
            setCurrentUser(user);
        })

        return () => unsubscribe;
    }, []);

  const login = (user) => {
        setCurrentUser(user);
  };

  const logout = async () => {
       try{
        await authService.logout();
        setCurrentUser(null);
       }
       catch(error){
        console.error("Logout Failed", error);
       }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<SessionInfo />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/*" element={<PageNotFound />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </Provider>
      </ScrollToTop>
      <Toaster />
    </BrowserRouter>
  </AuthContext.Provider>
  );
}
  
export default App;