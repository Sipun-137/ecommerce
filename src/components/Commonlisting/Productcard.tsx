import {useRouter} from "next/navigation";

export default function Productcard({ item }: any) {
  const router=useRouter();
  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imgUrl}
          alt="product Image"
          className=" h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onsale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full bg-black p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            sale
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex ">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onsale === "yes" ? "line-through" : " "
            }`}
          >{`₹ ${item.price}`}</p>
          {item.onsale === "yes" ? (
            <p className="mr-3 text-sm font-semibold text-red-700">{`₹ ${
              item.price - item.price * (item.priceDrop / 100)
            }`}</p>
          ) : null}
          {item.onsale === "yes" ? (
            <p className="mr-3 text-sm font-semibold ">{`${item.priceDrop}%off`}</p>
          ) : null}
        </div>
        <h3 className="mb-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </div>
  );
}
