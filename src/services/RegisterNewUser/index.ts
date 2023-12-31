import axios from "axios"



export const registerNewUser=async (FormData:any)=>{

    try {
        // const response=await fetch('/api/register',{
        //     method:"POST",
        //     headers:{
        //         "content-type":"application/json",
        //     },body:JSON.stringify(FormData)
        // })
        // const finalData=respone.json()
        // return finalData
        const response=await axios.post("/api/register",JSON.stringify(FormData)) 
        return response
    } catch (e:any) {
        console.log("error",e)
    }
}