"use client";
import Button from "@mui/material/Button";
import { adminNavOptions, navOptions, styles } from "@/utils/index";
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "@/context";
import CommonModal from "./CommonModal";
const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

function NavItems({ isModal = false }: any) {
  return (
    <div
      id="nav-items"
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModal ? "" : "hidden"
      }`}
    >
      <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModal?"border-none":"border border-gray-100"}`}>
        {isAdminView
          ? adminNavOptions.map((item) => (
              <Link
                href={item.path}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
              >
                {item.label}
              </Link>
            ))
          : navOptions.map((item) => (
              <Link
                href={item.path}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
              >
                {item.label}
              </Link>
            ))}
      </ul>
    </div>
  );
}
export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase text-black">
              ecommerce
            </span>
          </div>

          <div className="flex md:order-2 gap-2 text-black">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <Button className={styles.button}>Account</Button>
                <Button className={styles.button}>Cart</Button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <Button className={styles.button}>client view</Button>
              ) : (
                <Button className={styles.button}>Admin view</Button>
              )
            ) : null}
            {isAuthUser ? (
              <Button className={styles.button}>logout</Button>
            ) : (
              <Button variant="outlined" className={styles.button}>
                login
              </Button>
            )}
            {/* this code s for the use of the mobile view support */}
            <button
              data-collapse-toggle="navbar-sticky"
              aria-controls="navbat-sticky"
              aria-expanded="false"
              className="md:hidden text-gray-500"
              onClick={()=>{setShowNavModal(!showNavModal)}}
            >
              <MenuIcon/>
            </button>
          </div>
          <NavItems />
        </div>
        <></>
      </nav>

      <CommonModal
        show={showNavModal}
        setShow={setShowNavModal}
        MainContent={<NavItems isModal={true} />}
        modalTitle={""}
        showButton={undefined}
        buttonComponent={undefined}
      ></CommonModal>
    </>
  );
}
