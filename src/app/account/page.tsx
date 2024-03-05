"use client";
import InputElement from "@/components/FormElement/InputElement";
import { GlobalContext } from "@/context";
import {
  AddNewAddress,
  DeleteAddress,
  GetAllAddress,
  UpdateAddress,
} from "@/services/Address";
import { addNewAddressFormControl } from "@/utils";
import { Button, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Account() {
  const {
    user,
    address,
    setAddress,
    addressFormData,
    setAddressFormData,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const [showform, setShowform] = useState(false);
  const [currentEditedAddressid, setCurrentEditedAddressid] = useState(null);

  async function extractAllAddress() {
    setPageLevelLoader(true);
    const res = await GetAllAddress(user?._id);
    console.log(res);
    if (res.success) {
      setAddress(res.data);
      setPageLevelLoader(false);
    }
  }
  async function handleDelete(id: string) {
    console.log(id);
    const res = await DeleteAddress(id);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      extractAllAddress();
    } else {
      toast.error(res.message);
    }
  }

  async function handleUpdateAddress(item: any) {
    setShowform(true);
    setAddressFormData({
      fullName: item.fullName,
      city: item.city,
      country: item.country,
      PostalCode: item.PostalCode,
      address: item.address,
    });
    setCurrentEditedAddressid(item._id);
  }

  async function submitHandler() {
    const res =
      currentEditedAddressid !== null
        ? await UpdateAddress({
            ...addressFormData,
            _id: currentEditedAddressid,
          })
        : await AddNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);
    if (res.success) {
      toast.success(res.message);
      //   setAddress([...address, res.data]);
      setShowform(false);
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        PostalCode: "",
        address: "",
      });
      extractAllAddress();
      setCurrentEditedAddressid(null);
    } else {
      toast.error(res.message);
      setAddressFormData({
        fullname: "",
        city: "",
        country: "",
        PostalCode: "",
        address: "",
      });
    }
  }
  useEffect(() => {
    if (user !== null) {
      extractAllAddress();
    }
  }, [user]);

  return (
    <>
      <Toaster position="top-right" />
      <section>
        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="m-2 rounded bg-white shadow">
            <div className="p-6 sm:p-12 ">
              <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                we have to rendor random user image
              </div>
              <div className="flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-center md:text-left">
                  {user?.name}
                </h4>
                <p>{user?.email}</p>
                <p>{user?.role}</p>
              </div>
              <Button variant="outlined" color="inherit">
                view Orders
              </Button>
              <div className="mt-6">
                <h1 className="font-bold text-lg">Address:</h1>
                {pageLevelLoader ? (
                  <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
                ) : (
                  <div className="mt-4 flex flex-col gap-4">
                    {address && address.length ? (
                      address.map((item: any) => (
                        <div key={item._id} className="border-2 rounded-lg p-6">
                          <p>Name:{item.fullName}</p>
                          <p>Address:{item.address}</p>
                          <p>City:{item.city}</p>
                          <p>Country:{item.country}</p>
                          <p>PostalCode:{item.PostalCode}</p>
                          <Button
                            variant="outlined"
                            color="inherit"
                            className="m-2"
                            onClick={() => {
                              handleUpdateAddress(item);
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="inherit"
                            className="m-2"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      ))
                    ) : (
                      <>
                        <p>No address found! Please add an Address</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    setShowform(!showform);
                    setCurrentEditedAddressid(null);
                    setAddressFormData({
                      fullName: "",
                      city: "",
                      country: "",
                      postalCode: "",
                      address: "",
                    });
                  }}
                >
                  {showform ? "hide address Form" : "Add New Address"}
                </Button>
              </div>
              {showform ? (
                <div className="flex flex-col mt-5 justify-center pt-4 items-center ">
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                    {addNewAddressFormControl.map((item) =>
                      item.componentType === "input" ? (
                        <InputElement
                          key={item.id}
                          type={item.type}
                          label={item.label}
                          placeholder={item.placeholder}
                          onChange={(event: any) => {
                            setAddressFormData({
                              ...addressFormData,
                              [item.id]: event.target.value,
                            });
                          }}
                          value={addressFormData[item.id]}
                        />
                      ) : null
                    )}
                  </div>
                  <Button
                    className="m-2"
                    variant="outlined"
                    color="inherit"
                    onClick={submitHandler}
                  >
                    {currentEditedAddressid !== null ? "update" : "add"}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
