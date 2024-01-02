import axios from "axios"


export const addnewProduct=async (FormData:any)=>{
    try {    
        const response=await axios.post("/api/admin/add-product",JSON.stringify(FormData)) 
        return response.data
    } catch (e:any) {
        console.log("error",e)
    }
}