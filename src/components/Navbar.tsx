"use client";
import Button from "@mui/material/Button";
import { adminNavOptions, navOptions } from "@/utils/index";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Fragment, useContext, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";
import CommonModal from "./CommonModal";
import { usePathname, useRouter } from "next/navigation";
import { GetAllItem } from "@/services/Cart";
import CartModal from "./CartModal";

export default function Navbar() {
  const router = useRouter();
  const {
    showNavModal,
    setShowNavModal,
    user,
    isAuthUser,
    setAuthUser,
    setUser,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  function handleLogout() {
    setAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }
  const pathname = usePathname();
  const isAdminView = pathname.includes("admin-view");

  useEffect(() => {
    if (pathname !== "/admin-view/add-product") setCurrentUpdatedProduct(null);
  }, [pathname]);

  function NavItems({ isModal = false, isAdminView }: any) {
    return (
      <div
        id="nav-items"
        className={`items-center justify-between w-full md:flex md:w-auto ${
          isModal ? "block" : "hidden"
        }`}
      >
        <ul
          className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
            isModal ? "border-none" : "border border-gray-100"
          }`}
        >
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
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase text-black">
              ecommerce
            </span>
          </div>

          <div className="flex md:order-2 gap-2 text-black">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <Button className="text-black" size="small" onClick={()=>{router.push("/account");}}>
                  <AccountCircleIcon />
                </Button>
                <Button
                  size="small"
                  className="text-black"
                  onClick={() => {
                    setShowCartModal(!showCartModal);
                  }}
                >
                  <ShoppingCartIcon />
                </Button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  client
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    router.push("/admin-view");
                  }}
                >
                  Admin
                </Button>
              )
            ) : null}
            {isAuthUser ? (
              <Button variant="outlined" size="small" onClick={handleLogout}>
                logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => router.push("/login")}
              >
                login
              </Button>
            )}
            {/* this code s for the use of the mobile view support */}
            <Button
              data-collapse-toggle="navbar-sticky"
              size="small"
              aria-controls="navbat-sticky"
              aria-expanded="false"
              className="md:hidden text-gray-500"
              onClick={() => {
                setShowNavModal(!showNavModal);
              }}
            >
              <MenuIcon />
            </Button>
          </div>
          <NavItems isAdminView={isAdminView} />
        </div>
        <></>
      </nav>

      <CommonModal
        show={showNavModal}
        setShow={setShowNavModal}
        MainContent={<NavItems isModal={true} isAdminView={isAdminView} />}
        modalTitle={"Menu Items"}
        showButton={undefined}
        buttonComponent={undefined}
      />
      {
        showCartModal && <CartModal/>
      }
    </>
  );
}
