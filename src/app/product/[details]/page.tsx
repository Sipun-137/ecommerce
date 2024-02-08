import CommonDetails from "@/components/CommonDetails/CommonDetails"
import { ProductById } from "@/services/product"


export default async function ProductDetails({params}:any) {
    const productDetailsData= await ProductById(params.details)
  return (
    <div>
        <CommonDetails item={productDetailsData.data}/>
    </div>
  )
}
