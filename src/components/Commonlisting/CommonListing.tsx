"use client";

import { Key, useEffect } from "react";
import ProductButton from "./ProductButton";
import Productcard from "./Productcard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommonListing(products: any) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  console.log(products);
  const data = products.products.data;
  return (
    <section className="bg-white py-12 sm:py-16 flex items-center justify-center">
      <div className="max-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4  sm:gap-4 lg:mt-16 ">
          {data &&
            data.length &&
            data.map((item: { _id: Key | null | undefined }) => (
              <article
                key={item._id}
                className="relative z-10 shadow-xl flex flex-col overflow-hidden border cursor-pointer rounded-sm p-1"
              >
                {/* <Link href=""> */}
                <Productcard
                  item={item}
                />
                <ProductButton item={item} />
                {/* </Link> */}
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
