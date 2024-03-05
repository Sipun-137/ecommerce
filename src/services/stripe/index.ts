import axios from "axios"
import Cookies from "js-cookie"


export const  CallStripeSession=async(formData:any)=>{
    try{
        const res=await axios.post("/api/stripe",JSON.stringify(formData),{headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
        }})
        return res.data;
    }catch(e:any){
        console.log(e) 
    }
}