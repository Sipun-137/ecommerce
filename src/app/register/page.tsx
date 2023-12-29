"use client";

import { registrationFormcontrol } from "@/utils";
import InputElement from "@/components/FormElement/InputElement";
import SelectElement from "@/components/FormElement/SelectElement";
import { Button } from "@mui/material";

const isRegistered = false;
export default function Register() {
  return (
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
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
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

                      />
                    ) : item.componentType === "select" ? (
                      <SelectElement
                      key={item.id}
                      label={item.label}
                      option={item.options}
                      />
                    ) : null
                  )}
                  <div>
                  <Button fullWidth className="rounded-md">register</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
