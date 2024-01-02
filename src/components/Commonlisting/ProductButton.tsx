"use client";

import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProductButton({ item }: any) {
  const pathname = usePathname();
  const isAdminview = pathname.includes("admin-view");
  return isAdminview ? (
    <div className="gap-y-8 p-2">
      <Button fullWidth variant="outlined" className="rounded-lg text-black  border-gray-500 mt-1.5">Update</Button>
      <Button fullWidth variant="outlined" className="rounded-lg text-black  border-gray-500 mt-1.5">delete</Button>
    </div>
  ) : (
      <>
      <Button fullWidth variant="outlined" className="rounded-lg text-black  border-gray-500 mt-1.5">Add To Cart</Button>
      </>
  );
}
