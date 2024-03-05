import axios from "axios"
import Cookies from "js-cookie"

export const AddNewAddress = async (formdata: any) => {
    try {
        const response = await axios.post('/api/address/add-new-address', JSON.stringify(formdata), {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}

export const GetAllAddress = async (id: String) => {
    try {
        const response = await axios.get(`/api/address/get-all-address?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}

export const DeleteAddress = async (id: String) => {
    try {
        const response = await axios.delete(`/api/address/delete-address?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}

export const UpdateAddress = async (FormData: any) => {
    try {
        const response = await axios.put("/api/address/update-address", JSON.stringify(FormData), {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}