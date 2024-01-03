import CommonListing from "@/components/Commonlisting/CommonListing";
import { allProducts } from "@/services/product";

export default async function Adminview() {
  const adminallProducts= await allProducts()
  return (
    <>
      <CommonListing products={adminallProducts}/>
    </>
  )
}

