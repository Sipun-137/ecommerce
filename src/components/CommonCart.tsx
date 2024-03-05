"use client";

import { Button } from "@mui/material";

export default function CommonCart({ cartItems = [], deleteItem }: any) {
  return (
    <>
      <section className="h-screen bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  {cartItems && cartItems.length ? (
                    <ul className="my-8">
                      {cartItems.map((item: any) => (
                        <li
                          key={item._id}
                          className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                item && item.productID && item.productID.imgUrl
                              }
                              alt=""
                              className="h-24 w-25 max-w-full rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="sm:sol-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-4">
                                <p className="text-base font-semibold text-gray-900">
                                  {item &&
                                    item.productID &&
                                    item.productID.name}
                                </p>
                              </div>
                              <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end ">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                  ₹
                                  {item &&
                                    item.productID &&
                                    item.productID.price}
                                </p>
                                <Button
                                  color="error"
                                  type="button"
                                  variant="outlined"
                                  onClick={() => deleteItem(item._id)}
                                >
                                  remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div className="flex justify-center items-center text-bold font-serif rounded-lg p-4">
                        Empty cart
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                        <Button
                          fullWidth
                          type="button"
                          className="font-meduim text-gray"
                          href="/product/listing/all-products"
                        >
                          continue shopping
                          <span aria-hidden="true">&rarr;</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-6 border-t border-b p-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black">SubTotal</p>
                    <p className="text-sm text-black font-semibold">
                      ₹
                      {cartItems && cartItems.length
                        ? cartItems.reduce(
                            (acc: number, item: any) =>
                              item.productID.price + acc,
                            0
                          )
                        : "0"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black">Shipping</p>
                    <p className="text-sm text-black font-semibold">₹0</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black">Total</p>
                    <p className="text-sm text-black font-semibold">
                      ₹
                      {cartItems && cartItems.length
                        ? cartItems.reduce(
                            (acc: number, item: any) =>
                              item.productID.price + acc,
                            0
                          )
                        : "0"}
                    </p>
                  </div>
                  <div className="mt-5 text-center  ">
                    <Button
                      disabled={cartItems&&cartItems.length==0}
                      variant="outlined"
                      color="inherit"
                      
                      className="disabled:opacity-50 group inline-flex w-full items-center justify-center  px-6 py-4 text-lg  font-medium uppercase tracking-wide"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
