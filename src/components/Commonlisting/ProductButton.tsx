"use client";
import { GlobalContext } from "@/context";
import { DeleteProduct } from "@/services/product";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { addToCart } from "@/services/Cart";

import toast, { Toaster } from "react-hot-toast";

export default function ProductButton({ item }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const { setCurrentUpdatedProduct, user,showCartModal, setShowCartModal } = useContext(GlobalContext);
  const isAdminview = pathname.includes("admin-view");

  async function handleDeleteProduct(item: any) {
    const res = await DeleteProduct(item._id);
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } else {
      toast.error(res.message);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    }
  }
  async function handleAddToCart(getitem: any) {
    console.log(user?._id);
    console.log(getitem?._id);
    const res = await addToCart({ productID: getitem?._id, userID: user?._id });
    console.log(res);
    if (res.success) {
      console.log(res.message);
      toast.success(res.message as string);
      setShowCartModal(true)
      // setTimeout(() => {
      //   router.refresh();
      // }, 2000);
    } else {
      toast.error(res.message);
      setShowCartModal(true)
      // setTimeout(() => {
      //   router.refresh();
      // }, 2000);
    }
  }
  return isAdminview ? (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
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
      <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
      <Button
        fullWidth
        variant="outlined"
        className="rounded-lg text-black  border-gray-500 mt-1.5"
        onClick={() => {
          handleAddToCart(item);
        }}
      >
        Add To Cart
      </Button>
    </>
  );
}
