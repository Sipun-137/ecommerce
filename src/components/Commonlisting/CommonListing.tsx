"use client";

import ProductButton from "./ProductButton";
import Productcard from "./Productcard";

const data = [
  {
    _id: "65942008bf4ea11d1fe18eb1",
    name: "test",
    description: "test",
    price: 2345,
    category: "women",
    sizes: [
      {
        id: "s",
        label: "S",
      },
      {
        id: "m",
        label: "M",
      },
      {
        id: "l",
        label: "L",
      },
    ],
    deliveryinfo: "test",
    onsale: "yes",
    priceDrop: "785",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-2023-15d7f.appspot.com/o/ecommerce%2Fmoon.png-1704206174346-u5jdmuwiu2?alt=media&token=3327e166-46ca-405c-9ea0-d589773c5ce3",
    createdAt: "2024-01-02T14:39:04.696Z",
    updatedAt: "2024-01-02T14:39:04.696Z",
  },
];

export default function CommonListing() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16 ">
          {data &&
            data.length &&
            data.map((item) => (
              <article key={item._id} className="relative z-10 shadow-xl flex flex-col overflow-hidden border cursor-pointer rounded-sm">
                <Productcard item={item} />
                <ProductButton item={item} />
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
