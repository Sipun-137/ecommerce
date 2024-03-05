"use client";

import { GlobalContext } from "@/context";
import { GetAllAddress } from "@/services/Address";
import { CreateNewOrder } from "@/services/order";
import { CallStripeSession } from "@/services/stripe";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CheckOut() {
  const {
    cartItems,
    user,
    address,
    setAddress,
    checkoutFromData,
    setCheckoutFromData,
  } = useContext(GlobalContext);
  //publish key from the sripe api service
  const publishableKey =
    "pk_test_51OkOZnSCjvp7H6WhYE86sGslxuy9upyutDNHw5Bd00ULTKYzfQtk5IwGfW5n1b0qlk3xIDuwCaHpji8PQsDkdlTc00zU0g80s7";
  const stripePromise = loadStripe(publishableKey);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  async function getAllAddress() {
    const res = await GetAllAddress(user?._id);
    if (res.success) {
      setAddress(res.data);
    }
  }
  useEffect(() => {
    if (user !== null) {
      getAllAddress();
    }
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.stringify(localStorage.getItem("stripe"));
      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckOutFormData = JSON.stringify(
          localStorage.getItem("checkOutFormData")
        );
        console.log(getCheckOutFormData)
        const formData = JSON.parse(getCheckOutFormData);
        console.log(formData);
        const createFinalCheckOutData = {
          user: user?._id,
          shippingAddress: formData.shippingAddress,
          orderItems: cartItems.map((item: any) => ({
            qty: 1,
            product: item.productID,
          })),
          paymentMethod: "stripe",
          totalPrice: cartItems.reduce(
            (total: Number, item: { productID: { price: any } }) =>
              item.productID.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const res = await CreateNewOrder(createFinalCheckOutData);
        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message);
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.error(res.message);
        }
      }
    }
    createFinalOrder();
  }, [params.get("status"), cartItems]);

  function handleSelectedAddress(getAddress: any) {
    if (getAddress._id == selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFromData({ ...checkoutFromData, shippingAddress: {} });
      return;
    }
    setSelectedAddress(getAddress._id);
    setCheckoutFromData({
      ...checkoutFromData,
      shippingAddress: {
        ...checkoutFromData.shippingAddress,
        fullName: getAddress.fullname,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalcode,
        address: getAddress.address,
      },
    });
  }

  async function handleCheckOut() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "INR",
        product_data: {
          images: [item.productID.imgUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const res = await CallStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", JSON.stringify(true));
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFromData));

    const { error }: any = await stripe?.redirectToCheckout({
      sessionId: res.id,
    });
    console.log(error);
  }

  if (orderSuccess) {
    return <section className="h-screen bg-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow" >
          <div className="px-4 py-6 sm:px-6 sm:py-10 flex-col flex gap-5">
          <h1 className="font-bold text-lg">Your Payment is successful</h1>
          <Button variant="outlined" color="inherit">
            view your orders
          </Button>
          </div>
          </div>
        </div>

      </div>

    </section>;
  }
  return (
    <>
      <Toaster position="top-right" />
      <div className="p-4">
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="font-medium text-xl">Cart Summery</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
              {cartItems && cartItems.length ? (
                cartItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item && item.productID && item.productID.imgUrl}
                      alt=""
                      className="m-2 h-40 w-28 rounded-md border object-cover object-center "
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-bold">
                        {item && item.productID && item.productID.name}
                      </span>
                      <p className="font-semibold ">
                        <span className="text-gray-900 p-2">
                          ₹{item && item.productID && item.productID.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>Your Cart is Empty</div>
              )}
            </div>
          </div>
          <div>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="font-medium text-xl">Shipping Address Details</p>
              <p className="text-xl text-gray-400 font-bold">
                Complete Your order by selecting address below
              </p>
              <div className="mt-6 w-full mr-0 mb-0 ml-0 space-y-6">
                {address && address.length ? (
                  address.map((item: any) => (
                    <div
                      key={item._id}
                      className={`border-2 rounded-lg p-6 ${
                        item._id === selectedAddress ? "border-red-900" : ""
                      }`}
                      onClick={() => {
                        handleSelectedAddress(item);
                      }}
                    >
                      <p>Name:{item.fullName}</p>
                      <p>Address:{item.address}</p>
                      <p>City:{item.city}</p>
                      <p>Country:{item.country}</p>
                      <p>PostalCode:{item.PostalCode}</p>
                      <Button
                        variant="outlined"
                        color="inherit"
                        className="m-2"
                      >
                        {item._id === selectedAddress
                          ? "Selected Address"
                          : "select Address"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No Address Added</p>
                )}
              </div>
              <Button
                variant="outlined"
                color="inherit"
                className="m-2"
                href="/account"
              >
                Add Address
              </Button>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">SubTotal</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (
                            total: Number,
                            item: { productID: { price: any } }
                          ) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="text-lg font-bold text-gray-900">Free</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900"> Total</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (
                            total: Number,
                            item: { productID: { price: any } }
                          ) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <Button
                  variant="outlined"
                  color="inherit"
                  className="m-2"
                  fullWidth
                  disabled={selectedAddress === null || cartItems.length === 0}
                  onClick={handleCheckOut}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
