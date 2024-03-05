"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { DeleteItem, GetAllItem } from "@/services/Cart";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { user, setCartItems, cartItems } =useContext(GlobalContext);
  async function extractAllItems() {

    const res = await GetAllItem(user?._id);
    
    if (res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  }
  useEffect(() => {
    if (user !== null) {
      extractAllItems();
    }
  }, [user]);

  async function handleDeleteCartItem(itemid: String | any) {
    const res = await DeleteItem(itemid);
    if (res.success) {
      toast.success(res.message);
      extractAllItems();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <>
      <CommonCart deleteItem={handleDeleteCartItem} cartItems={cartItems} />
    </>
  );
}
