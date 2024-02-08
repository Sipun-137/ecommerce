"use client";
import { GlobalContext } from "@/context";
import { DeleteProduct } from "@/services/product";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import AlertSnackBar from "../AlertSnackBar";
import { addToCart } from "@/services/Cart";

export default function ProductButton({ item }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const { setCurrentUpdatedProduct,user } = useContext(GlobalContext);
  const isAdminview = pathname.includes("admin-view");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function handleDeleteProduct(item: any) {
    const res = await DeleteProduct(item._id);
    if (res.success) {
      setOpen(true);
      setStatus({ type: "success", message: res.message });
      setTimeout(() => {
        router.refresh();
        setOpen(false);
      }, 2000);
    } else {
      setOpen(true);
      console.log(res.message)
      setStatus({ type: "error", message: res.message });
      setTimeout(() => {
        router.refresh();
        setOpen(false);
      }, 2000);
    }
  }

  async function handleAddToCart(getitem:any){
    console.log(user?._id)
    console.log(getitem?._id)
    const res= await addToCart({productID:getitem?._id,userID:user?._id})
    console.log(res)
    if(res.success){
      setOpen(true);
      setStatus({ type: "success", message: res.message });
      setTimeout(() => {
        router.refresh();
        setOpen(false);
      }, 2000);
    }
    else {
      setOpen(true);
      setStatus({ type: "error", message: res.message });
      setTimeout(() => {
        router.refresh();
        setOpen(false);
      }, 2000);
    }
  }
  return isAdminview ? (
    <>
    <AlertSnackBar stat={open} type={status.type} message={status.message} />
      <div className="gap-y-8 p-2 m-1">
        <Button
          fullWidth
          variant="outlined"
          className="rounded-lg text-black  border-gray-500 mt-1.5"
          onClick={() => {
            setCurrentUpdatedProduct(item);
            router.push("/admin-view/add-product");
          }}
        >
          Update
        </Button>
        <Button
          fullWidth
          variant="outlined"
          className="rounded-lg text-black  border-gray-500 mt-1.5"
          onClick={() => handleDeleteProduct(item)}
        >
          delete
        </Button>
      </div>
    </>
  ) : (
    <>
      <Button
        fullWidth
        variant="outlined"
        className="rounded-lg text-black  border-gray-500 mt-1.5"
        onClick={()=>{handleAddToCart(item)}}
      >
        Add To Cart
      </Button>
    </>
  );
}
