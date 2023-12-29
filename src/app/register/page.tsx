"use client"

const isRegistered=false;
export default function Register() {
    
  return (
    <div className="bg-white relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 ,t-8 mr-auto max-w-7xl xl:px-5 lg:flex-row  ">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-center pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl relative z-10 rounded-xl ">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                {
                                    isRegistered?"Registration Successful":"Sign Up for an account"
                                }
                            </p>
                            {
                                 isRegistered?<button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white trans">Login</button>:null
                            }
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
