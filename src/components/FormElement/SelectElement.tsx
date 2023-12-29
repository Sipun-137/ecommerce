import { Key } from "react";

export default function SelectElement({ label, value, onChange ,option=[]}: any) {
  return (
    <div className="relative">
      <p className=" absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 ml-2 font-medium text-gray-600">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder:gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      >
        {
            option && option.length ? option.map((item:any)=><option id={item.id} value={item.id} key={item.id}>{item.label}</option> ):<option id="" value="">Select</option>
        }
      </select>
    </div>
  );
}
