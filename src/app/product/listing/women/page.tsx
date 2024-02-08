import CommonListing from "@/components/Commonlisting/CommonListing";
import { ProductByCategory } from "@/services/product";

export default async function Page() {
  const id = "women";
  const res = await ProductByCategory(id);
  return (
    <>
      <CommonListing products={res} />
    </>
  );
}
