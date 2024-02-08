"use client";

export default function CommonDetails({ item }: any) {
  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg ">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={item?.imgUrl}
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2
                  border-gray-100 text-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imgUrl}
                      alt="Product Deatils"
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2
                  border-gray-100 text-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imgUrl}
                      alt="Product Deatils"
                      className="h-full w-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className=" font-bold text-gray-900 capitalize text-2xl">
              {item && item.name}
            </h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                {/* <h1 className="text-3xl font-bold">₹{item && item.price}</h1> */}
                <p
                  className={`mr-3 font-semibold  ${
                    item.onsale === "yes" ? "line-through text-3xl " : " text-3xl"
                  }`}
                >{`₹ ${item.price}`}</p>
                {item.onsale === "yes" ? (
                  <p className="mr-3 text-3xl font-semibold text-red-700">{`${
                    item.price - item.price * (item.priceDrop / 100)
                  }`}</p>
                ) : null}
              </div>
              <button
                type="button"
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
              >
                Add to Cart
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-gray-600">
                {item && item.deliveryinfo}
              </li>
              <li className="flex items-center text-left text-sm font-gray-600">
                Cancel Any Time
              </li>
            </ul>
            <div className="lg:col-span-3 mt-8">
              <div className=" border-b border-ray-400">
                <nav className="flex gap-4 ">
                  <a
                    href=""
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </a>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">
                {item && item.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
