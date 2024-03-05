"use client";
import { Fragment, Key, useContext, useEffect } from "react";
import CommonModal from "./CommonModal";
import { GlobalContext } from "@/context";
import { Button } from "@mui/material";
import { DeleteItem, GetAllItem } from "@/services/Cart";
import toast, { Toaster } from "react-hot-toast";

export default function CartModal() {
  const { showCartModal, setShowCartModal, user, setCartItems, cartItems } =
    useContext(GlobalContext);
  async function extractAllItems() {
    const res = await GetAllItem(user?._id);
    console.log(res)
    if (res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  }
  async function handleDeleteCartItem(itemid: String | any) {
    const res = await DeleteItem(itemid);
    if (res.success) {
      toast.success(res.message);
      extractAllItems();
    } else {
      toast.error(res.message);
    }
  }
  useEffect(() => {
    if (user !== null) {
      extractAllItems();
    }
  }, [user]);
  return (
    <>
      <Toaster position="top-right" />
      <CommonModal
        showButton={true}
        modalTitle={"Cart Items"}
        show={showCartModal}
        setShow={setShowCartModal}
        MainContent={
          cartItems && cartItems.length ? (
            <>
              <ul role="list" className="-my-6 divide-y divide-gray-300  ">
                {cartItems.map(
                  (item: { productID: any; _id: Key | null | undefined }) => (
                    <li key={item._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-mdborder border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item && item.productID && item.productID.imgUrl}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-col flex-1">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="">
                                {item && item.productID && item.productID.name}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            ₹{item && item.productID && item.productID.price}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteCartItem(item._id)}
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </>
          ) : (
            <>empty cart</>
          )
        }
        buttonComponent={
          <Fragment>
            <div className="flex gap-2">
              <Button fullWidth variant="outlined" color="secondary" href="/cart">
                Go to Cart
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                disabled={cartItems && cartItems.length == 0}
                href="/checkout"
              >
                Check Out
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
              <Button
                fullWidth
                type="button"
                className="font-meduim text-gray"
                href="/product/listing/all-products"
              >
                continue shopping <span aria-hidden="true">&rarr;</span>
              </Button>
            </div>
          </Fragment>
        }
      />
    </>
  );
}
