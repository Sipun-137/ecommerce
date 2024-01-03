"use client";

import InputElement from "@/components/FormElement/InputElement";
import SelectElement from "@/components/FormElement/SelectElement";
import TileComponent from "@/components/TileComponent";
import {
  adminAddProductFormControl,
  availableSizes,
  firebaseConfig,
} from "@/utils";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addnewProduct } from "@/services/product";
import AlertSnackBar from "@/components/AlertSnackBar";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import { GlobalContext } from "@/context";

const initialFormData = {
  name: "",
  description: "",
  price: 0,
  category: "men",
  sizes: [],
  deliveryinfo: "",
  onsale: "no",
  priceDrop: 0,
  imgUrl: "",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.FIREBASEUTILURL as string);

const createuniquefileName = (getFile: File) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file: File) {
  const getFileName = createuniquefileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downLoadUrl) => resolve(downLoadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}


export default function Page() {
  const router=useRouter()
  const [open,setOpen]=useState(false);
  const [status, setStatus] = useState({ type: "warning", message: "" });
  const [formData, setFormData] = useState<any>(initialFormData);
  const {componentLevelLoader,
    setComponentLevelLoader}=useContext(GlobalContext);
  async function handleImage(event: any) {
    console.log(event.target.files);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );
    const newUrl: string = extractImageUrl as string;
    if (newUrl !== "") {
      setFormData({ ...formData, imgUrl: newUrl });
    }
  }
  
  function handleTileClick(getCurrentItem:any){
    let copySizes=[...formData.sizes]
    const index=copySizes.findIndex(item=>item.id===getCurrentItem.id)
    if(index===-1){
      copySizes.push(getCurrentItem)

    }else{ 
      copySizes=copySizes.filter(item=>item.id !== getCurrentItem.id)
    }
    setFormData({...formData,sizes:copySizes})
  }

  //handle add product function to send to the service
  async function handleAddProduct(){
    setComponentLevelLoader({ loading: true, id: "" });
    const res=await addnewProduct(formData);
    console.log(res);
    if(res.success){
      setComponentLevelLoader({ loading: false, id: "" });
      setOpen(true);
      setStatus({ type:"success", message: res.message })
      setFormData(initialFormData);
      setTimeout(() => {
        router.push("/admin-view/all-product");
      }, 3000);
    }else{
      setComponentLevelLoader({ loading: false, id: "" });
      setOpen(true)
      setStatus({type:"error",message:res.message});
      setFormData(initialFormData);
    }
  }
  return (
    <>
    <AlertSnackBar stat={open} type={status.type} message={status.message} />
      <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
        <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative ">
          <div className="w-full mt-6 mr-0 mb-0 space-y-8">
            <input
              accept="image/*"
              max={1000000}
              type="file"
              onChange={handleImage}
            />
            <div className="flex gap-2 flex-col">
              <TileComponent selected={formData.sizes} data={availableSizes} onClick={handleTileClick} />
            </div>
            {adminAddProductFormControl.map((item) =>
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
                variant="outlined"
                className="text-black  tracking-wider font-meduim text-lg"
                onClick={handleAddProduct}
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                        <ComponentLevelLoader message={"Adding Product"} />
                      ) : (
                        "Add Product"
                      )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
