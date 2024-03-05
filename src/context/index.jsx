"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();
export const intialCheckOutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: "",
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    PostalCode: "",
    address: "",
  });

  const [checkoutFromData, setCheckoutFromData] = useState(
    intialCheckOutFormData
  );

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      const getCartItems = JSON.parse(localStorage.getItem("cartItems"));
      setCartItems(getCartItems);
      setUser(userData);
    } else {
      setAuthUser(false);
    }
  }, [Cookies]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        pageLevelLoader,
        setPageLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        address,
        setAddress,
        addressFormData,
        setAddressFormData,
        checkoutFromData,
        setCheckoutFromData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
