"use client";
import { LoginFormcontrol } from "@/utils";
import InputElement from "@/components/FormElement/InputElement";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { loginUserData } from "@/services/LoginUser";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import AlertSnackBar from "@/components/AlertSnackBar";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
  const router = useRouter();
  const {
    user,
    setUser,
    isAuthUser,
    setAuthUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const isValid = () => {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  };
  async function handleLoginOnSubmit() {
    setComponentLevelLoader({ loading: true, id: "" });
    const data = await loginUserData(formData);
    console.log("data received", data);
    if (data.success) {
      setUser(data?.finalResult?.user);
      setAuthUser(true);
      setStatus({ type: "success", message: "login successfull" });
      toast.success(data.message)
      setOpen(true);
      setFormData({ email: "", password: "" });
      Cookies.set("token", data?.finalResult?.token);
      localStorage.setItem("user", JSON.stringify(data?.finalResult?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      setStatus({ type: "error", message: "invalid credentials" });
      setOpen(true);
      setAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData({ email: "", password: "" });
    }
  }
  useEffect(() => {
    if (isAuthUser) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [isAuthUser, router]);
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 ,t-8 mr-auto xl:px-5 lg:flex-row  ">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-center pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl relative z-10 rounded-xl ">
                <p className="w-full text-4xl font-medium text-center font-serif">
                  Login to Account
                </p>

                <div className="w-full mt-6 mr-0 mb-0 relative space-y-8 ">
                  {LoginFormcontrol.map((item) =>
                    item.componentType === "input" ? (
                      <InputElement
                        key={item.id}
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        onChange={(event: any) => {
                          setFormData({
                            ...formData,
                            [item.id]: event.target.value,
                          });
                        }}
                        value={formData[item.id]}
                      />
                    ) : null
                  )}
                  <div>
                    <Button
                      fullWidth
                      className="rounded-md tracking-[8px] font-serif text-black"
                      onClick={handleLoginOnSubmit}
                    >
                      {componentLevelLoader && componentLevelLoader.loading ? (
                        <ComponentLevelLoader message={"loging in"} />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                  <div>
                    <p className="font-serif text-black">New to Website</p>
                    <Button
                      // href="/register"
                      onClick={() => router.push("/register")}
                      fullWidth
                      className="rounded-md tracking-[8px] font-serif text-black"
                    >
                      register
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
