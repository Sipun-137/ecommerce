"use client";

import { registrationFormcontrol } from "@/utils";
import InputElement from "@/components/FormElement/InputElement";
import SelectElement from "@/components/FormElement/SelectElement";
import { Alert, Button, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { registerNewUser } from "@/services/RegisterNewUser";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";

const InitialState = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};
export default function Register() {
  const router = useRouter();
  const { componentLevelLoader, setComponentLevelLoader,isAuthUser } =
    useContext(GlobalContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState<any>(InitialState);
  console.log(formData);
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
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  };
  async function handleRegisterOnSubmit() {
    setComponentLevelLoader({ loading: true, id: "" });
    const data = await registerNewUser(formData);
    console.log(data);
    if (data?.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      setStatus({ type: "success", message: "login successfull" });
      setOpen(true);
      setIsRegistered(true);
    }else{
      setStatus({ type: "error", message: "invalid credentials" });
      setOpen(true);
    }
  }
  function handleLogin() {
    router.push("/login");
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
      {
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully registered to the website !!!
          </Alert>
        </Snackbar>
      }
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 ,t-8 mr-auto xl:px-5 lg:flex-row  ">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-center pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl relative z-10 rounded-xl ">
                <p className="w-full text-4xl font-medium text-center font-serif">
                  {isRegistered
                    ? "Registration Successful"
                    : "Sign Up for an account"}
                </p>
                {isRegistered ? (
                  <button
                    onClick={handleLogin}
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    Login
                  </button>
                ) : (
                  <div className="w-full mt-6 mr-0 mb-0 relative space-y-8 ">
                    {registrationFormcontrol.map((item) =>
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
                      ) : item.componentType === "select" ? (
                        <SelectElement
                          key={item.id}
                          label={item.label}
                          option={item.options}
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
                        className="rounded-md disabled:opacity-70"
                        disabled={!isValid()}
                        onClick={handleRegisterOnSubmit}
                      >
                        {componentLevelLoader &&
                        componentLevelLoader.loading ? (
                          <ComponentLevelLoader message={"Registering"} />
                        ) : (
                          "Register"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
