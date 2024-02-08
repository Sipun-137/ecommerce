import axios from "axios"
import Cookies from "js-cookie"

export const addnewProduct = async (FormData: any) => {
    try {
        const response = await axios.post("/api/admin/add-product", JSON.stringify(FormData), {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    } catch (e: any) {
        console.log("error", e)
    }
}


export const allProducts = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/admin/all-products")
        console.log(response.data)
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}

export const UpdateProduct = async (FormData: any) => {
    try {
        console.log(FormData)
        const response = await axios.put("/api/admin/update-product", JSON.stringify(FormData), {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}


export const DeleteProduct = async (id: any) => {
    try {
        const response = await axios.delete(`/api/admin/delete-product?id=${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}

export const ProductByCategory = async (id: any) => {
    try {
        console.log(id)
        const response = await axios.get(`http://localhost:3000/api/admin/product-by-category?id=${id}`)
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

export const ProductById = async (id: any) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/admin/product-by-id?id=${id}`)
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
}