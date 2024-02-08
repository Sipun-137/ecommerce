import CommonListing from "@/components/Commonlisting/CommonListing";
import { allProducts } from "@/services/product";

export default async function Page() {
  const res = await allProducts();
  return <CommonListing products={res} />;
}
