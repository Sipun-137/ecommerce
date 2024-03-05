import axios from "axios"
import Cookies from "js-cookie"


export const addToCart = async (formdata: any) => {
    try {
        const response = await axios.post('/api/cart/add-to-cart', JSON.stringify(formdata), {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}


export const GetAllItem = async (id:String) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/cart/all-cart-items?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}

export const DeleteItem = async (id:String) => {
    try {
        const response = await axios.delete(`/api/cart/delete-from-cart?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}