
import CommonListing from "@/components/Commonlisting/CommonListing"
import { ProductByCategory } from "@/services/product"

export default async function Page() {
    const id="men"
    const res =await ProductByCategory(id)
    console.log(res)
  return (
    <>

    <CommonListing products={res} />
    </>
  )
}
