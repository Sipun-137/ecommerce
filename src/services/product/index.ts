import axios from "axios"


export const addnewProduct = async (FormData: any) => {
    try {
        const response = await axios.post("/api/admin/add-product", JSON.stringify(FormData))
        return response.data
    } catch (e: any) {
        console.log("error", e)
    }
}


export const allProducts = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/admin/all-products")
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}