import axios from "axios"
import Cookies from "js-cookie"



export const CreateNewOrder=async (formData:any)=>{
    try {
        const res=await axios.post('/api/order/create-order',formData,{headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
        }})
        return res.data
    } catch (e:any) {
        console.log(e)
    }
}
export const GEtAllOrderForUser=async (id:String)=>{
    try {
        const res=await axios.get(`/api/order/get-all-order?id=${id}`,{headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
        }})
        return res.data
    } catch (e:any) {
        console.log(e)
    }
}
export const getOrderDetail=async (id:String)=>{
    try {
        const res=await axios.get(`/api/order/order-details?id=${id}`,{headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
        }})
        return res.data
    } catch (e:any) {
        console.log(e)
    }
}


